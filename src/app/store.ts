import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
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

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelector(selector);
