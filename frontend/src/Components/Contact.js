import React, { useEffect,useState } from 'react'
import styled from 'styled-components'
import social from './images/social.jpg'
import axios from 'axios';

function Contact() {
    const [DataContact,setContact]=useState([]);
    useEffect(() => {
        fetchDataPage();
      },[]);
     
       const fetchDataPage = () => {
          axios.get("http://127.0.0.1:8000/api/PageContact/").then(res => {
              console.log(res.data);
              setContact(res.data)
        }).catch(err => {
             console.log(err);
        });
      }
  return (
    <Content>
        <div className='container p-5'>
        <div className='row'>
            <div className='contact col-md-6'>
                {DataContact.map(item => (
                    <>
                    <h3>{item.Title}</h3>
                    <p>{item.Description}</p>
                    <ul>
                        <li><span>Adress : </span>{item.Address}</li>
                        <li><span>Number Phone : </span>{item.Phone}</li>
                        <li><span>Email : </span>{item.Email}</li>
                    </ul>
                    </>
                ))}
                
            </div>
            <div className='col-md-6'>
                <img className='w-100' src={social} />
            </div>
        </div>
        </div>
    </Content>
  )
}

export default Contact

const Content = styled.div`
   color:#fff;
   background-color:#3f51b5;

`