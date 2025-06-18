import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Sessao} from "@/constants/models/Sessao";
import {ApiService} from "@/api/services/ApiService";

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
        const apiService = new ApiService<Sessao>("sessoes");
        return await apiService.getAll();
      } catch {
        return rejectWithValue('Falha ao buscar sessao');
      }
    }
);

export const fetchSessao = createAsyncThunk(
    'sessao/fetchSessao',
    async (id: string, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Sessao>("sessoes");
        const sessao = await apiService.getById(id);
        if (sessao) {
          return sessao;
        } else {
          return rejectWithValue('Falha ao buscar sessao');
        }
      } catch {
        return rejectWithValue('Falha ao buscar sessao');
      }
    }
);

export const addSessao = createAsyncThunk(
    'sessao/addSessao',
    async (data: Partial<Sessao>, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Sessao>("sessoes");
        return await apiService.add(data);
      } catch {
        return rejectWithValue('Falha ao adicionar sessao');
      }
    }
);

export const updateSessao = createAsyncThunk(
    'sessao/updateSessao',
    async ({id, data}: { id: string, data: Partial<Sessao> }, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Sessao>("sessoes");
        await apiService.update(id, data);
        return {id, ...data};
      } catch {
        return rejectWithValue('Falha ao atualizar sessao');
      }
    }
);

export const deleteSessao = createAsyncThunk(
    'sessao/deleteSessao',
    async (id: string, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Sessao>("sessoes");
        await apiService.delete(id);
        return id;
      } catch {
        return rejectWithValue('Falha ao deletar sessao');
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
        // Handle addSessao
        .addCase(addSessao.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addSessao.fulfilled, (state, action) => {
          state.loading = false;
          state.sessao = null
          state.sessoes.push(action.payload as Sessao);
        })
        .addCase(addSessao.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle updateSessao
        .addCase(updateSessao.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateSessao.fulfilled, (state, action) => {
          state.loading = false;
          state.sessao = {...state.sessao, ...action.payload} as Sessao;
          state.sessoes = state.sessoes.map(sessao =>
              sessao.id === action.payload.id ?
                  {...sessao, ...action.payload} :
                  sessao
          );
        })
        .addCase(updateSessao.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle deleteSessao
        .addCase(deleteSessao.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteSessao.fulfilled, (state, action) => {
          state.loading = false;
          state.sessoes = state.sessoes.filter(sessao => sessao.id !== action.payload);
        })
        .addCase(deleteSessao.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
  }
});

export const {clearError} = sessaoSlice.actions;
export default sessaoSlice.reducer;