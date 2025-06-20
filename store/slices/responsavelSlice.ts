import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Responsavel} from "@/constants/models/Responsavel";
import {ResponsavelService} from "@/api/services/ResponsavelService";
import {ApiService} from "@/api/services/ApiService";

interface ResponsavelState {
  responsaveis: Responsavel[];
  responsavel: Responsavel | null;
  loading: boolean;
  error: string | null;
}

const initialState: ResponsavelState = {
  responsaveis: [],
  responsavel: null,
  loading: false,
  error: null,
};

export const fetchResponsaveis = createAsyncThunk(
    'responsavel/fetchResponsaveis',
    async (_, {rejectWithValue}) => {
      try {
        const responsavelService = new ResponsavelService();
        return await responsavelService.getResponsaveis();
      } catch {
        return rejectWithValue('Falha ao buscar responsavel');
      }
    }
);

export const fetchResponsavel = createAsyncThunk(
    'responsavel/fetchResponsavel',
    async (id: string, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Responsavel>("responsaveis");
        const responsavel = await apiService.getById(id)
        if (responsavel) {
          return responsavel
        } else {
          return rejectWithValue('Falha ao buscar responsavel');
        }
      } catch {
        return rejectWithValue('Falha ao buscar responsavel');
      }
    }
);

export const clearResponsavel = createAsyncThunk(
    'responsavel/clearResponsavel',
    async (_, {rejectWithValue}) => {}
);

export const addResponsavel = createAsyncThunk(
    'responsavel/addResponsavel',
    async (data: Partial<Responsavel>, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Responsavel>("responsaveis");
        return await apiService.add(data);
      } catch {
        return rejectWithValue('Falha ao adicionar responsavel');
      }
    }
);

export const updateResponsavel = createAsyncThunk(
    'responsavel/updateResponsavel',
    async ({id, data}: { id: string, data: Partial<Responsavel> }, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Responsavel>("responsaveis");
        await apiService.update(id, data);
        return {id, ...data};
      } catch {
        return rejectWithValue('Falha ao atualizar responsavel');
      }
    }
);

export const deleteResponsavel = createAsyncThunk(
    'responsavel/deleteResponsavel',
    async (id: string, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Responsavel>("responsaveis");
        await apiService.delete(id);
        return id;
      } catch {
        return rejectWithValue('Falha ao deletar responsavel');
      }
    }
);

export const responsavelSlice = createSlice({
  name: 'responsavel',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchResponsaveis
    builder
        .addCase(fetchResponsaveis.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchResponsaveis.fulfilled, (state, action: PayloadAction<Responsavel[]>) => {
          state.loading = false;
          state.responsaveis = action.payload;
        })
        .addCase(fetchResponsaveis.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle fetchResponsavel
        .addCase(fetchResponsavel.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.responsavel = null;
        })
        .addCase(fetchResponsavel.fulfilled, (state, action: PayloadAction<Responsavel>) => {
          state.loading = false;
          state.responsavel = action.payload;
        })
        .addCase(fetchResponsavel.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          state.responsavel = null;
        })
        // Handle clearResponsavel
        .addCase(clearResponsavel.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(clearResponsavel.fulfilled, (state, action) => {
          state.loading = false;
          state.responsavel = null;
        })
        .addCase(clearResponsavel.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle addResponsavel
        .addCase(addResponsavel.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addResponsavel.fulfilled, (state, action) => {
          state.loading = false;
          state.responsavel = null
          state.responsaveis.push(action.payload as Responsavel);
        })
        .addCase(addResponsavel.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle updateResponsavel
        .addCase(updateResponsavel.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateResponsavel.fulfilled, (state, action) => {
          state.loading = false;
          state.responsavel = {...state.responsavel, ...action.payload} as Responsavel;
          state.responsaveis = state.responsaveis.map(responsavel =>
              responsavel.id === action.payload.id ?
                  {...responsavel, ...action.payload} :
                  responsavel
          );
        })
        .addCase(updateResponsavel.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle deleteResponsavel
        .addCase(deleteResponsavel.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteResponsavel.fulfilled, (state, action) => {
          state.loading = false;
          state.responsaveis = state.responsaveis.filter(responsavel => responsavel.id !== action.payload);
        })
        .addCase(deleteResponsavel.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
  }
});

export const {clearError} = responsavelSlice.actions;
export default responsavelSlice.reducer;