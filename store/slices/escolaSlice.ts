import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Escola} from "@/constants/models/Escola";
import {EscolaService} from "@/api/services/EscolaService";

interface EscolaState {
  escolas: Escola[];
  loading: boolean;
  error: string | null;
}

const initialState: EscolaState = {
  escolas: [],
  loading: false,
  error: null,
};

export const fetchEscolas = createAsyncThunk(
    'escola/fetchEscolas',
    async (_, {rejectWithValue}) => {
      try {
        const escolaService = new EscolaService();
        return await escolaService.getEscolas();
      } catch {
        return rejectWithValue('Failed to fetch alunos');
      }
    }
);


export const escolaSlice = createSlice({
  name: 'escola',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchEscolas
    builder
        .addCase(fetchEscolas.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchEscolas.fulfilled, (state, action: PayloadAction<Escola[]>) => {
          state.loading = false;
          state.escolas = action.payload;
        })
        .addCase(fetchEscolas.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
  }
});

export const {clearError} = escolaSlice.actions;
export default escolaSlice.reducer;