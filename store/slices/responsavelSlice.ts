import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Responsavel} from "@/constants/models/Responsavel";
import {ResponsavelService} from "@/api/services/ResponsavelService";

interface ResponsavelState {
  responsaveis: Responsavel[];
  loading: boolean;
  error: string | null;
}

const initialState: ResponsavelState = {
  responsaveis: [],
  loading: false,
  error: null,
};

export const fetchResponsaveis = createAsyncThunk(
    'responsavel/fetchResponsaveis',
    async (_, {rejectWithValue}) => {
      try {
        const responsavelService = new ResponsavelService();
        return await responsavelService.getResponsaveis();
      } catch {
        return rejectWithValue('Failed to fetch alunos');
      }
    }
);


export const responsavelSlice = createSlice({
  name: 'responsavel',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchResponsaveis
    builder
        .addCase(fetchResponsaveis.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchResponsaveis.fulfilled, (state, action: PayloadAction<Responsavel[]>) => {
          state.loading = false;
          state.responsaveis = action.payload;
        })
        .addCase(fetchResponsaveis.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
  }
});

export const {clearError} = responsavelSlice.actions;
export default responsavelSlice.reducer;