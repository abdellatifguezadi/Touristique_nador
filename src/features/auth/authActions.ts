import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

interface LoginCredentials {
  username: string; 
  password: string;
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials : LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await api.post('https://dummyjson.com/auth/login', credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue('Erreur lors de la connexion');
    }   
    }
);

