import { publicRequest, userRequest } from "../requestMethod";
import {
  addProductFailure,
  addProductStart,
  addProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  getProductFailure,
  getProductStart,
  getProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
} from "./productRedux";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/product");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProducts = async (dispatch,id) => {
  dispatch(deleteProductStart());
  try {
    // const res = await userRequest.delete(`/product/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProducts = async (dispatch,product,id) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/product/${id}`);
    dispatch(updateProductSuccess({id,product}));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

export const addProduct = async (product,dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/product`,product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};