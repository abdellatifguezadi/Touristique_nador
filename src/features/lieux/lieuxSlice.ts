import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { LieuxState } from '../../types';
import { fetchLieux } from './lieuxActions';




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
        state.error = (action.payload as string) || 'Erreur lors du chargement';
      });
  },
});

export const { clearCurrentLieu, setSearchQuery, setStatusFilter, setCategoryFilter } = lieuxSlice.actions;
export { fetchLieux } from './lieuxActions';
export default lieuxSlice.reducer;