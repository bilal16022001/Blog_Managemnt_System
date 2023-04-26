import logo from './logo.svg';
import './App.css';
// import "./style.scss";
import NavBar from './Components/NavBar';
import {BrowserRouter as Router,Route,Routes,Link } from 'react-router-dom'
import Home from './Components/Home';
import About from './Components/About';
import BlogPosts from './Components/BlogPosts';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import AdminAndSub from './Components/Admin/AdminAndSub';
import Dashboard from './Components/Admin/Dashboard';
import SideBar from './Components/Admin/SideBar';
import Sub_Admins from './Components/Admin/Sub_Admins';
import Category from './Components/Admin/Category';
import Sub_Category from './Components/Admin/Sub_Category';
import Page_Contact from './Components/Admin/Page_Contact';
import Page_About from './Components/Admin/Page_About';
import Posts from './Components/Admin/Posts';
import Comments from './Components/Admin/Comments';
import Subscribers from './Components/Admin/Subscribers';
import Settings from './Components/Admin/Settings';
import DetailPost from './Components/DetailPost';
import BlogCat from './Components/BlogCat';
import Profile from './Components/Admin/Profile';

function App() {

  return (
     <Router>
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>} />
         <Route path='/Admin/sub-Admin' element={<AdminAndSub/>}  />
         <Route path='/Dashboard' element={<Dashboard/>}  />
         <Route path='/SideBar' element={<SideBar/>}  />
         <Route path='/Sub-Admins' element={<Sub_Admins/>} />
         <Route path='/Category' element={<Category/>} />
         <Route path='/Sub-Category' element={<Sub_Category/>} />
         <Route path='/Page-Contact' element={<Page_Contact/>} />
         <Route path='/Page-About' element={<Page_About/>} />
         <Route path='/Posts' element={<Posts/>} />
         <Route path='/Comments' element={<Comments/>} />
         <Route path='/Subscribers' element={<Subscribers/>} />
         <Route path='/Settings' element={<Settings/>} />
         <Route path='/DetailPost/:id' element={<DetailPost/>} />
         <Route path='/:BlogPosts' element={<BlogPosts/>} />
         <Route path='/blogs/:cat' element={<BlogCat />} />
         <Route path='/Profile' element={<Profile />} />
      </Routes>
      </div>
    </Router>
  )
  
}

export default App;
