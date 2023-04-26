import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import styled from 'styled-components'
import Header from '../Header';
import axios from 'axios';

function Page_About() {
  const [Description,setDescription]=useState("");
  const auth_admin = window.localStorage.getItem("auth_admin");
  
  useEffect(() => {
    fetchDataPage();
  },[]);

  const fetchDataPage = () => {
    axios.get("http://127.0.0.1:8000/api/PageAbout/").then(res => {
     setDescription(res.data[0].Description);
     
  }).catch(err => {
       console.log(err);
  });
}

  const updatePageAbout = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("Description",Description);
    data.append("_method","PATCH");
    console.log(Description);
      axios.post(`http://127.0.0.1:8000/api/PageAbout/1`,data).then(res => {
        console.log(res.data);
        window.location.reload(true);
     }).catch(err => {
        console.log(err);
     })
   }
   if(auth_admin!=null){
  return (
    <div className='d-flex'>
    <SideBar/>
    <div className='w-100'>
       <Header/>
       <Content className=''>
          <div className='content'>
          <div class=" p-3">
            <h2 className='mb-2'>Edit Page About</h2>
             <form onSubmit={updatePageAbout}>
                <textarea className='form-control mb-2' value={Description} onChange={(e) => setDescription(e.target.value)} placeholder='Description'></textarea>

                <input type="submit" className='btn btn-primary' value="update" />
             </form>
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

export default Page_About

const Content = styled.div`
   background-color:#e5e5e5;
   height:100vh;  
   padding:30px;
   .content{
     background-color:#fff;
     border-radius:7px;
  }
`