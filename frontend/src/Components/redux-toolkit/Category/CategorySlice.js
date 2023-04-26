import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {

   Categories:[],
   SubCategory:[]
}

export const FetchCategoreis = createAsyncThunk("category/fetch",() => {
    return axios.get("http://127.0.0.1:8000/api/Category").then((res) => res.data)
})

export const FetchSubCategory = createAsyncThunk("Sub_category/fetch",() => {
    return axios.get("http://127.0.0.1:8000/api/Sub_Category/").then((res) => res.data)
})

const CategorySlice = createSlice({
    name:"Categroy",
    initialState,
    extraReducers:(builder) => {
       builder.addCase(FetchCategoreis.fulfilled,(state,action) => {
           state.Categories=action.payload
        })
        builder.addCase(FetchSubCategory.fulfilled,(state,action) => {
            state.SubCategory=action.payload
         })
   }
 })
 
 export default CategorySlice.reducer
