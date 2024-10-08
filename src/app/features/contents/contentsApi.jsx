import axios from '~/common/axios';
import {
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
} from './contentsSlice';

export const getContents = async (page = 1, dispatch, axiosAuth) => {
  dispatch(getDataStart());
  try {
    let res;
    if (!axiosAuth) res = await axios.get(`show/all/?page=${page}`);
    else res = await axiosAuth.get(`show/all/?page=${page}`);
    // console.log(res.data);
    dispatch(getDataSuccess(res.data));
  } catch (error) {
    dispatch(getDataFail(error));
  }
};

export const getMoreContents = async (page = 2, dispatch, axiosAuth) => {
  dispatch(getMoreDataStart());
  try {
    let res;
    if (!axiosAuth) res = await axios.get(`show/all/?page=${page}`);
    else res = await axiosAuth.get(`show/all/?page=${page}`);
    // console.log(res.data);
    dispatch(getMoreDataSuccess(res.data));
  } catch (error) {
    dispatch(getMoreDataFail(error));
  }
};

export const createContent = async (data, dispatch, axiosAuth) => {
  dispatch(createStart());
  try {
    const res = await axiosAuth.put('crud/create', data);
    dispatch(createSuccess(res.data));
  } catch (error) {
    dispatch(createFail(error));
  }
};

export const uploadContent = async (formData, dispatch, axiosAuth) => {
  dispatch(uploadStart());
  try {
    const res = await axiosAuth.put('crud/upload', formData);
    dispatch(uploadSuccess(res.data));
  } catch (error) {
    dispatch(uploadFail(error));
  }
};

export const updateContent = async (data, dispatch, axiosAuth) => {
  dispatch(updateStart());
  try {
    const res = await axiosAuth.patch('crud/edit', data);
    dispatch(updateSuccess(res.data));
  } catch (error) {
    dispatch(updateFail(error));
  }
};

export const deleteContent = async (id, dispatch, axiosAuth) => {
  dispatch(deleteStart());
  try {
    const res = await axiosAuth.delete(`crud/delete/${id}`);
    dispatch(deleteSuccess(res.data));
  } catch (error) {
    dispatch(deleteFail(error));
  }
};

export const multiDeleteContents = async (ids = [], dispatch, axiosAuth) => {
  dispatch(multiDeleteStart());
  try {
    const res = await axiosAuth.delete('crud/delete', ids);
    dispatch(multiDeleteSuccess(res.data));
  } catch (error) {
    dispatch(multiDeleteFail(error));
  }
};
