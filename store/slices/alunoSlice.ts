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
  }
});

export const {clearError} = alunoSlice.actions;
export default alunoSlice.reducer;