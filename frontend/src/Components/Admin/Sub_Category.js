import React,{useEffect,useState} from 'react'
import SideBar from './SideBar'
import styled from 'styled-components'
import Header from '../Header'
import {FetchCategoreis,FetchSubCategory} from '../redux-toolkit/Category/CategorySlice'
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Sub_Category() {

  const [NameSubCat,setNameSubCat]=useState("");
  const [Slct_Cat,setSlctCat]=useState("");
  const [Errors,setErrors]= useState([]);
  const [itemId,setItemID]=useState("");
  const [id,setId]=useState(null);
  const [errorsEdit,seterrorsEdit]=useState([]);

  const Categories = useSelector((state) => state.Category.Categories);
  const SubCategory =useSelector((state) => state.Category.SubCategory);
  const auth_admin = window.localStorage.getItem("auth_admin");

  const dispatch = useDispatch();
  useEffect(() => {
   dispatch(FetchCategoreis());
   dispatch(FetchSubCategory())
 }, [dispatch]);

  const handlSelect = (event) => {
    setSlctCat(event.target.value);
  }

  const AddSubCategory = (e) => {
     e.preventDefault();

     const Data = new FormData();

          Data.append("Name_subCat",NameSubCat);
          Data.append("Cat_id",Slct_Cat);

           axios.post("http://127.0.0.1:8000/api/Sub_Category",Data).then(res=>{
           setErrors("");
           console.log(res.data);
           window.location.reload(true);
        }).catch(err => {
           setErrors(err.response.data.errors);
        })
  }
  const fetchItem = (id) => {
    axios.get(`http://127.0.0.1:8000/api/Sub_Category/${id}`).then(res => {

    setNameSubCat(res.data.Name_subCat);
    setSlctCat(res.data.Cat_id)


    }).catch(err => {
       console.log(err);
    })
    setItemID(id)
  }

  const updateSubCat = (e) => {
    e.preventDefault()
  
    const Data = new FormData();

    Data.append("Name_subCat",NameSubCat);
    Data.append("Cat_id",Slct_Cat);
    Data.append('_method', 'PATCH');

    axios.post(`http://127.0.0.1:8000/api/Sub_Category/${itemId}`,Data).then(res=>{
     seterrorsEdit("");
    console.log(res.data);
    window.location.reload(true);
 }).catch(err => {
    seterrorsEdit(err.response.data.errors);
    console.log(err);
 })


  }

  
  const DeleteSubCat = (e) => {
    e.preventDefault()
    axios.delete(`http://127.0.0.1:8000/api/Sub_Category/${id}`).then(res => {
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
    <h2 class="text-center mb-4">Manage Sub Category</h2>
    <div class="">
        <div class="table-responsive">
            <table class="main-table text-center table table-bordered">
                 <tr>
                      <td>#</td>
                      <td>Category</td>
                      <td>Sub Category</td>
                      <td>Creation date</td>
                      <td>Action</td>
                </tr>
            
              {SubCategory.map(item =>(
                 <tr>
                     <td>{item.id}</td>
                     <td>{item.category.NameCat}</td>
                     <td>{item.Name_subCat}</td>
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
                            <form onSubmit={DeleteSubCat}>
                              <p>Are you sure to delete this Sub Category ?</p>
                                {SubCategory.filter(item => item.id==id).map(item => (
                                    <input className="mb-3" type="text" value={item.Name_subCat} disabled />
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
                       <h1 class="modal-title fs-5" id="exampleModalLabel"> Edit Sub Category</h1>
                       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                     </div>
                     <div class="modal-body">
                     <form onSubmit={updateSubCat}>
                      <select onChange={handlSelect} className="form-control">
                                <option>...</option>
                                {Categories.map(cat => (
                                  <option value={cat.id} selected={Slct_Cat==cat.id? "selected" : ""}>{cat.NameCat}</option>        
                                ))}
                      </select>
                      <br/>
                          <p className={`${Errors.Cat_id ? "alert alert-danger" : ""}`}>{Errors.Cat_id}</p>
                          <input className="mb-3" type="text" onChange={(e) => setNameSubCat(e.target.value)} value={NameSubCat}  placeholder="Name Of Sub Category" />
                          <p className={`${Errors.Name_subCat ? "alert alert-danger" : ""}`}>{Errors.Name_subCat}</p>
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
      Add Sub Category
  </button>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
<div class="modal-content">
  <div class="modal-header">
    <h1 class="modal-title fs-5" id="exampleModalLabel">Add Sub Category</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body">
     <form onSubmit={AddSubCategory}>
     <select onChange={handlSelect} className="form-control mb-2">
               <option>...</option>
              {Categories.map(cat => (
                <option value={cat.id}>{cat.NameCat}</option>        
              ))}
        </select><br/>
        <p className={`${Errors.Cat_id ? "alert alert-danger" : ""}`}>{Errors.Cat_id}</p>
        <input className="mb-3" type="text" onChange={(e) => setNameSubCat(e.target.value)}  placeholder="Name Of Sub Category" />
        <p className={`${Errors.Name_subCat ? "alert alert-danger" : ""}`}>{Errors.Name_subCat}</p>
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

export default Sub_Category

const Content = styled.div`
     background-color:#e5e5e5;
     height:100vh;  
     padding:30px;
     .content{
       background-color:#fff;
       border-radius:7px;
  
    }
`