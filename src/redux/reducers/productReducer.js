const productReducer = (state = initialState, action) => {
  console.log('Reducer action:', action);
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_PRODUCTS_SUCCESS:
      console.log('Products fetched successfully:', action.payload.products);
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        totalPages: action.payload.totalPages,
        error: ''
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        products: [],
        error: action.payload
      };
    default:
      return state;
  }
};
