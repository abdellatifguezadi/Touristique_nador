import { configureStore } from '@reduxjs/toolkit';
import lieuxReducer from '../features/lieux/lieuxSlice';
import authReducer from '../features/auth/authSlice';


export const store = configureStore({
  reducer: {
        lieux: lieuxReducer,
        auth : authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
