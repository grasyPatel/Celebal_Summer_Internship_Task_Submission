import { createSlice, createAsyncThunk, __DO_NOT_USE__ActionTypes } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchAllOrders=createAsyncThunk("orders/fetchAllOrders", async(_,{rejectWithValue})=>{
    try{
        const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("userToken")}`
            }
        });
        return response.data;
    }
    catch(error){
        return rejectWithValue(error.response.data);
    }
});


export const updateOrderStatus=createAsyncThunk("orders/updateOrderStatus", async({id, status},{rejectWithValue})=>{
    try{
        const response=await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,{status},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("userToken")}`
            }
        });
        return response.data;
    }
    catch(error){
        return rejectWithValue(error.response.data);
    }
});

export const deleteOrder=createAsyncThunk("orders/deleteOrder", async(id,{rejectWithValue})=>{
    try{
        const response=await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("userToken")}`
            }
        });
        return response.id;
    }
    catch(error){
        return rejectWithValue(error.response.data);
    }
});


const adminOrderSlice=createSlice({
    name:"adminOrders",
    initialState:{
        orders:[],
        totalOrders:0,
        totalSales:0,
        loading:false,
        error:null
    },
    reducers:{

    },
    extraReducers: (builder) => {
  builder
    .addCase(fetchAllOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchAllOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
      state.totalOrders = action.payload.length;
      state.totalSales = action.payload.reduce((total, order) => total + order.totalPrice, 0);
    })
    .addCase(fetchAllOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase(updateOrderStatus.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateOrderStatus.fulfilled, (state, action) => {
      state.loading = false;
      const updatedOrder = action.payload;
      const index = state.orders.findIndex((order) => order._id === updatedOrder._id);
      if (index !== -1) {
        state.orders[index] = updatedOrder;
      }
    })
    .addCase(updateOrderStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase(deleteOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = state.orders.filter((order) => order._id !== action.payload);
      state.totalOrders--;
    })
    .addCase(deleteOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
}
            
        
            
})

export default adminOrderSlice.reducer;




