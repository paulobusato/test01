import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Sessao} from "@/constants/models/Sessao";
import {SessaoService} from "@/api/services/SessaoService";

interface SessaoState {
  sessoes: Sessao[];
  sessao: Sessao | null;
  loading: boolean;
  error: string | null;
}

const initialState: SessaoState = {
  sessoes: [],
  sessao: null,
  loading: false,
  error: null,
};

export const fetchSessoes = createAsyncThunk(
    'sessao/fetchSessoes',
    async (_, {rejectWithValue}) => {
      try {
        const sessaoService = new SessaoService();
        return await sessaoService.getSessoes();
      } catch {
        return rejectWithValue('Failed to fetch alunos');
      }
    }
);

export const fetchSessao = createAsyncThunk(
    'sessao/fetchSessao',
    async (id: string, {rejectWithValue}) => {
      try {
        const sessaoService = new SessaoService();
        const sessao = await sessaoService.getSessaoById(id);
        if (sessao) {
          return sessao;
        } else {
          return rejectWithValue('Failed to fetch alunos');
        }
      } catch {
        return rejectWithValue('Failed to fetch alunos');
      }
    }
);


export const sessaoSlice = createSlice({
  name: 'sessao',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchSessoes
    builder
        .addCase(fetchSessoes.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchSessoes.fulfilled, (state, action: PayloadAction<Sessao[]>) => {
          state.loading = false;
          state.sessoes = action.payload;
        })
        .addCase(fetchSessoes.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle fetchSessao
        .addCase(fetchSessao.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.sessao = null;
        })
        .addCase(fetchSessao.fulfilled, (state, action: PayloadAction<Sessao>) => {
          state.loading = false;
          state.sessao = action.payload;
        })
        .addCase(fetchSessao.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          state.sessao = null;
        })
  }
});

export const {clearError} = sessaoSlice.actions;
export default sessaoSlice.reducer;