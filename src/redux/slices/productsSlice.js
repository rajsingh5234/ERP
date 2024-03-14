import { createSlice } from "@reduxjs/toolkit";
import ProductsData from "../../constants/ProductsData";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
   products: ProductsData || null,
   productsModalVisibility: false,
   productModalChild: "",
   selectedProduct: null,
}

const productsSlice = createSlice({
   name: 'productsSlice',
   initialState,
   reducers: {
      addProduct: (state, action) => {
         const newProduct = action.payload;
         newProduct.id = uuidv4();

         let updatedProducts = [newProduct, ...state.products];
         state.products = updatedProducts;
      },
      editProduct: (state, action) => {
         const updatedProduct = action.payload;
         let oldProduct = state.products.find((product) => product.id === state.selectedProduct.id);
         for (let key in updatedProduct) {
            oldProduct[key] = updatedProduct[key];
         }
      },
      deleteProduct: (state, action) => {
         const productId = action.payload;
         let updatedProducts = [...state.products];
         updatedProducts = updatedProducts.filter((product) => product.id !== productId)
         state.products = updatedProducts;
      },
      setProductsModalVisibility: (state, action) => {
         state.productsModalVisibility = action.payload;
      },
      setProductModalChild: (state, action) => {
         state.productModalChild = action.payload;
      },
      setSelectedProduct: (state, action) => {
         state.selectedProduct = action.payload;
      }
   }
})

export default productsSlice.reducer;

export const {
   addProduct,
   editProduct,
   deleteProduct,
   setProductsModalVisibility,
   setProductModalChild,
   setSelectedProduct,
} = productsSlice.actions;