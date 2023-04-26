import React,{useState,useEffect} from 'react'
import SideBar from './SideBar'
import styled from 'styled-components'
import Header from '../Header'
import axios from 'axios'

function Page_Contact() {
  const [Title,setTitle]=useState("");
  const [Description,setDescription]=useState("");
  const [Email,setEmail]=useState("");
  const [Phone,setPhone]=useState("");
  const [Copyright,setCopyright]=useState("");
  const [Address,setAddress]=useState("");
  const auth_admin = window.localStorage.getItem("auth_admin");
  const [id,setId]=useState(null);

  useEffect(() => {
   fetchDataPage();
 },[]);

  const fetchDataPage = () => {
     axios.get("http://127.0.0.1:8000/api/PageContact/").then(res => {
     setId(res.data[0].id)
      setTitle(res.data[0].Title);
      setEmail(res.data[0].Email);
      setDescription(res.data[0].Description);
      setPhone(res.data[0].Phone);
      setCopyright(res.data[0].Copyright);
      setAddress(res.data[0].Address)
   }).catch(err => {
        console.log(err);
   });
 }

  const updatePageContact = (e) => {
        e.preventDefault();

      const data = new FormData();
           data.append("Title",Title);
           data.append("Description",Description);
           data.append("Address",Address);
           data.append("Phone",Phone);
           data.append("Email",Email);
           data.append("Copyright",Copyright);
           data.append("_method","PATCH");


           axios.post(`http://127.0.0.1:8000/api/PageContact/${id}`,data).then(res => {
             window.location.reload(true);
           }).catch(err => {
                 console.log(err);
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
          <div class=" p-3">
            <h2>Edit Page Contact</h2>
             <form onSubmit={updatePageContact}>
                <input type="text" className='form-control mb-2' value={Title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
                <input type="text" className='form-control mb-2' value={Description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                <input type="text" className='form-control mb-2' value={Address} onChange={(e) => setAddress(e.target.value)} placeholder='Address' />
                <input type="text" className='form-control mb-2' value={Phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone' />
                <input type="email" className='form-control mb-2' value={Email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                <input type="text" className='form-control mb-2' value={Copyright} onChange={(e) => setCopyright(e.target.value)} placeholder='Copyright' />
                <input type="submit" className='btn btn-primary' value="update" />
             </form>
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

export default Page_Contact

const Content = styled.div`
   background-color:#e5e5e5;
   height:100vh;  
   padding:30px;
   .content{
     background-color:#fff;
     border-radius:7px;
  }
`