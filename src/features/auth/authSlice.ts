import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './authActions';
import type { AuthState } from '../../types';


const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
     logout : (state) => {
        state.user = null ;
        state.token = null ;
        localStorage.clear() ;
     }
  },
  extraReducers: (builder) => {
    builder
         .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.token = action.payload.accessToken;
            localStorage.setItem('user', JSON.stringify(action.payload));
            localStorage.setItem('token', action.payload.accessToken);
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as string) || 'Erreur lors du connexion';
          });
  }
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;
