import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Bairro} from "@/constants/models/Bairro";
import {BairroService} from "@/api/services/BairroService";

interface BairroState {
  bairros: Bairro[];
  loading: boolean;
  error: string | null;
}

const initialState: BairroState = {
  bairros: [],
  loading: false,
  error: null,
};

export const fetchBairros = createAsyncThunk(
    'bairro/fetchBairros',
    async (_, {rejectWithValue}) => {
      try {
        const bairroService = new BairroService();
        return await bairroService.getBairros();
      } catch {
        return rejectWithValue('Failed to fetch alunos');
      }
    }
);


export const bairroSlice = createSlice({
  name: 'bairro',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchBairros
    builder
        .addCase(fetchBairros.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchBairros.fulfilled, (state, action: PayloadAction<Bairro[]>) => {
          state.loading = false;
          state.bairros = action.payload;
        })
        .addCase(fetchBairros.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
  }
});

export const {clearError} = bairroSlice.actions;
export default bairroSlice.reducer;