import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_PRODUCTS(state, action) {
      const { products, search } = action.payload;
      const tempProducts = products.filter(
        (product: { name: string; category: string }) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredProducts = tempProducts;
    },
  },
});

export const { FILTER_PRODUCTS } = filterSlice.actions;

interface Product {
  name: string;
  category: string;
}

export const selectFilteredPoducts = (state: { filter: { filteredProducts: Product[] } }) => state.filter.filteredProducts;

export default filterSlice.reducer;