import React, { useEffect,useState } from 'react'
import { Link ,useParams} from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import NavBar from './NavBar';
import Footer from './Footer';

function BlogPosts() {
   const {BlogPosts} = useParams();
   const [Posts,setPosts]=useState([]);
   useEffect(() => {
      fetchPosts();
   },[]);
   
   const fetchPosts = () => {
      axios.get("http://127.0.0.1:8000/api/Posts").then(res => {
        console.log(res.data);
        setPosts(res.data);
     }).catch(er =>{
         console.log(er);
     })
   }
  return (
    <div>
      <NavB BlogPosts={BlogPosts}>
        <NavBar />
       </NavB>
        <Content className='p-4 '>
        <h2 className='text-center'>Blogs</h2>
           <div className='container Blog'>
             
             {Posts.map(item => (
                <div className=''>
                  <div className='imageInf position-relative me-4'>
                     <img src={`http://127.0.0.1:8000/${item.Image}`}  />
                     <div className='info position-absolute'>
                     <ul className='d-flex gap-2'>
                             <li><PersonIcon/> admin</li>
                             <li><CalendarMonthIcon /> {item.created_at.slice(0,10)}</li>
                             <li><RemoveRedEyeIcon/> 3</li>
                         </ul>
                     </div>
                  </div>
                  <div className='para p-3'>
                     <h2>{item.Title}</h2>
                     <Link className='' to={`/DetailPost/${item.id}`}><a>Read More</a></Link>
                  </div>
                </div>
            ))}
    
               
           </div>
        </Content>
        <ShowFooter BlogPosts={BlogPosts}>
        <Footer/>
        </ShowFooter>
    </div>
  )
}

export default BlogPosts

const NavB = styled.div`
  display:${props => props.BlogPosts  ? "" : "none"};
  
`
const Content = styled.div`
     background-color:#e5e5e5;
 
     h2{
       margin-bottom:20px;
    }
     img{
       width:100%;
       
    }
    a{
       display:inline-block;
       border:1px solid red;
       border-radius:10px;
       width:100%;
       text-align:center;
    }

`

const ShowFooter = styled.div`
   display:${props => props.BlogPosts  ? "" : "none"};
`