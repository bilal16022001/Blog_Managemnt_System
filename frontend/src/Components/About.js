import React, { useEffect,useState } from 'react'
import styled from 'styled-components'
import axios from 'axios';

function About() {
  const [Description,setDescription]=useState([]);
  useEffect(() => {
    fetchDataPage();
  },[]);

   const fetchDataPage = () => {
      axios.get("http://127.0.0.1:8000/api/PageAbout/").then(res => {
       setDescription(res.data);
    }).catch(err => {
         console.log(err);
    });
  }
  return (
    <div>
        <Content className='p-4'>
            <div className='container text-center'>
                <h2 className='mb-3'>About</h2>
              {Description.map(item => (
                <p>{item.Description}</p>
              ))}
            </div>
        </Content>
    </div>
  )
}

export default About

const Content = styled.div`
    p{
      width:550px;
      margin:auto;
    }
`
