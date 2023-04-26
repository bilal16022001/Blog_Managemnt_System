import React, { useState ,useEffect} from 'react'
import SideBar from './SideBar'
import styled from 'styled-components'
import Header from '../Header'
import axios from 'axios'

function Settings() {
   const [logo,setLogo]=useState("");
   const [Title, setTitle] = useState('')
   const [backImg, setbackImg] = useState('')
   const auth_admin = window.localStorage.getItem("auth_admin");

   const handlLogo = (e) => {
      setLogo(e.target.files[0]);
  }

  const handlBackImg = (e) => {
      setbackImg(e.target.files[0]);
  }
  useEffect(() => {
    fetchData()
    },[])
  
    const fetchData = () => {
       axios.get("http://127.0.0.1:8000/api/Settings").then(res => {
          console.log(res.data);
         setLogo(res.data.logo)
         setTitle(res.data.Title)
         setbackImg(res.data.background_image)
       }).catch(err => {
          console.log(err);
       })
    }
  
  const updateHome = (e) => {
    e.preventDefault();
      const data = new FormData();
      data.append("logo",logo);
      data.append("Title",Title);
      data.append("background_image",backImg);
      axios.post("http://127.0.0.1:8000/api/Settings",data).then(res => {
          console.log(res.data);
          window.location.reload(true)
      }).catch(err => {
         console.log(err);
      })
  }

  if(auth_admin!=null){
  return (
    <div className='d-flex'>
    <SideBar/>
    <div className='w-100'>
       <Header/>
       <Content className=''>
          <div className='content'>
          <div class="p-3">
            <h2 className='mb-2'>Edit Page Home</h2>
             <form onSubmit={updateHome}>
                <label>logo</label>
                <input type="file" className='form-control mb-3'  onChange={handlLogo} />
                <img className=' logo' src={`http://127.0.0.1:8000/${logo}`} />
                <label>Title</label>
                <input type="text" className='mb-3' placeholder='Title' value={Title} onChange={(e) => setTitle(e.target.value)} />
                <label>background image</label>
                <input type="file" className='form-control mb-3' onChange={handlBackImg} />
                <img className='backImg mb-3' src={`http://127.0.0.1:8000/${backImg}`} />
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

export default Settings

const Content = styled.div`
   background-color:#e5e5e5;
  //  height:100vh;  
   padding:30px;
   .content{
     background-color:#fff;
     border-radius:7px;
     .logo{
      width:100px;
      height:60px;
     }
     .backImg{
        width:100%;
        height:500px;
      }
  }
`