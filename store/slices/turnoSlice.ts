import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Turno} from "@/constants/models/Turno";
import {TurnoService} from "@/api/services/TurnoService";
import {ApiService} from "@/api/services/ApiService";

interface TurnoState {
  turnos: Turno[];
  turno: Turno | null;
  loading: boolean;
  error: string | null;
}

const initialState: TurnoState = {
  turnos: [],
  turno: null,
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

export const fetchTurno = createAsyncThunk(
    'turno/fetchTurno',
    async (id: string, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Turno>("turnos");
        const turno = await apiService.getById(id)
        if (turno) {
          return turno
        } else {
          return rejectWithValue('Failed to fetch alunos');
        }
      } catch {
        return rejectWithValue('Failed to fetch alunos');
      }
    }
);

export const addTurno = createAsyncThunk(
    'turno/addTurno',
    async (data: Partial<Turno>, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Turno>("turnos");
        return await apiService.add(data);
      } catch {
        return rejectWithValue('Failed to update aluno');
      }
    }
);

export const updateTurno = createAsyncThunk(
    'turno/updateTurno',
    async ({id, data}: { id: string, data: Partial<Turno> }, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Turno>("turnos");
        await apiService.update(id, data);
        return {id, ...data};
      } catch {
        return rejectWithValue('Failed to update aluno');
      }
    }
);

export const deleteTurno = createAsyncThunk(
    'turno/deleteTurno',
    async (id: string, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Turno>("turnos");
        await apiService.delete(id);
        return id;
      } catch {
        return rejectWithValue('Failed to delete aluno');
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
        // Handle fetchTurno
        .addCase(fetchTurno.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.turno = null;
        })
        .addCase(fetchTurno.fulfilled, (state, action: PayloadAction<Turno>) => {
          state.loading = false;
          state.turno = action.payload;
        })
        .addCase(fetchTurno.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          state.turno = null;
        })
        // Handle addTurno
        .addCase(addTurno.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addTurno.fulfilled, (state, action) => {
          state.loading = false;
          state.turno = null
          state.turnos.push(action.payload as Turno);
        })
        .addCase(addTurno.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle updateTurno
        .addCase(updateTurno.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateTurno.fulfilled, (state, action) => {
          state.loading = false;
          state.turno = {...state.turno, ...action.payload} as Turno;
          state.turnos = state.turnos.map(turno =>
              turno.id === action.payload.id ?
                  {...turno, ...action.payload} :
                  turno
          );
        })
        .addCase(updateTurno.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle deleteTurno
        .addCase(deleteTurno.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteTurno.fulfilled, (state, action) => {
          state.loading = false;
          state.turnos = state.turnos.filter(turno => turno.id !== action.payload);
        })
        .addCase(deleteTurno.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
  }
});

export const {clearError} = turnoSlice.actions;
export default turnoSlice.reducer;