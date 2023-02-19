import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    username: '',
    isLoggedIn: false,
  },
  reducers: {
    setUser: (
      state: { id: string; username: string; isLoggedIn: boolean },
      action: {
        payload: { id: string; username: string; isLoggedIn: boolean };
      },
    ) => {
      return action.payload;
    },
    changeUsername: (
      state: { id: string; username: string; isLoggedIn: boolean },
      action: {
        payload: { username: string };
      },
    ) => {
      return { ...state, username: action.payload.username };
    },
  },
});

export const { setUser, changeUsername } = userSlice.actions;

export default userSlice.reducer;
