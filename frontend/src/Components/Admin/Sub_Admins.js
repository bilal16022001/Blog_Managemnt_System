import React,{useEffect, useState} from 'react'
import SideBar from './SideBar'
import styled from 'styled-components'
import Header from '../Header'
import {useSelector,useDispatch} from 'react-redux'
import { FetchSubAdmins } from '../redux-toolkit/Admin/AdminSlice'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios'

function Sub_Admins() {

    const SubAdmins = useSelector((state) => state.SubAdmins.SubAdmins);
    const [Name,setName]=useState("");
    const [Email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [errors,setErrors]=useState([]);
    const [errorsEdit,setErrorsEdit]=useState([]);
    const [id,setId]=useState(null);
    const [itemId,setItemID]=useState("");
    const [oldPass,setOldPss]=useState("");
    const auth_admin = window.localStorage.getItem("auth_admin");
    const dispatch = useDispatch();
    useEffect(() => {
     dispatch(FetchSubAdmins());
   }, [dispatch]);

   const AddSubAdmin = (e) => {
    e.preventDefault()
      const data = new FormData();
            data.append("name",Name)
            data.append("email",Email)
            data.append("password",password)
            data.append("type",1)

            axios.post("http://127.0.0.1:8000/api/Admin",data).then(res=>{
              setErrors("");
              console.log(res.data);
              window.location.reload(true);
           }).catch(err => {
              setErrors(err.response.data.errors);
           })
   }
   const fetchItem = (id) => {
    axios.get(`http://127.0.0.1:8000/api/Admin/${id}`).then(res => {

    setName(res.data.name);
    setEmail(res.data.email)
    setPassword(res.data.password)
    setOldPss(res.data.password)

    }).catch(err => {
       console.log(err);
    })
    setItemID(id)
  }
const updateSubAdmin= (e)=> {
    e.preventDefault();

       const Data = new FormData();

       Data.append("name",Name);
       Data.append("email",Email);
       if(password==""){
        Data.append("password",oldPass)
    }else{
      Data.append("password",password)
    }
       Data.append("0",1)
       Data.append('_method', 'PATCH');
   


        axios.post(`http://localhost:8000/api/Admin/${itemId}`,Data).then(res => {
           console.log(res.data);
           window.location.reload(true);
     
        }).catch(err => {
            setErrorsEdit(err.response.data.errors)
             console.log(err.response);
        });
  }
   const DeleteState = (e) => {
    e.preventDefault()
       axios.delete(`http://127.0.0.1:8000/api/SubAdmins/${id}`).then(res => {
              window.location.reload(true);
      });
  }
  if(auth_admin!=null){
  return (
    <div className='d-flex'>
        <SideBar/>
        <div className='w-100'>
      <Header/>
        <Content className=''>
        <div className='content'>
          <div class="parent p-3">
        <h2 class="text-center mb-4">Manage Sub-Admins</h2>
        <div class="">
            <div class="table-responsive">
                <table class="main-table text-center table table-bordered">
                     <tr>
                          <td>#</td>
                          <td>Name</td>
                          <td>Email</td>
                          <td>Creation date</td>
                          <td>Action</td>
                    </tr>
                
                  {SubAdmins.filter(it => it.type !=0).map(item =>(
                     <tr>
                         <td>{item.id}</td>
                         <td>{item.name}</td>
                         <td>{item.email}</td>
                         <td>{item.created_at}</td>
                         <td>
                              <a href="" data-bs-toggle="modal" onClick={() => fetchItem(item.id)}   data-bs-target="#e"><EditIcon/></a>
                              <a href="" data-bs-toggle="modal" onClick={() => setId(item.id)}  data-bs-target="#de"><DeleteIcon/></a>
                         </td>
                         <div class="modal fade" id="de"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h1 class="modal-title fs-5" id="exampleModalLabel"> Delete Sub Admins</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={DeleteState}>
                                  <p>Are you sure to delete this City ?</p>
                                    {SubAdmins.filter(item => item.id==id).map(item => (
                                        <input className="mb-3" type="text" value={item.Name} disabled />
                                    ))}
                                  <div class="modal-footer">
                                    <input type="button"  class="btn btn-secondary" data-bs-dismiss="modal" value="Close" />
                                    <input type="submit"  class="btn btn-primary" value="Confirm" />
                                  </div>
                                </form>
                            </div>
                          
                          </div>
                            </div>
                        </div>
                              <div class="modal fade" id="e"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                     <div class="modal-dialog">
                       <div class="modal-content">
                         <div class="modal-header">
                           <h1 class="modal-title fs-5" id="exampleModalLabel"> Edit Sub Admin</h1>
                           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                         </div>
                         <div class="modal-body">
                         <form onSubmit={updateSubAdmin}>
                              <input className="mb-3 form-control" type="text" onChange={(e) => setName(e.target.value)}  value={Name}  placeholder="Name Sub-Admin" />
                              <p className={`${errorsEdit.name ? "alert alert-danger" : ""}`}>{errorsEdit.name}</p>
                              <input className="mb-3 form-control" type="email" onChange={(e) => setEmail(e.target.value)}  placeholder="Email" value={Email} />
                              <p className={`${errorsEdit.email ? "alert alert-danger" : ""}`}>{errorsEdit.email}</p>
                              <input className="mb-3" type="password" onChange={(e) => setPassword(e.target.value)}  placeholder="password" />
                              <div class="modal-footer">
                                <input  type="button"  class="btn btn-secondary" data-bs-dismiss="modal" value="Close" />
                                <input  type="submit"  class="btn btn-primary" value="Save changes" />
                              </div>
                           </form>
                      </div>
                      
                       </div>
                     </div>
                   </div>
                     </tr>
                  ))}
          
              </table>
   	     </div>
      </div>
   

      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Add Sub-Admin
      </button>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Add Sub Admins</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
         <form onSubmit={AddSubAdmin}>
            <input className="mb-3" type="text" onChange={(e) => setName(e.target.value)}  placeholder="Name Sub-Admin" />
            <p className={`${errors.name ? "alert alert-danger" : ""}`}>{errors.name}</p>
            <input className="mb-3" type="text" onChange={(e) => setEmail(e.target.value)}  placeholder="Email" />
            <p className={`${errors.email ? "alert alert-danger" : ""}`}>{errors.email}</p>
            <input className="mb-3" type="password" onChange={(e) => setPassword(e.target.value)}  placeholder="password" />
            <p className={`${errors.password ? "alert alert-danger" : ""}`}>{errors.password}</p>
            <div class="modal-footer">
              <input  type="button"  class="btn btn-secondary" data-bs-dismiss="modal" value="Close" />
              <input  type="submit"  class="btn btn-primary" value="Save changes" />
            </div>
         </form>
      </div>
   
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

export default Sub_Admins

const Content = styled.div`
     background-color:#e5e5e5;
     height:100vh;  
     padding:30px;
     .content{
       background-color:#fff;
       border-radius:7px;
  
    }
`