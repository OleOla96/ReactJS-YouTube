import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const likeDislikeSlice = createSlice({
  name: 'likeDislike',
  initialState,
  reducers: {
    like: (state) => {
      state.value += 1;
    },
    dislike: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { like, dislike, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
