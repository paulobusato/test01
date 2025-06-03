import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Cidade} from "@/constants/models/Cidade";
import {CidadeService} from "@/api/services/CidadeService";

interface CidadeState {
  cidades: Cidade[];
  loading: boolean;
  error: string | null;
}

const initialState: CidadeState = {
  cidades: [],
  loading: false,
  error: null,
};

export const fetchCidades = createAsyncThunk(
    'cidade/fetchCidades',
    async (_, {rejectWithValue}) => {
      try {
        const cidadeService = new CidadeService();
        return await cidadeService.getCidades();
      } catch {
        return rejectWithValue('Failed to fetch alunos');
      }
    }
);


export const cidadeSlice = createSlice({
  name: 'cidade',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchCidades
    builder
        .addCase(fetchCidades.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchCidades.fulfilled, (state, action: PayloadAction<Cidade[]>) => {
          state.loading = false;
          state.cidades = action.payload;
        })
        .addCase(fetchCidades.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
  }
});

export const {clearError} = cidadeSlice.actions;
export default cidadeSlice.reducer;