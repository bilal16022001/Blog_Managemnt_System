import React, { useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom'
import axios from  'axios'
import NavBar from './NavBar';
import styled from 'styled-components'
import Footer from './Footer';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ClassIcon from '@mui/icons-material/Class';
import {FetchCategoreis} from './redux-toolkit/Category/CategorySlice'
import { useDispatch ,useSelector} from 'react-redux';

function DetailPost() {
    const {id} = useParams(); 
    const [DetailPost,setDetailPost]=useState([]);
    const [Name,setName]=useState("");
    const [Email,setEmail]=useState("");
    const [Comment,setComment]=useState("");
    const [AllComments,setAllComments]=useState([]);
    const [Blogs,setBlogs]=useState([]);
    const Categories = useSelector((state) => state.Category.Categories);

    const dispatch = useDispatch();

   useEffect(() => {
    FetchDetailPost();
    showComments();
    AllBlogs();
    dispatch(FetchCategoreis())
},[]);

 const FetchDetailPost = () => {
    axios.get(`http://127.0.0.1:8000/api/Posts/`).then(rs => {
       setDetailPost(rs.data.filter(it => it.id == id));
       console.log(rs.data.filter(it => it.id == id));

   }).catch(err => {
         console.log(err);
   })
}

 const AddComment = (e) => {
     e.preventDefault();
     const Data = new FormData();
       Data.append("Post_id",id);
       Data.append("Name",Name);
       Data.append("Email",Email);
       Data.append("Comment",Comment);
       axios.post("http://127.0.0.1:8000/api/Comments/",Data).then(res => {
          console.log(res.data);
          window.location.reload(true)
       }).catch(err => {
          console.log(err);
       })
  
 }
  const showComments = () => {
     axios.get(`http://127.0.0.1:8000/api/Comments/${id}`).then(res => {
         console.log(res.data);
         setAllComments(res.data);
     }).catch(err => {
          console.log(err);
      })
  }
  const AllBlogs = () => {
    axios.get(`http://127.0.0.1:8000/api/Posts/`).then(res => {
  
        setBlogs(res.data.filter(it => it.id != id));
    }).catch(err => {
         console.log(err);
     })
 }

  return (
    <div>
    <NavBar/>
     <Content>
         <div className='container p-3'>
             {DetailPost.map(item => (
               <>
                  <h1 className='mb-3'>{item.Title}</h1>
                  <ul className='d-flex gap-3 p-0'>
                             <li><PersonIcon/> admin</li>
                             <li><ClassIcon /> {item.category.NameCat} / {item.sub_category.Name_subCat}</li>
                             <li><CalendarMonthIcon /> {item.created_at.slice(0,10)}</li>
                             <li><RemoveRedEyeIcon/> 3</li>
                    </ul>
                  <img src={`http://127.0.0.1:8000/${item.Image}`} className='w-100 mb-2' />
                  <p>{item.Description}</p>
               </>
            ))}
            <div className='row'>
              <div className='col-md-7'>
              <h2 className='mb-3'>Comments ({AllComments.filter(it => it.Approve!=0).length})</h2>
              {AllComments.filter(it => it.Approve!=0).map(item => (
                  <div className='comments d-flex mb-3 gap-3'>
                  <img src="http://127.0.0.1:8000/attachments/Posts/ptlAECZJEhFL8T9S.jpg" alt='' />
                  <div className='infoP'>
                    <h3>{item.Name}</h3>
                    <p>{item.Comment}</p>
                  </div>
                </div>        
              ))}
              
                <h4 className='mb-3'>leave a Comment</h4>
                <form onSubmit={AddComment}>
                  <div className='row'>
                    <div className='col-md-6'>
                       <input type="text" className='form-control' placeholder='Name' onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='col-md-6 mb-3'>
                       <input type="email" className='form-control' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='col-md-12 mb-2'>
                      <textarea placeholder='your Comment' className='form-control' onChange={(e) => setComment(e.target.value)}></textarea>
                    </div>
                  </div>
                  <input type="submit" className='btn btn-primary' value="Submit" />
                </form>
              </div>
              <div className='col-md-5'>
                <h2>Recent Blogs</h2>
                <ul className='p-0 list-style-circle'>
                  
                   {Blogs.map(item => (
                         <li><a className='' href={`/DetailPost/${item.id}`}>{item.Title}</a></li>
                   ))}
                </ul>
                <div className='cat'>
                  <h3>Category</h3>
                    <ul className='p-0'>
                      {Categories.map(item => (
                         <li className=''><Link to={`/blogs/${item.NameCat}`}>{item.NameCat}</Link></li>
                      ))}
                    </ul>
                </div>
              </div>
            </div>
          </div>
     </Content>
   {/* <Footer/> */}
 </div>
  )
}

export default DetailPost

const Content = styled.div`
    img{
       height:640px;
    }
    .comments img{
       wduth:40px;
       height:40px;
       border-radius:50%;
    }
    form{
      input{
        height:40px;
        padding-left:10px;
     }
     textarea{
        padding-left:10px;
        height:100px;
     }
    } 
  
`