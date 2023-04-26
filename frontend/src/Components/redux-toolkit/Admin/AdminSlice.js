import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {

   SubAdmins:[]
}

export const FetchSubAdmins = createAsyncThunk("SubAdmin/fetch",() => {
     return axios.get("http://127.0.0.1:8000/api/Admin").then((res) => res.data)

})

const AdminSlice = createSlice({
   name:"SubAdmin",
   initialState,
   extraReducers:(builder) => {
      builder.addCase(FetchSubAdmins.fulfilled,(state,action) => {
          state.SubAdmins=action.payload
       })
  }
})

export default AdminSlice.reducer