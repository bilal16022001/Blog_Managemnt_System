import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import ImgP from '../images/blog.jpg'
import styled from 'styled-components';
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import CategoryIcon from '@mui/icons-material/Category';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import CommentIcon from '@mui/icons-material/Comment';
import MailIcon from '@mui/icons-material/Mail';
import SettingsIcon from '@mui/icons-material/Settings';
import ArticleIcon from '@mui/icons-material/Article';

function SideBar() {
  let auth_admin = window.localStorage.getItem("auth_admin");
  const [Name,setName]=useState("");
  const widthSide = useSelector((state) => state.data.width);
  useEffect(() =>{
    fetchAdmin()
  },[]);

  const fetchAdmin = (arg=null) => {
    axios.get("http://127.0.0.1:8000/api/Admin").then(res => {
    res.data.filter(fl => fl.email==auth_admin && fl.type==0).map(item => {
         if(arg==null){
         setName(item.name)
         }else{
          window.localStorage.removeItem("auth_admin");
           window.location.href="/Admin/sub-Admin";
         }
    })
    }).catch(err =>  {
       console.log(err);
    }) 
  }

  return (
    <Side widthSide={widthSide}>
    <div className="sidebar">
    <div className="all">
    <div className="profile text-center">
               
                   <Img className='imgProfile' src={ImgP} />          
                   <a className="admin text-white dropdown-toggle d-block " dropdown-toggle href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">welcome  <span className='nameLogged'>{Name}</span></a>
                   <ul className="dropdown-menu dropMenu text-center" aria-labelledby="navbarDropdown">
                      <li><a className="dropdown-item" href="#"><Link to="/Profile">Profile</Link></a></li>
                      <li><a className="dropdown-item" href="#">logout</a></li>
                  </ul>

      </div>
  <div className="sidebar-item">
    <i className="fas fa-home"></i>
 <Link to="/Dashboard"><HomeIcon/></Link> <Link className='itemSide' to="/Dashboard"><span>Dashboard</span></Link>
  </div>
  <div className="sidebar-item">
    <i className="fa fa-user"></i>
    <Link to="/Sub-Admins"><SupervisorAccountIcon/></Link> <Link className='itemSide' to="/Sub-Admins">Sub-Admins</Link>
  </div>
  <div className="sidebar-item">
    <i className="fas fa-cog"></i>
    <Link to="/Category"><CategoryIcon/></Link> <Link className='itemSide' to="/Category">Category</Link>
  </div>
  <div className="sidebar-item">
    <i className="fas fa-cog"></i>
    <Link to="/Sub-Category"><CategoryIcon/> </Link><Link className='itemSide' to="/Sub-Category">Sub-Category</Link>
  </div>
  <div className="sidebar-item ">
    <i className="fas fa-cog"></i>
    <ContactPageIcon/>   <a className="itemSide btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
   Page
   </a>
     <ul class="dropdown-menu">
        <li><Link className="dropdown-item itemSide" to="/Page-Contact">Page Contact</Link></li>
          <li><Link className="dropdown-item itemSide" to="/Page-About">Page About</Link></li>
    </ul>

  </div>
  <div className="sidebar-item">
    <i className="fas fa-cog"></i>
    <Link className='' to="/Posts"> <ArticleIcon/></Link> <Link className='itemSide' to="/Posts">Posts</Link>
  </div>
  <div className="sidebar-item">
    <i className="fas fa-cog"></i>
    <Link className='' to="/Comments"><CommentIcon/> </Link>  <Link className='itemSide' to="/Comments">Comments</Link>
  </div>
  <div className="sidebar-item">
    <i className="fas fa-cog"></i>
    <Link className='' to="/Subscribers"><MailIcon/></Link>  <Link className='itemSide' to="/Subscribers">Subscribers</Link>
  </div> <div className="sidebar-item">
    <i className="fas fa-cog"></i>
    <Link className='' to="/Settings"><SettingsIcon/></Link> <Link className='itemSide' to="/Settings">Settings</Link>
  </div> 
  </div>
   </div>
   </Side>
  )
}

export default SideBar

const  Img = styled.img`
   width:100px;
   border-radius:50%;

`
const Side = styled.div`
background-color: rgba(0, 0, 0, 0.87);
color: #fff;
width:${props => props.widthSide}px;
transition:all .3s;
overflow:hidden;
.imgProfile{
  width:${props => props.widthSide == 90 ? "60px" : ""};
  margin-left:${props => props.widthSide == 90 ? "-20px" : ""};
 }
 .admin{
  margin-left:${props => props.widthSide == 90 ? "-21px" : ""};
 }
 .nameLogged{
    display:${props => props.widthSide == 90 ? "block" : ""};
    margin-left:${props => props.widthSide == 90 ? "4px" : ""};
  }
  .itemSide{
        display:${props => props.widthSide == 90 ? "none" : ""}
   }
   svg{
    margin-left:${props => props.widthSide == 90 ? "-31px" : ""};
    font-size: ${props => props.widthSide == 90 ? "40px" : ""};

   }
`