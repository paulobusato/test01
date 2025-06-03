import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Logradouro} from "@/constants/models/Logradouro";
import {LogradouroService} from "@/api/services/LogradouroService";

interface LogradouroState {
  logradouros: Logradouro[];
  loading: boolean;
  error: string | null;
}

const initialState: LogradouroState = {
  logradouros: [],
  loading: false,
  error: null,
};

export const fetchLogradouros = createAsyncThunk(
    'logradouro/fetchLogradouros',
    async (_, {rejectWithValue}) => {
      try {
        const logradouroService = new LogradouroService();
        return await logradouroService.getLogradouros();
      } catch {
        return rejectWithValue('Failed to fetch alunos');
      }
    }
);


export const logradouroSlice = createSlice({
  name: 'logradouro',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchLogradouros
    builder
        .addCase(fetchLogradouros.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchLogradouros.fulfilled, (state, action: PayloadAction<Logradouro[]>) => {
          state.loading = false;
          state.logradouros = action.payload;
        })
        .addCase(fetchLogradouros.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
  }
});

export const {clearError} = logradouroSlice.actions;
export default logradouroSlice.reducer;