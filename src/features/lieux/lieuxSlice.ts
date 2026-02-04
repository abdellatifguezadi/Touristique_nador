import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';
import type { Lieu, LieuxState } from '../../types';

export const fetchLieux = createAsyncThunk(
  'lieux/fetchLieux',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/lieux');
      return response.data;
    } catch (error: any) {
      return rejectWithValue('Erreur lors du chargement1');
    }
  }
);

const initialState: LieuxState = {
  lieux: [],
  currentLieu: null,
  isLoading: false,
  error: null,
  searchQuery: '',
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

export const { clearCurrentLieu, setSearchQuery } = lieuxSlice.actions;
export default lieuxSlice.reducer;