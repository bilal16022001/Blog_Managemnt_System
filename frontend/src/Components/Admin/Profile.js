import React,{useState,useEffect} from 'react'
import Header from '../Header'
import SideBar from './SideBar'
import styled from 'styled-components'
import axios from 'axios'

function Profile() {
    const [Name,setName]=useState("");
    const [Email,setEmail]=useState("");
    const [password,setpassword]=useState("");
    const [oldPass,setOldPss]=useState("");
    const [id,setId]=useState("");
    let auth = window.localStorage.getItem("auth_admin");

    
  useEffect(() =>{ 
    AdminProfile();
   },[]);

    const AdminProfile = () => {
        axios.get("http://127.0.0.1:8000/api/Admin").then(res => {
            res.data.filter(fl => fl.email==auth).map(item => {
                  setId(item.id);
                  setName(item.name)
                  setEmail(item.email) 
                  setOldPss(item.password)
            })
        }).catch(err =>  {
            console.log(err);
        }) 
     }

     const UpdateProfile = (e) =>{
        e.preventDefault();
          const data = new FormData();
              data.append("name",Name);
              data.append("email",Email);
              window.localStorage.setItem("auth_admin",Email)
            if(password==""){
                data.append("password",oldPass)
          
             }else{
                data.append("password",password)
          
              }
            data.append("_method","PATCH");
    
            axios.post(`http://127.0.0.1:8000/api/Admin/${id}`,data).then(res => {
               console.log(res.data);
               window.location.reload(true)
            }).catch(err => {
               console.log(err);
            });
      }

      if(auth!=null){
  return (
    <div className='d-flex'>
    <SideBar/>
  <div className='w-100'>
     <Header/>
     <Content className=''>
    <div className='content'>
        <div class="parent p-3">
        <h2 className='mb-3'>Edit Profile</h2>
          <form onSubmit={UpdateProfile}>       
              <input className='form-control mb-3' type="text" onChange={(e) => setName(e.target.value)} value={Name} placeholder='Name' />
              <input className='form-control mb-3' type="Email" onChange={(e) => setEmail(e.target.value)} value={Email} placeholder='Email' />
              <input className='form-control mb-3' type="password" onChange={(e) => setpassword(e.target.value) } placeholder='password' />
              <input className='btn btn-primary' type="submit" value='update' />
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

export default Profile

const Content = styled.div`
   background-color:#e5e5e5;
   height:100vh;  
   padding:30px;
   .content{
     background-color:#fff;
     border-radius:7px;
  }
  
`