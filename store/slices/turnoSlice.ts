import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Turno} from "@/constants/models/Turno";
import {TurnoService} from "@/api/services/TurnoService";

interface TurnoState {
  turnos: Turno[];
  loading: boolean;
  error: string | null;
}

const initialState: TurnoState = {
  turnos: [],
  loading: false,
  error: null,
};

export const fetchTurnos = createAsyncThunk(
    'turno/fetchTurnos',
    async (_, {rejectWithValue}) => {
      try {
        const turnoService = new TurnoService();
        return await turnoService.getTurnos();
      } catch {
        return rejectWithValue('Failed to fetch alunos');
      }
    }
);


export const turnoSlice = createSlice({
  name: 'turno',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchTurnos
    builder
        .addCase(fetchTurnos.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchTurnos.fulfilled, (state, action: PayloadAction<Turno[]>) => {
          state.loading = false;
          state.turnos = action.payload;
        })
        .addCase(fetchTurnos.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
  }
});

export const {clearError} = turnoSlice.actions;
export default turnoSlice.reducer;