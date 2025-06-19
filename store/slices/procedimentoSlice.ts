import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Turno} from "@/constants/models/Turno";
import {ApiService} from "@/api/services/ApiService";
import {Procedimento} from "@/constants/models/Procedimento";
import { ProcedimentoService } from '@/api/services/ProcedimentoService';

interface ProcedimentoState {
  procedimentos: Procedimento[];
  procedimento: Procedimento | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProcedimentoState = {
  procedimentos: [],
  procedimento: null,
  loading: false,
  error: null,
};

export const fetchProcedimentos = createAsyncThunk(
    'procedimento/fetchProcedimentos',
    async (_, {rejectWithValue}) => {
      try {
        const procedimentoService = new ProcedimentoService();
        return await procedimentoService.getProcedimentos();
      } catch {
        return rejectWithValue('Falha ao buscar procedimento');
      }
    }
);

export const fetchProcedimento = createAsyncThunk(
    'procedimento/fetchProcedimento',
    async (id: string, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Procedimento>("procedimentos");
        const procedimento = await apiService.getById(id)
        if (procedimento) {
          return procedimento
        } else {
          return rejectWithValue('Falha ao buscar procedimento');
        }
      } catch {
        return rejectWithValue('Falha ao buscar procedimento');
      }
    }
);

export const clearProcedimento = createAsyncThunk(
    'procedimento/clearProcedimento',
    async (_, {rejectWithValue}) => {});

export const addProcedimento = createAsyncThunk(
    'procedimento/addProcedimento',
    async (data: Partial<Procedimento>, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Procedimento>("procedimentos");
        return await apiService.add(data);
      } catch {
        return rejectWithValue('Falha ao adicionar procedimento');
      }
    }
);

export const updateProcedimento = createAsyncThunk(
    'procedimento/updateProcedimento',
    async ({id, data}: { id: string, data: Partial<Procedimento> }, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Procedimento>("procedimentos");
        await apiService.update(id, data);
        return {id, ...data};
      } catch {
        return rejectWithValue('Falha ao atualizar procedimento');
      }
    }
);

export const deleteProcedimento = createAsyncThunk(
    'procedimento/deleteProcedimento',
    async (id: string, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Procedimento>("procedimentos");
        await apiService.delete(id);
        return id;
      } catch {
        return rejectWithValue('Falha ao deletar procedimento');
      }
    }
);

export const procedimentoSlice = createSlice({
  name: 'procedimento',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchProcedimentos
    builder
        .addCase(fetchProcedimentos.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchProcedimentos.fulfilled, (state, action: PayloadAction<Turno[]>) => {
          state.loading = false;
          state.procedimentos = action.payload;
        })
        .addCase(fetchProcedimentos.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle fetchProcedimento
        .addCase(fetchProcedimento.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.procedimento = null;
        })
        .addCase(fetchProcedimento.fulfilled, (state, action: PayloadAction<Turno>) => {
          state.loading = false;
          state.procedimento = action.payload;
        })
        .addCase(fetchProcedimento.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          state.procedimento = null;
        })
        // Handle clearProcedimento
        .addCase(clearProcedimento.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(clearProcedimento.fulfilled, (state, action) => {
          state.loading = false;
          state.procedimento = null;
        })
        .addCase(clearProcedimento.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle addProcedimento
        .addCase(addProcedimento.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addProcedimento.fulfilled, (state, action) => {
          state.loading = false;
          state.procedimento = null
          state.procedimentos.push(action.payload as Procedimento);
        })
        .addCase(addProcedimento.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle updateProcedimento
        .addCase(updateProcedimento.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateProcedimento.fulfilled, (state, action) => {
          state.loading = false;
          state.procedimento = {...state.procedimento, ...action.payload} as Turno;
          state.procedimentos = state.procedimentos.map(procedimento =>
              procedimento.id === action.payload.id ?
                  {...procedimento, ...action.payload} :
                  procedimento
          );
        })
        .addCase(updateProcedimento.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle deleteProcedimento
        .addCase(deleteProcedimento.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteProcedimento.fulfilled, (state, action) => {
          state.loading = false;
          state.procedimentos = state.procedimentos.filter(procedimento => procedimento.id !== action.payload);
        })
        .addCase(deleteProcedimento.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
  }
});

export const {clearError} = procedimentoSlice.actions;
export default procedimentoSlice.reducer;