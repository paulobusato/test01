import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Aluno} from "@/constants/models/Aluno";
import {AlunoService} from "@/api/services/AlunoService";

interface AlunoState {
  alunos: Aluno[];
  loading: boolean;
  error: string | null;
}

const initialState: AlunoState = {
  alunos: [],
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
  }
});

export const {clearError} = alunoSlice.actions;
export default alunoSlice.reducer;