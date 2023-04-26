import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    Blogs:[],
    SubAdmins:[],
    CommnetsApprove:[],
    Subscribers:[],
    width:270
 }

 export const FetchBlogs = createAsyncThunk("category/fetch",() => {
    return axios.get("http://127.0.0.1:8000/api/Posts").then((res) => res.data)
})

export const FetchSubAdmins = createAsyncThunk("subAdmins/fetch",() => {
    return axios.get("http://127.0.0.1:8000/api/SubAdmins").then((res) => res.data)
})
export const FetchCommentsAp = createAsyncThunk("Comments/fetch",() => {
    return axios.get("http://127.0.0.1:8000/api/Comments").then((res) => res.data)
})
export const FetchSubscribers = createAsyncThunk("Subscribers/fetch",() => {
    return axios.get("http://127.0.0.1:8000/api/Subscribers").then((res) => res.data)
})

const dataSlice = createSlice({
    name:"dataSlice",
    initialState,

    reducers:{
      incremnetWidth:(state,action)=> {
         state.width=action.payload;
      }
    },
    
    extraReducers:(builder) => {
       builder.addCase(FetchBlogs.fulfilled,(state,action) => {
           state.Blogs=action.payload
        })
        builder.addCase(FetchSubAdmins.fulfilled,(state,action) => {
            state.SubAdmins=action.payload
        })
        builder.addCase(FetchCommentsAp.fulfilled,(state,action) => {
            state.CommnetsApprove=action.payload
        })
        builder.addCase(FetchSubscribers.fulfilled,(state,action) => {
            state.Subscribers=action.payload
        })
   }
 })
 
 export const {incremnetWidth} = dataSlice.actions
 export default dataSlice.reducer
