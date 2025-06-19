import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Turno} from "@/constants/models/Turno";
import {ApiService} from "@/api/services/ApiService";
import {Status} from "@/constants/models/Status";
import {StatusService} from "@/api/services/StatusService";

interface StatusState {
  statuses: Status[];
  status: Status | null;
  loading: boolean;
  error: string | null;
}

const initialState: StatusState = {
  statuses: [],
  status: null,
  loading: false,
  error: null,
};

export const fetchStatuses = createAsyncThunk(
    'status/fetchStatuses',
    async (_, {rejectWithValue}) => {
      try {
        const statusService = new StatusService();
        return await statusService.getStatuses();
      } catch {
        return rejectWithValue('Falha ao buscar status');
      }
    }
);

export const fetchStatus = createAsyncThunk(
    'status/fetchStatus',
    async (id: string, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Status>("statuses");
        const status = await apiService.getById(id)
        if (status) {
          return status
        } else {
          return rejectWithValue('Falha ao buscar status');
        }
      } catch {
        return rejectWithValue('Falha ao buscar status');
      }
    }
);

export const clearStatus = createAsyncThunk(
    'status/clearStatus',
    async (_, {rejectWithValue}) => {});

export const addStatus = createAsyncThunk(
    'status/addStatus',
    async (data: Partial<Status>, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Status>("statuses");
        return await apiService.add(data);
      } catch {
        return rejectWithValue('Falha ao adicionar status');
      }
    }
);

export const updateStatus = createAsyncThunk(
    'status/updateStatus',
    async ({id, data}: { id: string, data: Partial<Status> }, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Status>("statuses");
        await apiService.update(id, data);
        return {id, ...data};
      } catch {
        return rejectWithValue('Falha ao atualizar status');
      }
    }
);

export const deleteStatus = createAsyncThunk(
    'status/deleteStatus',
    async (id: string, {rejectWithValue}) => {
      try {
        const apiService = new ApiService<Status>("statuses");
        await apiService.delete(id);
        return id;
      } catch {
        return rejectWithValue('Falha ao deletar status');
      }
    }
);

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchStatuses
    builder
        .addCase(fetchStatuses.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchStatuses.fulfilled, (state, action: PayloadAction<Turno[]>) => {
          state.loading = false;
          state.statuses = action.payload;
        })
        .addCase(fetchStatuses.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle fetchStatus
        .addCase(fetchStatus.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.status = null;
        })
        .addCase(fetchStatus.fulfilled, (state, action: PayloadAction<Turno>) => {
          state.loading = false;
          state.status = action.payload;
        })
        .addCase(fetchStatus.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          state.status = null;
        })
        // Handle clearStatus
        .addCase(clearStatus.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(clearStatus.fulfilled, (state, action) => {
          state.loading = false;
          state.status = null;
        })
        .addCase(clearStatus.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle addStatus
        .addCase(addStatus.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addStatus.fulfilled, (state, action) => {
          state.loading = false;
          state.status = null
          state.statuses.push(action.payload as Status);
        })
        .addCase(addStatus.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle updateStatus
        .addCase(updateStatus.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateStatus.fulfilled, (state, action) => {
          state.loading = false;
          state.status = {...state.status, ...action.payload} as Turno;
          state.statuses = state.statuses.map(status =>
              status.id === action.payload.id ?
                  {...status, ...action.payload} :
                  status
          );
        })
        .addCase(updateStatus.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Handle deleteStatus
        .addCase(deleteStatus.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteStatus.fulfilled, (state, action) => {
          state.loading = false;
          state.statuses = state.statuses.filter(status => status.id !== action.payload);
        })
        .addCase(deleteStatus.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
  }
});

export const {clearError} = statusSlice.actions;
export default statusSlice.reducer;