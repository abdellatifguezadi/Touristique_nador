import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';
import type { Lieu, LieuxState, LieuStatus } from '../../types';
import { fetchLieux } from './lieuxActions';

const getErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
};

export const addLieu = createAsyncThunk(
  'lieux/addLieu',
  async (lieu: Omit<Lieu, 'id'>, { rejectWithValue }) => {
    try {
      const now = new Date().toISOString();
      const payload: Omit<Lieu, 'id'> = {
        ...lieu,
        createdAt: lieu.createdAt ?? now,
        updatedAt: now,
      };
      const response = await api.post('/lieux', payload);
      return response.data as Lieu;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Erreur lors de la creation du lieu'));
    }
  }
);

type UpdateLieuPayload = {
  id: number;
  data: Partial<Omit<Lieu, 'id'>>;
};

export const updateLieu = createAsyncThunk(
  'lieux/updateLieu',
  async ({ id, data }: UpdateLieuPayload, { rejectWithValue }) => {
    try {
      const payload = {
        ...data,
        updatedAt: new Date().toISOString(),
      };
      const response = await api.patch(`/lieux/${id}`, payload);
      return response.data as Lieu;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Erreur lors de la modification du lieu'));
    }
  }
);

type ToggleLieuStatusPayload = {
  id: number;
  statut: LieuStatus;
};

export const toggleLieuStatus = createAsyncThunk(
  'lieux/toggleLieuStatus',
  async ({ id, statut }: ToggleLieuStatusPayload, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/lieux/${id}`, {
        statut,
        updatedAt: new Date().toISOString(),
      });
      return response.data as Lieu;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Erreur lors de la mise a jour du statut'));
    }
  }
);

export const deleteLieu = createAsyncThunk(
  'lieux/deleteLieu',
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`/lieux/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Erreur lors de la suppression du lieu'));
    }
  }
);

const initialState: LieuxState = {
  lieux: [],
  currentLieu: null,
  isLoading: false,
  error: null,
  searchQuery: '',
  statusFilter: '',
  categoryFilter: ''
};

const lieuxSlice = createSlice({
  name: 'lieux',
  initialState,
  reducers: {
    clearCurrentLieu: (state) => {
      state.currentLieu = null;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload;
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.categoryFilter = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLieux.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLieux.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lieux = action.payload;
      })
      .addCase(fetchLieux.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Erreur lors du chargement';
      })
      // Add Lieu
      .addCase(addLieu.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addLieu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lieux.push(action.payload);
      })
      .addCase(addLieu.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || action.error.message || 'Erreur lors de l\'ajout';
      })
      // Update Lieu
      .addCase(updateLieu.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateLieu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lieux = state.lieux.map((lieu) =>
          lieu.id === action.payload.id ? action.payload : lieu
        );
      })
      .addCase(updateLieu.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || action.error.message || 'Erreur lors de la modification';
      })
      // Toggle status
      .addCase(toggleLieuStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(toggleLieuStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lieux = state.lieux.map((lieu) =>
          lieu.id === action.payload.id ? action.payload : lieu
        );
      })
      .addCase(toggleLieuStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || action.error.message || 'Erreur lors de la mise a jour du statut';
      })
      // Delete Lieu
      .addCase(deleteLieu.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteLieu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lieux = state.lieux.filter((lieu) => lieu.id !== action.payload);
      })
      .addCase(deleteLieu.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || action.error.message || 'Erreur lors de la suppression';
      });
  },
});

export const { clearCurrentLieu, setSearchQuery, setStatusFilter, setCategoryFilter } = lieuxSlice.actions;
export { fetchLieux } from './lieuxActions';
export default lieuxSlice.reducer;
