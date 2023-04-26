import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import styled from 'styled-components'
import Header from '../Header'
import {FetchCategoreis,FetchSubCategory} from '../redux-toolkit/Category/CategorySlice'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Posts() {
    const [Errors,setErrors]=useState([]);
    const [ErrorsEdit,setErrorsEdit]=useState([]);
    const dispatch = useDispatch();
    const Categories= useSelector((state) => state.Category.Categories);
    const SubCategory = useSelector((state) => state.Category.SubCategory);
    const [SlctCat,setCat]=useState("");
    const [SlctSubCat,setSubCat]=useState("");
    const [Description,setDescription]=useState("");
    const [image,setImage]=useState("");
    const [Posts,setPosts]=useState([]);
    const [id,setId]=useState(null);
    const [itemId,setItemID]=useState("");
    const [oldImg,setOldImg]=useState("");
    const [Title,setTitle]=useState("");
    const auth_admin = window.localStorage.getItem("auth_admin");
    
   useEffect(() => {
     dispatch(FetchCategoreis());
     dispatch(FetchSubCategory());
     fetchPosts();
   },[]);

   const fetchPosts = () => {
     axios.get("http://127.0.0.1:8000/api/Posts").then(res => {
       setPosts(res.data);
    }).catch(er =>{
        console.log(er);
    })
  }

   const HandleCat = (e) =>{
      setCat(e.target.value);
  }
  const HandleSubCat = (e) =>{
    setSubCat(e.target.value);
 } 
const handlImage = (e) => {

  setImage(e.target.files[0]);
}

const fetchItem = (id) => {
  axios.get(`http://127.0.0.1:8000/api/Posts/${id}`).then(res => {

  setDescription(res.data.Description);
  setCat(res.data.Cat_id);
  setSubCat(res.data.SubCat_id);
  setTitle(res.data.Title);
  setOldImg(res.data.Image);

  }).catch(err => {
     console.log(err);
  })
  setItemID(id)
}
  const AddPost = (e) => {
     e.preventDefault();
     const data = new FormData();
     data.append("Title",Title)
     data.append("Cat_id",SlctCat)
     data.append("SubCat_id",SlctSubCat)
     data.append("Description",Description)
     data.append("Image",image);

     axios.post("http://127.0.0.1:8000/api/Posts",data).then(res => {
        console.log(res.data);
        window.location.reload(true);
    }).catch(err => {
        console.log(err);
    })
  } 
  const updatePost = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("Title",Title)
    data.append("Cat_id",SlctCat)
    data.append("SubCat_id",SlctSubCat)
    data.append("Description",Description)
    data.append("Image",image);

   if(image==""){
    //  console.log("file empty",oldImg)
     data.append("Image",oldImg)
   } else{
      // console.log("not",image);
      data.append("Image",image)
   }
   data.append("_method","PATCH");

          axios.post(`http://localhost:8000/api/Posts/${itemId}`,data).then(res => {
          console.log(res.data);
          window.location.reload(true);
    
       }).catch(err => {
           setErrorsEdit(err.response.data.errors)
            // console.log(err.response.data.errors);
       });
  
  }
  const DeletePosts = (e) => {
      e.preventDefault()
         axios.delete(`http://127.0.0.1:8000/api/Posts/${id}`).then(res => {
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
    <h2 class="text-center mb-4">Manage Posts</h2>
    <div class="">
        <div class="table-responsive">
            <table class="main-table text-center table table-bordered">
                 <tr>
                      <td>#</td>
                      <td>Title</td>
                      <td>Post</td>
                      <td>Category</td>
                      <td>Sub Category</td>
                      <td>Creation date</td>
                      <td>Action</td>
                </tr>
            
              {Posts.map(item =>(
                 <tr>
                     <td>{item.id}</td>
                     <td>{item.Title}</td>
                     <td>{item.Description}</td>
                     <td>{item.category.NameCat}</td>
                     <td>{item.sub_category.Name_subCat}</td>
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
                            <form onSubmit={DeletePosts}>
                              <p>Are you sure to delete this Post ?</p>
                                {/* {SubCategory.filter(item => item.id==id).map(item => (
                                    <input className="mb-3" type="text" value={item.Name_subCat} disabled />
                                ))} */}
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
                       <h1 class="modal-title fs-5" id="exampleModalLabel"> Edit Post</h1>
                       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                     </div>
                     <div class="modal-body">
                          <form onSubmit={updatePost}>
                          <label>Title</label>
         <input onChange={(e) => setTitle(e.target.value)} type="text" value={Title}/>
                  <label>Choose Category</label>
                <select onChange={HandleCat} className="form-control ">
                          <option>...</option>
                          {Categories.map(cat => (
                            <option value={cat.id} selected={SlctCat==cat.id ? "selected" : ""}>{cat.NameCat}</option>        
                          ))}
                    </select><br/>
                    <label>Choose Sub Category</label>
                <select onChange={HandleSubCat} className="form-control">
                          <option selected>...</option>
                          {SubCategory.filter(it => it.Cat_id==SlctCat).map(cat => (
                        <option value={cat.id} selected={SlctSubCat==cat.id ? "selected" : ""}>{cat.Name_subCat}</option>        
                      ))}
        </select><br/>
        <label>Description</label>
        <textarea className='w-100' onChange={(e) => setDescription(e.target.value)} value={Description}></textarea>
        <label>Choose Image</label>
        <input type="file" onChange={handlImage}  />
        <img src={`http://127.0.0.1:8000/${oldImg}`} />
        {/* <p className={`${Errors.Cat_id ? "alert alert-danger" : ""}`}>{Errors.Cat_id}</p> */}
        {/* <input className="mb-3" type="text" onChange={(e) => setNameSubCat(e.target.value)}  placeholder="Name Of Sub Category" /> */}
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
      Add Post
  </button>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
<div class="modal-content">
  <div class="modal-header">
    <h1 class="modal-title fs-5" id="exampleModalLabel">Add Posts</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body">
     <form onSubmit={AddPost}>
     <label>Title</label>
         <input onChange={(e) => setTitle(e.target.value)} type="text" />
      <label>Choose Category</label>
     <select onChange={HandleCat} className="form-control ">
               <option>...</option>
              {Categories.map(cat => (
                <option value={cat.id}>{cat.NameCat}</option>        
              ))}
        </select><br/>
        <label>Choose Sub Category</label>
     <select onChange={HandleSubCat} className="form-control">
              <option selected>...</option>
              {SubCategory.filter(it => it.Cat_id==SlctCat).map(cat => (
                <option value={cat.id}>{cat.Name_subCat}</option>        
              ))}
        </select><br/>
        <label>Description</label>
        <textarea className='w-100' onChange={(e) => setDescription(e.target.value)}></textarea>
        <label>Choose Image</label>
        <input type="file" onChange={handlImage}  />
        {/* <p className={`${Errors.Cat_id ? "alert alert-danger" : ""}`}>{Errors.Cat_id}</p> */}
        {/* <input className="mb-3" type="text" onChange={(e) => setNameSubCat(e.target.value)}  placeholder="Name Of Sub Category" /> */}
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

export default Posts

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
      img {
        width: 100%;
        height: 150px;
      }
    }
`