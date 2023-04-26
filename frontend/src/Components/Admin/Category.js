import React,{useState,useEffect} from 'react'
import SideBar from './SideBar'
import styled from 'styled-components'
import Header from '../Header';
import {FetchCategoreis} from '../redux-toolkit/Category/CategorySlice'
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Category() {

  const Category = useSelector((state) => state.Category.Categories);

  const [id,setId]=useState(null);
  const [itemId,setItemID]=useState("");
  const [NameCat,setNameCat]=useState("");
  const [errors,setErrors]=useState([]);
  const [errorsEdit,setErrorsEdit]=useState([]);
  const auth_admin = window.localStorage.getItem("auth_admin");

  const dispatch = useDispatch();
  useEffect(() => {
   dispatch(FetchCategoreis());
 }, [dispatch]);

  const AddCategory = (e) => {
      e.preventDefault();
      const data = new FormData();
            data.append("NameCat",NameCat);
            axios.post("http://127.0.0.1:8000/api/Category",data).then(res=>{
            setErrors("");
            console.log(res.data);
            window.location.reload(true);
         }).catch(err => {
            setErrors(err.response.data);
         })
  }
  const fetchItem = (id) => {
    axios.get(`http://127.0.0.1:8000/api/Category/${id}`).then(res => {

    setNameCat(res.data.NameCat);


    }).catch(err => {
       console.log(err);
    })
    setItemID(id)
  }
  
  const updateCategory = (e) => {
    e.preventDefault();

    const data = new FormData();
          data.append("NameCat",NameCat);
          data.append('_method', 'PATCH');

          axios.post(`http://localhost:8000/api/Category/${itemId}`,data).then(res => {
          console.log(res.data);
          window.location.reload(true);
    
       }).catch(err => {
           setErrorsEdit(err.response.data.errors)
       });
  
  }

  const DeleteCategory = (e) => {
    e.preventDefault()
       axios.delete(`http://127.0.0.1:8000/api/Category/${id}`).then(res => {
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
    <h2 class="text-center mb-4">Manage Categories</h2>
    <div class="">
        <div class="table-responsive">
            <table class="main-table text-center table table-bordered">
                 <tr>
                      <td>#</td>
                      <td>Name</td>
                      <td>Creation date</td>
                      <td>Action</td>
                </tr>
            
              {Category.map(item =>(
                 <tr>
                     <td>{item.id}</td>
                     <td>{item.NameCat}</td>
                     <td>{item.created_at}</td>
                     <td>
                          <a href="" data-bs-toggle="modal" onClick={() => fetchItem(item.id)}   data-bs-target="#e"><EditIcon/></a>
                          <a href="" data-bs-toggle="modal" onClick={() => setId(item.id)}  data-bs-target="#de"><DeleteIcon/></a>
                     </td>
                     <div class="modal fade" id="de"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel"> Delete Category</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={DeleteCategory}>
                              <p>Are you sure to delete this Category ?</p>
                                {Category.filter(item => item.id==id).map(item => (
                                    <input className="mb-3" type="text" value={item.NameCat} disabled />
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
                       <h1 class="modal-title fs-5" id="exampleModalLabel"> Edit Category</h1>
                       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                     </div>
                     <div class="modal-body">
                     <form onSubmit={updateCategory}>
                          <input className="mb-3 form-control" type="text" onChange={(e) => setNameCat(e.target.value)}  value={NameCat}  placeholder="Name Of Category" />
                          <p className={`${errorsEdit.NameCat ? "alert alert-danger" : ""}`}>{errorsEdit.NameCat}</p>
                        
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
      Add Category
  </button>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
<div class="modal-content">
  <div class="modal-header">
    <h1 class="modal-title fs-5" id="exampleModalLabel">Add Category</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body">
     <form onSubmit={AddCategory}>
        <input className="mb-3" type="text" onChange={(e) => setNameCat(e.target.value)}  placeholder="Name Of Category" />
        <p className={`${errors.message ? "alert alert-danger" : ""}`}>{errors.message}</p>
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

export default Category

const Content = styled.div`
     background-color:#e5e5e5;
     height:100vh;  
     padding:30px;
     .content{
       background-color:#fff;
       border-radius:7px;
  
    }
`