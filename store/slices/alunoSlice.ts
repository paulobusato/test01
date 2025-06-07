import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Aluno} from "@/constants/models/Aluno";
import {AlunoService} from "@/api/services/AlunoService";

interface AlunoState {
  alunos: Aluno[];
  aluno: Aluno | null;
  loading: boolean;
  error: string | null;
}

const initialState: AlunoState = {
  alunos: [],
  aluno: null,
  loading: false,
  error: null,
};

export const fetchAlunos = createAsyncThunk(
    'aluno/fetchAlunos',
    async (_, {rejectWithValue}) => {
      try {
        const alunoService = new AlunoService();
        return await alunoService.getAlunos();
      } catch {
        return rejectWithValue('Failed to fetch alunos');
      }
    }
);

export const fetchAluno = createAsyncThunk(
    'aluno/fetchAluno',
    async (id: string, {rejectWithValue}) => {
      try {
        const alunoService = new AlunoService();
        const aluno = await alunoService.getById(id)
        if (aluno) {
          return aluno
        } else {
          return rejectWithValue('Failed to fetch alunos');
        }
      } catch {
        return rejectWithValue('Failed to fetch alunos');
      }
    }
);

export const addAluno = createAsyncThunk(
    'aluno/addAluno',
    async (data: Partial<Aluno>, { rejectWithValue }) => {
      try {
        const alunoService = new AlunoService();
        return await alunoService.add(data);
      } catch {
        return rejectWithValue('Failed to update aluno');
      }
    }
);

export const updateAluno = createAsyncThunk(
    'aluno/updateAluno',
    async ({ id, data }: { id: string, data: Partial<Aluno> }, { rejectWithValue }) => {
      try {
        const alunoService = new AlunoService();
        await alunoService.update(id, data);
        return { id, ...data };
      } catch {
        return rejectWithValue('Failed to update aluno');
      }
    }
);



export const alunoSlice = createSlice({
  name: 'aluno',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchAlunos
    builder
        .addCase(fetchAlunos.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchAlunos.fulfilled, (state, action: PayloadAction<Aluno[]>) => {
          state.loading = false;
          state.alunos = action.payload;
        })
        .addCase(fetchAlunos.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle fetchAluno
        .addCase(fetchAluno.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.aluno = null;
        })
        .addCase(fetchAluno.fulfilled, (state, action: PayloadAction<Aluno>) => {
          state.loading = false;
          state.aluno = action.payload;
        })
        .addCase(fetchAluno.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          state.aluno = null;
        })
        // Handle addAluno
        .addCase(addAluno.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addAluno.fulfilled, (state, action) => {
          state.loading = false;
          state.aluno = null
          state.alunos.push(action.payload as Aluno);
        })
        .addCase(addAluno.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle updateAluno
        .addCase(updateAluno.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateAluno.fulfilled, (state, action) => {
          state.loading = false;
          state.aluno = { ...state.aluno, ...action.payload } as Aluno;
          state.alunos = state.alunos.map(aluno =>
              aluno.id === action.payload.id ?
                  { ...aluno, ...action.payload } :
                  aluno
          );
        })
        .addCase(updateAluno.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
  }
});

export const {clearError} = alunoSlice.actions;
export default alunoSlice.reducer;