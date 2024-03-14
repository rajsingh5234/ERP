import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/productsSlice'
import ordersReducer from './slices/ordersSlice'


export default configureStore({
   reducer: {
      productsReducer,
      ordersReducer,
   }
})