import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Estado} from "@/constants/models/Estado";
import {EstadoService} from "@/api/services/EstadoService";

interface EstadoState {
  estados: Estado[];
  loading: boolean;
  error: string | null;
}

const initialState: EstadoState = {
  estados: [],
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
  }
});

export const {clearError} = estadoSlice.actions;
export default estadoSlice.reducer;