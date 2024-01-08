import { createSlice } from '@reduxjs/toolkit';

const authSilce = createSlice({
  name: 'auth',
  initialState: {
    username: null,
    email: null,
    accessToken: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { username, email, accessToken, avatar } = action.payload;
      state.accessToken = accessToken;
      if (username) {
        state.username = username;
      }
      if (email) {
        localStorage.setItem('email', email);
        state.email = email;
      }
      if (avatar) localStorage.setItem('avatar', avatar);
    },
    logOut: (state) => {
      state.accessToken = null;
      state.username = null;
      state.email = null;
    },
  },
});

export const { setCredentials, logOut } = authSilce.actions;
export const selectAuth = (state) => state.auth;
export default authSilce.reducer;
