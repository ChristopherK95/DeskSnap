import { createSlice } from '@reduxjs/toolkit';

export const notifSlice = createSlice({
  name: 'notif',
  initialState: {
    showNotif: false,
    message: '',
    time: 0,
    danger: false,
  },
  reducers: {
    setNotif: (
      state: {
        showNotif: boolean;
        message: string;
        time: number;
        danger?: boolean;
      },
      action: {
        payload: { message: string; time?: number; danger?: boolean };
      },
    ) => {
      return {
        ...action.payload,
        showNotif: true,
        time: action.payload.time ?? 5,
        danger: Boolean(action.payload.danger),
      };
    },
  },
});

export const { setNotif } = notifSlice.actions;

export default notifSlice.reducer;
