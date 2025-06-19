import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Nacionalidade} from "@/constants/models/Nacionalidade";
import {NacionalidadeService} from "@/api/services/NacionalidadeService";
import {ApiService} from "@/api/services/ApiService";

interface NacionalidadeState {
  nacionalidades: Nacionalidade[];
  nacionalidade: Nacionalidade | null;
  loading: boolean;
  error: string | null;
}

const initialState: NacionalidadeState = {
  nacionalidades: [],
  nacionalidade: null,
  loading: false,
  error: null,
};

export const fetchNacionalidades = createAsyncThunk(
    'nacionalidade/fetchNacionalidades',
    async (_, {rejectWithValue}) => {
      try {
        const nacionalidadeService = new NacionalidadeService();
        return await nacionalidadeService.getNacionalidades();
      } catch {
        return rejectWithValue('Falha ao buscar nacionalidade');
      }
    }
);

export const fetchNacionalidade = createAsyncThunk(
    'nacionalidade/fetchNacionalidade',
    async (id: string, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Nacionalidade>("nacionalidades");
        const nacionalidade = await apiService.getById(id)
        if (nacionalidade) {
          return nacionalidade
        } else {
          return rejectWithValue('Falha ao buscar nacionalidade');
        }
      } catch {
        return rejectWithValue('Falha ao buscar nacionalidade');
      }
    }
);

export const clearNacionalidade = createAsyncThunk(
    'nacionalidade/clearNacionalidade',
    async (_, {rejectWithValue}) => {});

export const addNacionalidade = createAsyncThunk(
    'nacionalidade/addNacionalidade',
    async (data: Partial<Nacionalidade>, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Nacionalidade>("nacionalidades");
        return await apiService.add(data);
      } catch {
        return rejectWithValue('Falha ao adicionar nacionalidade');
      }
    }
);

export const updateNacionalidade = createAsyncThunk(
    'nacionalidade/updateNacionalidade',
    async ({id, data}: { id: string, data: Partial<Nacionalidade> }, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Nacionalidade>("nacionalidades");
        await apiService.update(id, data);
        return {id, ...data};
      } catch {
        return rejectWithValue('Falha ao atualizar nacionalidade');
      }
    }
);

export const deleteNacionalidade = createAsyncThunk(
    'nacionalidade/deleteNacionalidade',
    async (id: string, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Nacionalidade>("alunos");
        await apiService.delete(id);
        return id;
      } catch {
        return rejectWithValue('Falha ao deletar nacionalidade');
      }
    }
);

export const nacionalidadeSlice = createSlice({
  name: 'nacionalidade',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchNacionalidades
    builder
        .addCase(fetchNacionalidades.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchNacionalidades.fulfilled, (state, action: PayloadAction<Nacionalidade[]>) => {
          state.loading = false;
          state.nacionalidades = action.payload;
        })
        .addCase(fetchNacionalidades.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle fetchNacionalidade
        .addCase(fetchNacionalidade.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.nacionalidade = null;
        })
        .addCase(fetchNacionalidade.fulfilled, (state, action: PayloadAction<Nacionalidade>) => {
          state.loading = false;
          state.nacionalidade = action.payload;
        })
        .addCase(fetchNacionalidade.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          state.nacionalidade = null;
        })
        // Handle clearNacionalidade
        .addCase(clearNacionalidade.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(clearNacionalidade.fulfilled, (state, action) => {
          state.loading = false;
          state.nacionalidade = null;
        })
        .addCase(clearNacionalidade.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle addNacionalidade
        .addCase(addNacionalidade.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addNacionalidade.fulfilled, (state, action) => {
          state.loading = false;
          state.nacionalidade = null
          state.nacionalidades.push(action.payload as Nacionalidade);
        })
        .addCase(addNacionalidade.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle updateNacionalidade
        .addCase(updateNacionalidade.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateNacionalidade.fulfilled, (state, action) => {
          state.loading = false;
          state.nacionalidade = {...state.nacionalidade, ...action.payload} as Nacionalidade;
          state.nacionalidades = state.nacionalidades.map(nacionalidade =>
              nacionalidade.id === action.payload.id ?
                  {...nacionalidade, ...action.payload} :
                  nacionalidade
          );
        })
        .addCase(updateNacionalidade.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle deleteNacionalidade
        .addCase(deleteNacionalidade.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteNacionalidade.fulfilled, (state, action) => {
          state.loading = false;
          state.nacionalidades = state.nacionalidades.filter(nacionalidade => nacionalidade.id !== action.payload);
        })
        .addCase(deleteNacionalidade.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
  }
});

export const {clearError} = nacionalidadeSlice.actions;
export default nacionalidadeSlice.reducer;