import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Logradouro} from "@/constants/models/Logradouro";
import {LogradouroService} from "@/api/services/LogradouroService";
import {ApiService} from "@/api/services/ApiService";

interface LogradouroState {
  logradouros: Logradouro[];
  logradouro: Logradouro | null;
  loading: boolean;
  error: string | null;
}

const initialState: LogradouroState = {
  logradouros: [],
  logradouro: null,
  loading: false,
  error: null,
};

export const fetchLogradouros = createAsyncThunk(
    'logradouro/fetchLogradouros',
    async (_, {rejectWithValue}) => {
      try {
        const logradouroService = new LogradouroService();
        return await logradouroService.getLogradouros();
      } catch {
        return rejectWithValue('Falha ao buscar logradouro');
      }
    }
);

export const fetchLogradouro = createAsyncThunk(
    'logradouro/fetchLogradouro',
    async (id: string, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Logradouro>("logradouros");
        const logradouro = await apiService.getById(id)
        if (logradouro) {
          return logradouro
        } else {
          return rejectWithValue('Falha ao buscar logradouro');
        }
      } catch {
        return rejectWithValue('Falha ao buscar logradouro');
      }
    }
);

export const addLogradouro = createAsyncThunk(
    'logradouro/addLogradouro',
    async (data: Partial<Logradouro>, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Logradouro>("logradouros");
        return await apiService.add(data);
      } catch {
        return rejectWithValue('Falha ao adicionar logradouro');
      }
    }
);

export const updateLogradouro = createAsyncThunk(
    'logradouro/updateLogradouro',
    async ({id, data}: { id: string, data: Partial<Logradouro> }, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Logradouro>("logradouros");
        await apiService.update(id, data);
        return {id, ...data};
      } catch {
        return rejectWithValue('Falha ao atualizar logradouro');
      }
    }
);

export const deleteLogradouro = createAsyncThunk(
    'logradouro/deleteLogradouro',
    async (id: string, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Logradouro>("alunos");
        await apiService.delete(id);
        return id;
      } catch {
        return rejectWithValue('Falha ao deletar logradouro');
      }
    }
);

export const logradouroSlice = createSlice({
  name: 'logradouro',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchLogradouros
    builder
        .addCase(fetchLogradouros.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchLogradouros.fulfilled, (state, action: PayloadAction<Logradouro[]>) => {
          state.loading = false;
          state.logradouros = action.payload;
        })
        .addCase(fetchLogradouros.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle fetchLogradouro
        .addCase(fetchLogradouro.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.logradouro = null;
        })
        .addCase(fetchLogradouro.fulfilled, (state, action: PayloadAction<Logradouro>) => {
          state.loading = false;
          state.logradouro = action.payload;
        })
        .addCase(fetchLogradouro.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          state.logradouro = null;
        })
        // Handle addLogradouro
        .addCase(addLogradouro.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addLogradouro.fulfilled, (state, action) => {
          state.loading = false;
          state.logradouro = null
          state.logradouros.push(action.payload as Logradouro);
        })
        .addCase(addLogradouro.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle updateLogradouro
        .addCase(updateLogradouro.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateLogradouro.fulfilled, (state, action) => {
          state.loading = false;
          state.logradouro = {...state.logradouro, ...action.payload} as Logradouro;
          state.logradouros = state.logradouros.map(logradouro =>
              logradouro.id === action.payload.id ?
                  {...logradouro, ...action.payload} :
                  logradouro
          );
        })
        .addCase(updateLogradouro.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle deleteLogradouro
        .addCase(deleteLogradouro.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteLogradouro.fulfilled, (state, action) => {
          state.loading = false;
          state.logradouros = state.logradouros.filter(logradouro => logradouro.id !== action.payload);
        })
        .addCase(deleteLogradouro.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
  }
});

export const {clearError} = logradouroSlice.actions;
export default logradouroSlice.reducer;