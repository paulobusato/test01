import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Atividade} from "@/constants/models/Atividade";
import {AtividadeService} from "@/api/services/AtividadeService";
import {ApiService} from "@/api/services/ApiService";

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
        return rejectWithValue('Falha ao buscar atividade');
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
          return rejectWithValue('Falha ao buscar atividade');
        }
      } catch {
        return rejectWithValue('Falha ao buscar atividade');
      }
    }
);

export const addAtividade = createAsyncThunk(
    'atividade/addAtividade',
    async (data: Partial<Atividade>, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Atividade>("atividades");
        return await apiService.add(data);
      } catch {
        return rejectWithValue('Falha ao adicionar atividade');
      }
    }
);

export const updateAtividade = createAsyncThunk(
    'atividade/updateAtividade',
    async ({id, data}: { id: string, data: Partial<Atividade> }, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Atividade>("atividades");
        await apiService.update(id, data);
        return {id, ...data};
      } catch {
        return rejectWithValue('Falha ao atualizar atividade');
      }
    }
);

export const deleteAtividade = createAsyncThunk(
    'atividade/deleteAtividade',
    async (id: string, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Atividade>("atividades");
        await apiService.delete(id);
        return id;
      } catch {
        return rejectWithValue('Falha ao deletar atividade');
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
        // Handle addAtividade
        .addCase(addAtividade.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addAtividade.fulfilled, (state, action) => {
          state.loading = false;
          state.atividade = null
          state.atividades.push(action.payload as Atividade);
        })
        .addCase(addAtividade.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle updateAtividade
        .addCase(updateAtividade.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateAtividade.fulfilled, (state, action) => {
          state.loading = false;
          state.atividade = {...state.atividade, ...action.payload} as Atividade;
          state.atividades = state.atividades.map(atividade =>
              atividade.id === action.payload.id ?
                  {...atividade, ...action.payload} :
                  atividade
          );
        })
        .addCase(updateAtividade.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle deleteAluno
        .addCase(deleteAtividade.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteAtividade.fulfilled, (state, action) => {
          state.loading = false;
          state.atividades = state.atividades.filter(atividade => atividade.id !== action.payload);
        })
        .addCase(deleteAtividade.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
  }
});

export const {clearError} = atividadeSlice.actions;
export default atividadeSlice.reducer;