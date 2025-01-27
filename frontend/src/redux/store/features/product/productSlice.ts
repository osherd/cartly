import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";
import { store } from '../../store';


interface ProductState {
  product: Record<string, unknown> | null;
  products: Record<string, unknown>[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  totalStoreValue: number;
  outOfStock: number;
  category: string[];
}

const initialState: ProductState = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
};

// Create New Product
export const createProduct = createAsyncThunk(
  "products/create",
  async (formData, thunkAPI) => {
    try {
      return await productService.createProduct(formData);
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } }; message?: string; toString: () => string };
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all products
export const getProducts = createAsyncThunk(
  "products/getAll",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } }; message?: string; toString: () => string };
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete a Product
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: string, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } }; message?: string; toString: () => string };
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get a product
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id: string, thunkAPI) => {
    try {
      return await productService.getProduct(id);
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } }; message?: string; toString: () => string };
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, formData }: { id: string; formData: Record<string, unknown> }, thunkAPI) => {
    try {
      return await productService.updateProduct(id, formData);
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } }; message?: string; toString: () => string };
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      const products = action.payload;
      const array: number[] = [];
      products.map((item: { price: number; quantity: number }) => {
        const { price, quantity } = item;
        const productValue = price * quantity;
        return array.push(productValue);
      });
      const totalValue = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalStoreValue = totalValue;
    },
    CALC_OUTOFSTOCK(state, action) {
      const products = action.payload;
      const array: number[] = [];
      products.map((item: { quantity: number }) => {
        const { quantity } = item;

        return array.push(quantity);
      });
      let count = 0;
      array.forEach((number) => {
        if (number === 0) {
          count += 1;
        }
      });
      state.outOfStock = count;
    },
    CALC_CATEGORY(state, action) {
      const products = action.payload;
      const array: string[] = [];
      products.map((item: { category: string }) => {
        const { category } = item;

        return array.push(category);
      });
      const uniqueCategory = [...new Set(array)];
      state.category = uniqueCategory;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.products.push(action.payload as Record<string, unknown>);
        toast.success("Product added successfully");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Product deleted successfully");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Product updated successfully");
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        toast.error(action.payload as string);
      });
  },
});

export const { CALC_STORE_VALUE, CALC_OUTOFSTOCK, CALC_CATEGORY } =
  productSlice.actions;


export type RootState = ReturnType<typeof store.getState>;



export const selectIsLoading = (state: RootState) => state.product.isLoading;
export const selectProduct = (state: RootState) => state.product.product;
export const selectTotalStoreValue = (state: RootState) => state.product.totalStoreValue;
export const selectOutOfStock = (state: RootState) => state.product.outOfStock;
export const selectCategory = (state: RootState) => state.product.category;
export default productSlice.reducer;