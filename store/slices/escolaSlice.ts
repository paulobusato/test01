import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Escola} from "@/constants/models/Escola";
import {EscolaService} from "@/api/services/EscolaService";
import {ApiService} from "@/api/services/ApiService";

interface EscolaState {
  escolas: Escola[];
  escola: Escola | null;
  loading: boolean;
  error: string | null;
}

const initialState: EscolaState = {
  escolas: [],
  escola: null,
  loading: false,
  error: null,
};

export const fetchEscolas = createAsyncThunk(
    'escola/fetchEscolas',
    async (_, {rejectWithValue}) => {
      try {
        const escolaService = new EscolaService();
        return await escolaService.getEscolas();
      } catch {
        return rejectWithValue('Falha ao buscar escola');
      }
    }
);

export const fetchEscola = createAsyncThunk(
    'escola/fetchEscola',
    async (id: string, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Escola>("escolas");
        const escola = await apiService.getById(id)
        if (escola) {
          return escola
        } else {
          return rejectWithValue('Falha ao buscar escola');
        }
      } catch {
        return rejectWithValue('Falha ao buscar escola');
      }
    }
);

export const addEscola = createAsyncThunk(
    'escola/addEscola',
    async (data: Partial<Escola>, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Escola>("escolas");
        return await apiService.add(data);
      } catch {
        return rejectWithValue('Falha ao adicionar escola');
      }
    }
);

export const updateEscola = createAsyncThunk(
    'escola/updateEscola',
    async ({id, data}: { id: string, data: Partial<Escola> }, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Escola>("escolas");
        await apiService.update(id, data);
        return {id, ...data};
      } catch {
        return rejectWithValue('Falha ao atualizar escola');
      }
    }
);

export const deleteEscola = createAsyncThunk(
    'escola/deleteEscola',
    async (id: string, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Escola>("escolas");
        await apiService.delete(id);
        return id;
      } catch {
        return rejectWithValue('Falha ao deletar escola');
      }
    }
);

export const escolaSlice = createSlice({
  name: 'escola',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchEscolas
    builder
        .addCase(fetchEscolas.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchEscolas.fulfilled, (state, action: PayloadAction<Escola[]>) => {
          state.loading = false;
          state.escolas = action.payload;
        })
        .addCase(fetchEscolas.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle fetchEscola
        .addCase(fetchEscola.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.escola = null;
        })
        .addCase(fetchEscola.fulfilled, (state, action: PayloadAction<Escola>) => {
          state.loading = false;
          state.escola = action.payload;
        })
        .addCase(fetchEscola.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          state.escola = null;
        })
        // Handle addEscola
        .addCase(addEscola.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addEscola.fulfilled, (state, action) => {
          state.loading = false;
          state.escola = null
          state.escolas.push(action.payload as Escola);
        })
        .addCase(addEscola.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle updateEscola
        .addCase(updateEscola.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateEscola.fulfilled, (state, action) => {
          state.loading = false;
          state.escola = {...state.escola, ...action.payload} as Escola;
          state.escolas = state.escolas.map(escola =>
              escola.id === action.payload.id ?
                  {...escola, ...action.payload} :
                  escola
          );
        })
        .addCase(updateEscola.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle deleteEscola
        .addCase(deleteEscola.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteEscola.fulfilled, (state, action) => {
          state.loading = false;
          state.escolas = state.escolas.filter(escola => escola.id !== action.payload);
        })
        .addCase(deleteEscola.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
  }
});

export const {clearError} = escolaSlice.actions;
export default escolaSlice.reducer;