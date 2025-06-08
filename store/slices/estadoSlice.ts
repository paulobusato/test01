import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Estado} from "@/constants/models/Estado";
import {EstadoService} from "@/api/services/EstadoService";
import {ApiService} from "@/api/services/ApiService";

interface EstadoState {
  estados: Estado[];
  estado: Estado | null;
  loading: boolean;
  error: string | null;
}

const initialState: EstadoState = {
  estados: [],
  estado: null,
  loading: false,
  error: null,
};

export const fetchEstados = createAsyncThunk(
    'estado/fetchEstados',
    async (_, {rejectWithValue}) => {
      try {
        const estadoService = new EstadoService();
        return await estadoService.getEstados();
      } catch {
        return rejectWithValue('Failed to fetch alunos');
      }
    }
);

export const fetchEstado = createAsyncThunk(
    'estado/fetchEstado',
    async (id: string, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Estado>("estados");
        const estado = await apiService.getById(id)
        if (estado) {
          return estado
        } else {
          return rejectWithValue('Failed to fetch alunos');
        }
      } catch {
        return rejectWithValue('Failed to fetch alunos');
      }
    }
);

export const addEstado = createAsyncThunk(
    'estado/addEstado',
    async (data: Partial<Estado>, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Estado>("estados");
        return await apiService.add(data);
      } catch {
        return rejectWithValue('Failed to update aluno');
      }
    }
);

export const updateEstado = createAsyncThunk(
    'estado/updateEstado',
    async ({id, data}: { id: string, data: Partial<Estado> }, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Estado>("estados");
        await apiService.update(id, data);
        return {id, ...data};
      } catch {
        return rejectWithValue('Failed to update aluno');
      }
    }
);

export const deleteEstado = createAsyncThunk(
    'estado/deleteEstado',
    async (id: string, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Estado>("alunos");
        await apiService.delete(id);
        return id;
      } catch {
        return rejectWithValue('Failed to delete aluno');
      }
    }
);


export const estadoSlice = createSlice({
  name: 'estado',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchEstados
    builder
        .addCase(fetchEstados.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchEstados.fulfilled, (state, action: PayloadAction<Estado[]>) => {
          state.loading = false;
          state.estados = action.payload;
        })
        .addCase(fetchEstados.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle fetchEstado
        .addCase(fetchEstado.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.estado = null;
        })
        .addCase(fetchEstado.fulfilled, (state, action: PayloadAction<Estado>) => {
          state.loading = false;
          state.estado = action.payload;
        })
        .addCase(fetchEstado.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          state.estado = null;
        })
        // Handle addEstado
        .addCase(addEstado.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addEstado.fulfilled, (state, action) => {
          state.loading = false;
          state.estado = null
          state.estados.push(action.payload as Estado);
        })
        .addCase(addEstado.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle updateEstado
        .addCase(updateEstado.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateEstado.fulfilled, (state, action) => {
          state.loading = false;
          state.estado = {...state.estado, ...action.payload} as Estado;
          state.estados = state.estados.map(estado =>
              estado.id === action.payload.id ?
                  {...estado, ...action.payload} :
                  estado
          );
        })
        .addCase(updateEstado.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle deleteEstado
        .addCase(deleteEstado.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteEstado.fulfilled, (state, action) => {
          state.loading = false;
          state.estados = state.estados.filter(estado => estado.id !== action.payload);
        })
        .addCase(deleteEstado.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
  }
});

export const {clearError} = estadoSlice.actions;
export default estadoSlice.reducer;