import { createSlice } from '@reduxjs/toolkit';

export const notifSlice = createSlice({
  name: 'notif',
  initialState: {
    showNotif: false,
    message: '',
    time: 0,
    error: false,
  },
  reducers: {
    setNotif: (
      state: {
        showNotif: boolean;
        message: string;
        time: number;
        error?: boolean;
      },
      action: {
        payload: { message: string; time?: number; error?: boolean };
      },
    ) => {
      return {
        ...action.payload,
        showNotif: true,
        time: action.payload.time ?? 5,
        error: Boolean(action.payload.error),
      };
    },
    removeNotif: (state: {
      showNotif: boolean;
      message: string;
      time: number;
      error?: boolean;
    }) => ({
      message: '',
      showNotif: false,
      time: state.time,
      error: false,
    }),
  },
});

export const { setNotif, removeNotif } = notifSlice.actions;

export default notifSlice.reducer;
