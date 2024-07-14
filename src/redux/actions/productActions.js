import axios from 'axios';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const fetchProductsRequest = () => {
  return {
    type: FETCH_PRODUCTS_REQUEST
  };
};

export const fetchProductsSuccess = (products, totalPages) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: { products, totalPages }
  };
};

export const fetchProductsFailure = (error) => {
  return {
    type: FETCH_PRODUCTS_FAILURE,
    payload: error
  };
};

export const fetchProducts = (page = 1, limit = 10) => {
  return async (dispatch) => {
    dispatch(fetchProductsRequest());
    try {
      const response = await axios.get(`/products.json`);
      const totalPages = Math.ceil(response.data.length / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const products = response.data.slice(startIndex, endIndex);
      dispatch(fetchProductsSuccess(products, totalPages));
    } catch (error) {
      dispatch(fetchProductsFailure(error.message));
    }
  };
};
