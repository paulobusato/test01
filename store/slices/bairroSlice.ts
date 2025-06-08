import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Bairro} from "@/constants/models/Bairro";
import {BairroService} from "@/api/services/BairroService";
import {ApiService} from "@/api/services/ApiService";

interface BairroState {
  bairros: Bairro[];
  bairro: Bairro | null;
  loading: boolean;
  error: string | null;
}

const initialState: BairroState = {
  bairros: [],
  bairro: null,
  loading: false,
  error: null,
};

export const fetchBairros = createAsyncThunk(
    'bairro/fetchBairros',
    async (_, {rejectWithValue}) => {
      try {
        const bairroService = new BairroService();
        return await bairroService.getBairros();
      } catch {
        return rejectWithValue('Failed to fetch alunos');
      }
    }
);

export const fetchBairro = createAsyncThunk(
    'bairro/fetchBairro',
    async (id: string, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Bairro>("bairros");
        const bairro = await apiService.getById(id)
        if (bairro) {
          return bairro
        } else {
          return rejectWithValue('Failed to fetch alunos');
        }
      } catch {
        return rejectWithValue('Failed to fetch alunos');
      }
    }
);

export const addBairro = createAsyncThunk(
    'bairro/addBairro',
    async (data: Partial<Bairro>, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Bairro>("bairros");
        return await apiService.add(data);
      } catch {
        return rejectWithValue('Failed to update aluno');
      }
    }
);

export const updateBairro = createAsyncThunk(
    'bairro/updateBairro',
    async ({id, data}: { id: string, data: Partial<Bairro> }, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Bairro>("bairros");
        await apiService.update(id, data);
        return {id, ...data};
      } catch {
        return rejectWithValue('Failed to update aluno');
      }
    }
);

export const deleteBairro = createAsyncThunk(
    'bairro/deleteBairro',
    async (id: string, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Bairro>("bairros");
        await apiService.delete(id);
        return id;
      } catch {
        return rejectWithValue('Failed to delete aluno');
      }
    }
);

export const bairroSlice = createSlice({
  name: 'bairro',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchBairros
    builder
        .addCase(fetchBairros.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchBairros.fulfilled, (state, action: PayloadAction<Bairro[]>) => {
          state.loading = false;
          state.bairros = action.payload;
        })
        .addCase(fetchBairros.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle fetchBairro
        .addCase(fetchBairro.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.bairro = null;
        })
        .addCase(fetchBairro.fulfilled, (state, action: PayloadAction<Bairro>) => {
          state.loading = false;
          state.bairro = action.payload;
        })
        .addCase(fetchBairro.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          state.bairro = null;
        })
        // Handle addBairro
        .addCase(addBairro.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addBairro.fulfilled, (state, action) => {
          state.loading = false;
          state.bairro = null
          state.bairros.push(action.payload as Bairro);
        })
        .addCase(addBairro.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle updateBairro
        .addCase(updateBairro.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateBairro.fulfilled, (state, action) => {
          state.loading = false;
          state.bairro = {...state.bairros, ...action.payload} as Bairro;
          state.bairros = state.bairros.map(bairro =>
              bairro.id === action.payload.id ?
                  {...bairro, ...action.payload} :
                  bairro
          );
        })
        .addCase(updateBairro.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle deleteBairro
        .addCase(deleteBairro.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteBairro.fulfilled, (state, action) => {
          state.loading = false;
          state.bairros = state.bairros.filter(bairro => bairro.id !== action.payload);
        })
        .addCase(deleteBairro.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
  }
});

export const {clearError} = bairroSlice.actions;
export default bairroSlice.reducer;