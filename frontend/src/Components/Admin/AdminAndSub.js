import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

function AdminAndSub() {
  const [Email,setEmail] = useState("");
  const [password,setPassword]= useState("");
  const navigate = useNavigate();
  const [check, setCheck] = useState(true);
  const auth_admin = window.localStorage.getItem("auth_admin");

 const handlSubmit = (e) => {
   e.preventDefault();

     axios.get("http://localhost:8000/api/Admin").then(res => {

         res.data.map(item => {
    
           const hashPassword = async (password) => {
             const salt = await bcrypt.genSalt(10);
             const hash = await bcrypt.hash(password, salt);
             return hash;
         };

         const verifyPassword = async (enteredPassword, hashedPassword) => {
             const isMatch = await bcrypt.compare(enteredPassword, hashedPassword);
             return isMatch;
         };

         hashPassword(password).then((hashedPassword) => {
             verifyPassword(password, item.password).then((isMatch) => {
                 if (isMatch && item.email == Email) {
                     window.localStorage.setItem("auth_admin", item.email)
                     console.log("admin loggin is correct");
                     navigate("/Dashboard")
                     setCheck(true)
   
                 } else {
                     console.log("admin Password or email is incorrect");
                     setCheck(false);
                 }
             });
         });

          
         });

     }).catch(err => {
        console.log(err);
     })
 }
  if(auth_admin==null){
  return (
    <div>
        <div class="login-container">
            <form onSubmit={handlSubmit} className='form'>
                <h2 className='mb-3'>Login</h2>
                {check ? "" : <div className='alert alert-danger '>Email Or Password Incorrect</div>}
                <label for="username">Email:</label>
                <input type="email" className='form-control' onChange={(e) => setEmail(e.target.value)} name="Email"   />
                <label for="password">Password:</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} id="password" name="password"  />
                <input className='mb-3' type="submit" value="Login" /><br/>
                <a className='text-decoration-none' href='/'>back to Home</a>
            </form>
        </div>

    </div>
  )
  }else{
    window.location.href="/Dashboard";
  }
}

export default AdminAndSub