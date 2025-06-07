import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Atividade} from "@/constants/models/Atividade";
import {AtividadeService} from "@/api/services/AtividadeService";
import {AlunoService} from "@/api/services/AlunoService";

interface AtividadeState {
  atividades: Atividade[];
  atividade: Atividade | null;
  loading: boolean;
  error: string | null;
}

const initialState: AtividadeState = {
  atividades: [],
  atividade: null,
  loading: false,
  error: null,
};

export const fetchAtividades = createAsyncThunk(
    'atividade/fetchAtividades',
    async (_, {rejectWithValue}) => {
      try {
        const atividadeService = new AtividadeService();
        return await atividadeService.getAtividades();
      } catch {
        return rejectWithValue('Failed to fetch alunos');
      }
    }
);

export const fetchAtividade = createAsyncThunk(
    'atividade/fetchAtividade',
    async (id: string, {rejectWithValue}) => {
      try {
        const atividadeService = new AtividadeService();
        const atividade = await atividadeService.getAtividadeById(id)
        if (atividade) {
          return atividade
        } else {
          return rejectWithValue('Failed to fetch alunos');
        }
      } catch {
        return rejectWithValue('Failed to fetch alunos');
      }
    }
);


export const atividadeSlice = createSlice({
  name: 'atividade',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchAtividades
    builder
        .addCase(fetchAtividades.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchAtividades.fulfilled, (state, action: PayloadAction<Atividade[]>) => {
          state.loading = false;
          state.atividades = action.payload;
        })
        .addCase(fetchAtividades.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle fetchAtividade
        .addCase(fetchAtividade.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.atividade = null;
        })
        .addCase(fetchAtividade.fulfilled, (state, action: PayloadAction<Atividade>) => {
          state.loading = false;
          state.atividade = action.payload;
        })
        .addCase(fetchAtividade.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          state.atividade = null;
        })
  }
});

export const {clearError} = atividadeSlice.actions;
export default atividadeSlice.reducer;