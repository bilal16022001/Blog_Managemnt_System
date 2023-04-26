import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios';

function Footer() {
  const [DataContact,setContact]=useState([]);
  const [Name,setName]=useState("");
  const [Email,setEmail]=useState("");

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

    const AddSubscribers = () => {
         const data = new FormData();
          data.append("Name",Name);
          data.append("Email",Email);
        axios.post("http://127.0.0.1:8000/api/Subscribers/",data).then(res => {
          console.log(res.data);
          window.location.reload(true)
        }).catch(err=> {
           console.log(err);
         })
     }
  return (
    <Content>
         <div className='container p-5'>
        <div className='row'>
            <div className='contact col-md-4'>
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
            <div className='col-md-4'>
               <h3>Quick Links</h3>
               <ul className='about d-flex justify-content-around'> 
                <li><a>Home</a></li>
                <li><a>Blog</a></li>
                <li><a>About Us</a></li>
                <li><a>Contact Us</a></li>
              </ul>  
            </div>
            <div className='col-md-4 Newsletter'>
               <h3 className='mb-3'>Newsletter</h3> 
               <form onSubmit={AddSubscribers}>
                 <input className='w-100' type="text" onChange={(e) => setName(e.target.value)} placeholder='your Name' />
                 <input className='w-100' type="text" onChange={(e) => setEmail(e.target.value)} placeholder='your email' /><br/>
                 <input className='btn btn-primary' type="submit" value="send Me" />
               </form> 
            </div>
        </div>
        </div>
    </Content>
  )
}

export default Footer

const Content = styled.div`
    color:#fff;
    background-color:#252020;
    .Newsletter{
       form{
        input:not(:last-of-type){
           margin-bottom:10px;
           padding-left:10px;
           background:none;
           outline:none;
           border:none;
           color:#fff;
      
        }
    }
    }
`