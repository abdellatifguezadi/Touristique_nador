import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';
import type { Lieu, LieuxState } from '../../types';
import { fetchLieux } from './lieuxActions';

export const addLieu = createAsyncThunk(
  'lieux/addLieu',
  async (lieu: Omit<Lieu, 'id'>) => {
    const response = await api.post('/lieux', lieu);
    return response.data;
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
        state.error = action.error.message || 'Erreur lors de l\'ajout';
      });
  },
});

export const { clearCurrentLieu, setSearchQuery, setStatusFilter, setCategoryFilter } = lieuxSlice.actions;
export { fetchLieux } from './lieuxActions';
export default lieuxSlice.reducer;