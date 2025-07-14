import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchUsers=createAsyncThunk("users/fetchUsers",async()=>{
    try{
        const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("userToken")}`
                }
            }
        );
        return response.data;
    }
    catch(error){
        return error.response.data;
    }       
});   


export const addUsers=createAsyncThunk("users/addUsers",async(userData,{rejectWithValue})=>{
    try{
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,userData,{
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

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, name, email, role}, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
       {name, email, role},
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("userToken")}`
          }
        }
      );
       return response.data;
    }
    catch(error){
        return rejectWithValue(error.response.data);
    }   
});




export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Delete failed");
    }
  }
);

const adminSlice=createSlice({
    name:"admin",
    initialState:{
        users:[],
        loading:false,
        error:null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUsers.pending,(state)=>{
            state.loading=true;
            state.error=null;
            })
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            state.loading=false;
            state.users=action.payload;
            })
        .addCase(fetchUsers.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(addUsers.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
         .addCase(addUsers.fulfilled,(state,action)=>{
            state.loading=false;
            state.users=action.payload;
            })
        .addCase(addUsers.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(updateUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
         .addCase(updateUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.users=action.payload;
            })
        .addCase(updateUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(deleteUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
         .addCase(deleteUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.users=action.payload;
            })
        .addCase(deleteUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });

    }
}
);    

export default adminSlice.reducer;
       


