import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Sessao} from "@/constants/models/Sessao";
import {SessaoService} from "@/api/services/SessaoService";

interface SessaoState {
  sessoes: Sessao[];
  loading: boolean;
  error: string | null;
}

const initialState: SessaoState = {
  sessoes: [],
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
  }
});

export const {clearError} = sessaoSlice.actions;
export default sessaoSlice.reducer;