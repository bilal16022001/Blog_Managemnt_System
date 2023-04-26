import {configureStore} from '@reduxjs/toolkit'
import  AdminSlice  from '../Admin/AdminSlice'
import CategorySlice from '../Category/CategorySlice'
import dataSlice from '../Data/dataSlice'

const store = configureStore({
  reducer:{
     SubAdmins:AdminSlice,
     Category:CategorySlice,
     data:dataSlice
  }
  
})

export default store