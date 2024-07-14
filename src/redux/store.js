import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/features/auth/authSlice';
import productReducer from '../redux/features/product/productSlice';
import cartReducer from '../redux/features/cart/cartSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    product:productReducer,
    cart:cartReducer,
  },
});

export default store;
