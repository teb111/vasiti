import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
} from "../constants/productConstant";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get(`/api/product`);

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }); // calls the PRODUCT_LIST_FAIL reducer
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_REQUEST }); // calls the GET_PRODUCT_REQUEST reducer

    const { data } = await axios.get(`/api/product/${id}`);

    dispatch({
      type: GET_PRODUCT_SUCCESS,
      payload: data,
    }); // calls the PRODUCT_LIST_SUCCESS reducer
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }); // calls the PRODUCT_LIST_FAIL reducer
  }
};
