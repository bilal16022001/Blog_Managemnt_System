import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import axios from 'axios';
function NavBar() {

  const [setting,setSetting]=useState([]);
  useEffect(() => {
  fetchData()
  },[])

  const fetchData = () => {
     axios.get("http://127.0.0.1:8000/api/Settings").then(res => {
        console.log(res.data);
        setSetting(res.data)
     }).catch(err => {
        console.log(err);
     })
  }
  return (
    <div>
        <nav class="navbar navbar-expand-lg bg-light">
     <div class="container">
    <a class="navbar-brand" href="#"><Link className='nav-link' to="/"><img src={`http://127.0.0.1:8000/${setting.logo}`} /></Link></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto d-flex align-items-center mb-2 mb-lg-0">
      <ul className='d-flex position-absolute end-0 me-4'>
                <li><Link className='nav-link' to="/">Home</Link></li>
                <li><Link className='nav-link' to="/BlogPosts">Blogs</Link></li>
                <li><a className='nav-link'>About Us</a></li>
                <li><a className='nav-link'>Contact Us</a></li>
                <li><Link className='nav-link' to="/Admin/sub-Admin">Admin/Sub-Admin</Link></li>
            </ul>
      </ul>
      <div class="">
           
      </div>
    </div>
  </div>
</nav>
    
    </div>
  )
}

export default NavBar

const Nav = styled.div`
     background-color:#e5e5e5;
`