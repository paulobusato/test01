import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Nacionalidade} from "@/constants/models/Nacionalidade";
import {NacionalidadeService} from "@/api/services/NacionalidadeService";

interface NacionalidadeState {
  nacionalidades: Nacionalidade[];
  loading: boolean;
  error: string | null;
}

const initialState: NacionalidadeState = {
  nacionalidades: [],
  loading: false,
  error: null,
};

export const fetchNacionalidades = createAsyncThunk(
    'nacionalidade/fetchNacionalidades',
    async (_, {rejectWithValue}) => {
      try {
        const nacionalidadeService = new NacionalidadeService();
        return await nacionalidadeService.getNacionalidades();
      } catch {
        return rejectWithValue('Failed to fetch alunos');
      }
    }
);


export const nacionalidadeSlice = createSlice({
  name: 'nacionalidade',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchNacionalidades
    builder
        .addCase(fetchNacionalidades.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchNacionalidades.fulfilled, (state, action: PayloadAction<Nacionalidade[]>) => {
          state.loading = false;
          state.nacionalidades = action.payload;
        })
        .addCase(fetchNacionalidades.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
  }
});

export const {clearError} = nacionalidadeSlice.actions;
export default nacionalidadeSlice.reducer;