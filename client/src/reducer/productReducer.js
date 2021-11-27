import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
} from "../constants/productConstant";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    // calling PRODUCT_LIST_REQUEST and setting loading to true because we are requesting for the products
    // then we are setting our products to an empty array because we are just making a request
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    // calling PRODUCT_LIST_SUCCESS and setting loading to false because we have sucessfully gotten our products
    // then we are setting our products gotten back from the ProductAction but attaching them
    // because of the response we are getting back from the productController
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };

    // calling PRODUCT_LIST_FAIL and setting loading to false because something went wrong and we did not get our products
    // then we are setting our products to the payload{error} gotten back from the ProductAction
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// for a single product
export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    // calling PRODUCT_LIST_REQUEST and setting loading to true because we are requesting for the products
    // then we are setting our products to an empty array because we are just making a request
    case GET_PRODUCT_REQUEST:
      return { ...state, loading: true };
    // calling GET_PRODUCT_SUCCESS and setting loading to false because we have sucessfully gotten our products
    // then we are setting our products to the payload{data} gotten back from the ProductAction
    case GET_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload };

    // calling GET_PRODUCT_FAIL and setting loading to false because something went wrong and we did not get our products
    // then we are setting our products to the payload{error} gotten back from the ProductAction
    case GET_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
