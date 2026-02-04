import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import type { Lieu, LieuxState } from '../../types';

export const fetchLieux = createAsyncThunk(
  'lieux/fetchLieux',
  async () => {
    const response = await api.get('/lieux');
    return response.data;
  }
);

const initialState: LieuxState = {
  lieux: [],
  currentLieu: null,
  isLoading: false,
  error: null,
};

const lieuxSlice = createSlice({
  name: 'lieux',
  initialState,
  reducers: {
    clearCurrentLieu: (state) => {
      state.currentLieu = null;
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
        state.error = action.error.message || 'Erreur lors du chargement';
      });
  },
});

export const { clearCurrentLieu } = lieuxSlice.actions;
export default lieuxSlice.reducer;