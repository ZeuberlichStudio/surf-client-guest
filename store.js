import { configureStore } from '@reduxjs/toolkit';
import cartReducer from 'features/cart/slice';

export default configureStore({
   reducer: {
       cart: cartReducer
   }
});