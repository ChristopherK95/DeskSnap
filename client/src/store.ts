import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import notifReducer from './slice/notifSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    notif: notifReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
