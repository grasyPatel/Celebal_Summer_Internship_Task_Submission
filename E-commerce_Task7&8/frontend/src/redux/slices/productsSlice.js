
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductsByFilters=createAsyncThunk("products/fetchByFilters",async({
    collection,
    size,
    color,
    gender,
    minPrice,
    maxPrice,
    sortBy,
    search,
    category,
    material,
    brand,
    limit
})=>{
    const query=new URLSearchParams()
        if (collection) query.append("collections",collection);
        if (category) query.append("category",category);
        if (material) query.append("material",material);
        if (brand) query.append("brand",brand);
        if (gender) query.append("gender",gender);
        if (size) query.append("size",size);
        if (color) query.append("color",color);
        if (minPrice) query.append("minPrice",minPrice);
        if (maxPrice) query.append("maxPrice",maxPrice);
        if (sortBy) query.append("sortBy",sortBy);
        if (search) query.append("search",search);
        if (limit) query.append("limit",limit);

        const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`);
        return response.data;
});

// FIXED: Changed parameter from {id} to just id
export const fetchProductDetails=createAsyncThunk("products/fetchDetails",async(id)=>{
    const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`); 
    return response.data;
});

export const updateProduct=createAsyncThunk("products/updateProduct",async({id,productData})=>{
    const response=await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,productData,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("userToken")}`
        }
    });
    return response.data;
});

// FIXED: Changed parameter from {id} to just id
export const fetchSimilarProducts=createAsyncThunk("products/fetchSimilarProducts",async(id)=>{
    const response= await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`);
    return response.data;
});

const productsSlice = createSlice({
  name: "products",
  initialState:{
    products:[],
    selectedProduct:null, // FIXED: This matches your component usage
    similarProducts:[],
    loading:false,
    error:null,
    filters:{
        collection:"",
        size:"",
        color:"",
        gender:"",
        minPrice:"",
        maxPrice:"",
        sortBy:"",
        search:"",
        category:"",
        material:"",
        brand:"",
        limit:""
    }
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload};
    },
    clearFilters: (state) => {
        state.filters={
        collection:"",
        size:"",
        color:"",
        gender:"",
        minPrice:"",
        maxPrice:"",
        sortBy:"",
        search:"",
        category:"",
        material:"",
        brand:"",
        limit:""
        };
    },   
  },
  extraReducers: (builder) => {
    builder
      // Fetch by filters
      .addCase(fetchProductsByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchProductsByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FIXED: Product details - storing in selectedProduct
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload; // FIXED: Store single product, not array
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FIXED: Update product logic
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex((product)=>product._id===action.payload._id);
        if(index !== -1){
            state.products[index] = action.payload;
        }
        // Also update selectedProduct if it's the same product
        if(state.selectedProduct && state.selectedProduct._id === action.payload._id){
            state.selectedProduct = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Similar products
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = action.payload;
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, clearFilters } = productsSlice.actions;
export default productsSlice.reducer