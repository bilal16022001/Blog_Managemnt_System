import React, { useEffect,useState } from 'react'
import SideBar from './SideBar'
import styled from 'styled-components'
import Header from '../Header'
import {Link} from  'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import {FetchCategoreis,FetchSubCategory} from '../redux-toolkit/Category/CategorySlice'
import {FetchBlogs,FetchSubAdmins,FetchCommentsAp,FetchSubscribers} from '../redux-toolkit/Data/dataSlice'

function Dashboard() {

  const categories = useSelector((state) => state.Category.Categories);
  const SubCategory = useSelector((state) => state.Category.SubCategory);
  const Blogs = useSelector((state) => state.data.Blogs);
  const SubAdmins = useSelector((state) => state.data.SubAdmins);
  const CommnetsApprove = useSelector((state) => state.data.CommnetsApprove);
  const Subscribers = useSelector((state) => state.data.Subscribers);
  const auth_admin = window.localStorage.getItem("auth_admin");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchCategoreis());
    dispatch(FetchSubCategory());
    dispatch(FetchBlogs());
    dispatch(FetchSubAdmins());
    dispatch(FetchCommentsAp());
    dispatch(FetchSubscribers());
  },[]);
  if(auth_admin!=null){
  return (
    <div className='d-flex'>
    <SideBar/>
      <div className='w-100'>
        <Header/>
        <Content className=''>
        <div className='content'>
            <div class="parent p-3">
            <div class="admin">
         <div class="">
           <div class="con">
           <i class="fas fa-user"></i>
           </div>
           <div class="">
             <h4>CATEGORIES</h4>
             <h3>{categories.length}</h3>
           </div>
           <div class="view">
           <Link to="/Category">View All</Link>
           </div>
        </div>

        <div class="">
        <div class="con">
        <i class="fas fa-building"></i>
           </div>
           <div class="">
             <h4>SUB CATEGORIES</h4>
             <h3>{SubCategory.length}</h3>
           </div>
           <div class="view">
           <Link to="/Sub-Category">View All</Link>
           </div>
        </div>

        <div class="">
        <div class="con">
        <i class="fas fa-folder"></i>
           </div>
           <div class="">
             <h4>BLOGS</h4>
             <h3>{Blogs.length}</h3>
           </div>
           <div class="view">
           <Link to="/Posts">View All</Link>
           </div>
        </div>

        <div class="">
        <div class="con">
        <i class="fas fa-times"></i>
           </div>
           <div class="">
             <h4>SUB-ADMINS</h4>
             <h3>{SubAdmins.length}</h3>
           </div>
           <div class="view">
              <Link to="/Sub-Admins">View All</Link>
           </div>
        </div>

        <div class="">
        <div class="con">
          <i class="fas fa-check"></i>
        </div>
           <div class="">
             <h4>APPROVED COMMENTS</h4> 
             <h3>{CommnetsApprove.filter(item => item.Approve == 1).length}</h3>         
           </div>
           <div class="view">
           {/* <Link to="/Comments">View All</Link> */}
           </div>
        </div>
        <div class="">
        <div class="con">
          <i class="fas fa-check"></i>
        </div>
           <div class="">
             <h4>UN-APPROVED COMMENTS</h4>
             <h3>{CommnetsApprove.filter(item => item.Approve == 0).length}</h3> 
           </div>
           <div class="view">
           {/* <Link to="/Comments">View All</Link> */}
           </div>
        </div>
        <div class="">
        <div class="con">
          <i class="fas fa-check"></i>
        </div>
           <div class="">
             <h4>ALL COMMENTS</h4>
             <h3>{CommnetsApprove.length}</h3> 
           </div>
           <div class="view">
           <Link to="/Comments">View All</Link>
           </div>
        </div>
        <div class="">
        <div class="con">
          <i class="fas fa-check"></i>
        </div>
           <div class="">
             <h4>TOTAL SUBSCRIBERS</h4>
             <h3>{Subscribers.length}</h3> 
           </div>
           <div class="view">
             <Link to="/Subscribers">View All</Link>
           </div>
        </div>
          </div>
          </div>
      </div>

      </Content>
      </div>
    </div>
  )
}
else{
       window.location.href="/Admin/sub-Admin"
  }
}

export default Dashboard

const Content = styled.div`
   background-color:#e5e5e5;
   height:100vh;  
   padding:30px;
   .content{
     background-color:#fff;
     border-radius:7px;
  }
`