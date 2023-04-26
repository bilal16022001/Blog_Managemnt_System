import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import styled from 'styled-components'
import Header from '../Header'
import axios from 'axios'

function Comments() {
    const [Comments,setComments]=useState([]);
    const [CommentId,setCommentId]=useState("");
    const auth_admin = window.localStorage.getItem("auth_admin");

  useEffect(() => {
    fetchComments()
  },[])

  const fetchComments = () =>{
      axios.get("http://127.0.0.1:8000/api/Comments").then(res => {
       console.log(res.data);
       setComments(res.data)
     }).catch(err => {
       console.log(err);
     })
  }
const ApprovePost = (e) => {
  e.preventDefault();
   console.log("id",CommentId);
 
   axios.put(`http://127.0.0.1:8000/api/Comments/${CommentId}`).then(res => {
   console.log(res.data);
   window.location.reload(true)
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
      <div class="parent p-3">
    <h2 class="text-center mb-4">Manage Comments</h2>
    <div class="">
        <div class="table-responsive">
            <table class="main-table text-center table table-bordered">
                 <tr>
                      <td>#</td>
                      <td>Title</td>
                      <td>Post</td>
                      <td>Name</td>
                      <td>Email</td>
                      <td>Comment</td>
                      <td>Creation date</td>
                      <td>Action</td>
                </tr>
            
              {Comments.map(item =>(
                 <tr>
                     <td>{item.id}</td>
                     <td>{item.post.Title}</td>
                     <td>{item.post.Description}</td>
                     <td>{item.Name}</td>
                     <td>{item.Email}</td>
                     <td>{item.Comment}</td>
                     <td>{item.created_at}</td>
                     <td>
                          <a href="" data-bs-toggle="modal" onClick={(e) => setCommentId(item.id)}    data-bs-target="#exampleModal">{item.Approve == 1 ? "Approved" : "UnApproved"}</a>
                     </td>
                     <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Do you Want to Approve this Comments ?</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <form onSubmit={ApprovePost}>
                    
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

export default Comments

const Content = styled.div`
     background-color:#e5e5e5;
     height:100vh;  
     padding:30px;
     .content{
       background-color:#fff;
       border-radius:7px;
       textarea{
         height:150px;
      }
  
    }
`