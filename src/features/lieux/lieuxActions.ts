import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

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