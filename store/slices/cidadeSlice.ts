import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Cidade} from "@/constants/models/Cidade";
import {CidadeService} from "@/api/services/CidadeService";
import {ApiService} from "@/api/services/ApiService";

interface CidadeState {
  cidades: Cidade[];
  cidade: Cidade | null;
  loading: boolean;
  error: string | null;
}

const initialState: CidadeState = {
  cidades: [],
  cidade: null,
  loading: false,
  error: null,
};

export const fetchCidades = createAsyncThunk(
    'cidade/fetchCidades',
    async (_, {rejectWithValue}) => {
      try {
        const cidadeService = new CidadeService();
        return await cidadeService.getCidades();
      } catch {
        return rejectWithValue('Falha ao buscar cidade');
      }
    }
);

export const fetchCidade = createAsyncThunk(
    'cidade/fetchCidade',
    async (id: string, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Cidade>("cidades");
        const aluno = await apiService.getById(id)
        if (aluno) {
          return aluno
        } else {
          return rejectWithValue('Falha ao buscar cidade');
        }
      } catch {
        return rejectWithValue('Falha ao buscar cidade');
      }
    }
);

export const clearCidade = createAsyncThunk(
    'cidade/clearCidade',
    async (_, {rejectWithValue}) => {}
);

export const addCidade = createAsyncThunk(
    'cidade/addCidade',
    async (data: Partial<Cidade>, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Cidade>("cidades");
        return await apiService.add(data);
      } catch {
        return rejectWithValue('Falha ao adicionar cidade');
      }
    }
);

export const updateCidade = createAsyncThunk(
    'cidade/updateCidade',
    async ({id, data}: { id: string, data: Partial<Cidade> }, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Cidade>("cidades");
        await apiService.update(id, data);
        return {id, ...data};
      } catch {
        return rejectWithValue('Falha ao atualizar cidade');
      }
    }
);

export const deleteCidade = createAsyncThunk(
    'cidade/deleteCidade',
    async (id: string, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Cidade>("cidades");
        await apiService.delete(id);
        return id;
      } catch {
        return rejectWithValue('Falha ao deletar cidade');
      }
    }
);


export const cidadeSlice = createSlice({
  name: 'cidade',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchCidades
    builder
        .addCase(fetchCidades.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchCidades.fulfilled, (state, action: PayloadAction<Cidade[]>) => {
          state.loading = false;
          state.cidades = action.payload;
        })
        .addCase(fetchCidades.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle fetchCidade
        .addCase(fetchCidade.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.cidade = null;
        })
        .addCase(fetchCidade.fulfilled, (state, action: PayloadAction<Cidade>) => {
          state.loading = false;
          state.cidade = action.payload;
        })
        .addCase(fetchCidade.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          state.cidade = null;
        })
        // Handle clearCidade
        .addCase(clearCidade.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(clearCidade.fulfilled, (state, action) => {
          state.loading = false;
          state.cidade = null;
        })
        .addCase(clearCidade.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle addCidade
        .addCase(addCidade.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addCidade.fulfilled, (state, action) => {
          state.loading = false;
          state.cidade = null
          state.cidades.push(action.payload as Cidade);
        })
        .addCase(addCidade.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle updateCidade
        .addCase(updateCidade.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateCidade.fulfilled, (state, action) => {
          state.loading = false;
          state.cidade = {...state.cidades, ...action.payload} as Cidade;
          state.cidades = state.cidades.map(cidade =>
              cidade.id === action.payload.id ?
                  {...cidade, ...action.payload} :
                  cidade
          );
        })
        .addCase(updateCidade.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle deleteCidade
        .addCase(deleteCidade.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteCidade.fulfilled, (state, action) => {
          state.loading = false;
          state.cidades = state.cidades.filter(cidade => cidade.id !== action.payload);
        })
        .addCase(deleteCidade.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
  }
});

export const {clearError} = cidadeSlice.actions;
export default cidadeSlice.reducer;