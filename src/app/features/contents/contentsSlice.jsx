import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  message: '',
  data: [],
  currentPage: 1,
  totalPages: 1,
};

const contentsSlice = createSlice({
  name: 'contents',
  initialState,
  reducers: {
    getDataStart: (state) => {
      state.status = 'loading';
    },
    getDataFail: (state, action) => {
      state.status = 'failed';
      state.message = action.payload.message;
    },
    getDataSuccess: (state, action) => {
      state.status = 'succeeded';
      state.message = action.payload.message;
      state.data = action.payload.contents;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    getMoreDataStart: (state) => {
      state.status = 'loading';
    },
    getMoreDataFail: (state, action) => {
      state.status = 'failed';
      state.message = action.payload.message;
    },
    getMoreDataSuccess: (state, action) => {
      state.status = 'succeeded';
      state.message = action.payload.message;
      state.data.push(action.payload.contents);
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    createStart: (state) => {
      state.status = 'loading';
    },
    createFail: (state, action) => {
      state.status = 'failed';
      state.message = action.payload.message;
    },
    createSuccess: (state, action) => {
      state.status = 'succeeded';
      state.message = action.payload.message;
    },
    uploadStart: (state) => {
      state.status = 'loading';
    },
    uploadFail: (state, action) => {
      state.status = 'failed';
      state.message = action.payload.message;
    },
    uploadSuccess: (state, action) => {
      state.status = 'succeeded';
      state.message = action.payload.message;
    },
    updateStart: (state) => {
      state.status = 'loading';
    },
    updateFail: (state, action) => {
      state.status = 'failed';
      state.message = action.payload.message;
    },
    updateSuccess: (state, action) => {
      state.status = 'succeeded';
      state.message = action.payload.message;
    },
    deleteStart: (state) => {
      state.status = 'loading';
    },
    deleteFail: (state, action) => {
      state.status = 'failed';
      state.message = action.payload.message;
    },
    deleteSuccess: (state, action) => {
      state.status = 'succeeded';
      state.message = action.payload.message;
    },
    multiDeleteStart: (state) => {
      state.status = 'loading';
    },
    multiDeleteFail: (state, action) => {
      state.status = 'failed';
      state.currentPage = action.payload.currentPage;
    },
    multiDeleteSuccess: (state, action) => {
      state.status = 'succeeded';
      state.message = action.payload.message;
    },
  },
});

export const {
  getDataStart,
  getDataFail,
  getDataSuccess,
  getMoreDataStart,
  getMoreDataFail,
  getMoreDataSuccess,
  createStart,
  createFail,
  createSuccess,
  uploadStart,
  uploadFail,
  uploadSuccess,
  updateStart,
  updateFail,
  updateSuccess,
  deleteStart,
  deleteFail,
  deleteSuccess,
  multiDeleteStart,
  multiDeleteFail,
  multiDeleteSuccess,
} = contentsSlice.actions;

export default contentsSlice.reducer;

export const selectAllContents = (state) => state.contents;
