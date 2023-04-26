import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import styled from 'styled-components'
import Header from '../Header'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';

function Subscribers() {
    const [Subscribers,setSubscribers]=useState([]);
    const [id,setId]=useState(null);
    const auth_admin = window.localStorage.getItem("auth_admin");

     useEffect(() => {
          fethcSubscribers()
     },[]);

     const fethcSubscribers = () => {
        axios.get("http://127.0.0.1:8000/api/Subscribers/").then(res => {
            console.log(res.data);
            setSubscribers(res.data);
        }).catch(err => {
           console.log(err);
        })
      }
   const DeleteSubScribe = (e) => {
     e.preventDefault();
      axios.delete(`http://127.0.0.1:8000/api/Subscribers/${id}`).then(res => {
             console.log(res.data);
             window.location.reload(true)
      }).catch(err => {
         console.log(err);
     })

     console.log(id);
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
             <h2 className='text-center mb-3'>List Subscribers</h2>
             <div class="table-responsive">
            <table class="main-table text-center table table-bordered">
                 <tr>
                      <td>#</td>
                      <td>Name</td>
                      <td>Email</td>
                      <td>Creation date</td>
                      <td>Action</td>
                </tr>
                {Subscribers.map(item => (
                    <tr>
                         <td>{item.id}</td>
                         <td>{item.Name}</td>
                         <td>{item.Email}</td>
                         <td>{item.created_at.slice(0,10)}</td>
                         <td><a href="" data-bs-toggle="modal" onClick={() => setId(item.id)}  data-bs-target="#de"><DeleteIcon/></a></td>
                         <div class="modal fade" id="de"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel"> Delete Subscriber</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={DeleteSubScribe}>
                              <p>Are you sure to delete this Subscriber ?</p>
                             
                              <div class="modal-footer">
                                <input type="button"  class="btn btn-secondary" data-bs-dismiss="modal" value="Close" />
                                <input type="submit"  class="btn btn-primary" value="Confirm" />
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

export default Subscribers

const Content = styled.div`
   background-color:#e5e5e5;
   height:100vh;  
   padding:30px;
   .content{
     background-color:#fff;
     border-radius:7px;
  }
`