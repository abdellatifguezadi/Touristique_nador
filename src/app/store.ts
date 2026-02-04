import { configureStore } from '@reduxjs/toolkit';
import lieuxReducer from '../features/lieux/lieuxSlice';


export const store = configureStore({
  reducer: {
        lieux: lieuxReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
