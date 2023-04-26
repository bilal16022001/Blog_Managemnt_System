import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import HomeBlog from './images/blog.jpg'
import About from './About'
import BlogPosts from './BlogPosts'
import Contact from './Contact'
import Footer from './Footer'
import NavBar from './NavBar'
import axios from 'axios'

function Home() {
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
       <NavBar  />
        <Content>
            <div className=''>
                <img className='w-100 h-70 position-absolute' src={`http://127.0.0.1:8000/${setting.background_image}`} />
               <div className='descr container d-flex justify-content-center'>
                 <h1 className='text-white'>{setting.Title}</h1>
                 <Link className='text-decoration-none btn btn-primary' to=""><a>Read More</a></Link>
               </div>
            </div> 
        </Content>
       <About/>
       <BlogPosts logo={setting.logo} />
      <Contact />
      <Footer/>
    </div>
  )
}

export default Home

const Content = styled.div`
     img{
       height:calc(100vh - 56px);
       z-index:-1;

    }
    .descr{
        height:calc(100vh - 56px);
        flex-direction:column;
      
        a{
            width: fit-content;
        }
       
    }
`