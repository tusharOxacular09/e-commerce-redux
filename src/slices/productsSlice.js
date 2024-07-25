import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const DUMMY_IMAGE =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbgJt2j-Rlwh9iqhzxwql8xL1jSzPjV4QI3Q&s";
const PRODUCTS_URL =
  "https://my-json-server.typicode.com/tusharOxacular09/products-json/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(PRODUCTS_URL);
    return response.data;
  }
);

export const addProductsToServer = createAsyncThunk(
  "products/addProductsToServer",
  async (product, thunkAPI) => {
    const newProduct = await axios.post(PRODUCTS_URL, product);

    if (newProduct?.status === 201) {
      thunkAPI.dispatch(addProduct({ ...newProduct.data, image: DUMMY_IMAGE }));
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: null,
  },
  reducers: {
    addProduct: (state, action) => {
      state.items = [action.payload, ...state.items];
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      state.items[index] = action.payload;
    },
    deleteProduct: (state, action) => {
      console.log(action.payload);
      state.items = state.items.filter((item) => item.id != action.payload);
      console.log(state.items);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.status = "loading";
    }),
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      }),
      builder.addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { addProduct, updateProduct, deleteProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
