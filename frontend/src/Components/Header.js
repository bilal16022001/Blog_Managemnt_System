import React,{useEffect, useState} from 'react'
import styled from 'styled-components'
// import { Menu } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import {Link} from 'react-router-dom'
import axios from 'axios'
import {incremnetWidth} from './redux-toolkit/Data/dataSlice'
import {useDispatch,useSelector} from 'react-redux'

function Header() {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [counter,setCounter]=useState(0)
  const dispatch = useDispatch();

  let auth_admin = window.localStorage.getItem("auth_admin");

   const logout = () => {
       axios.get("http://127.0.0.1:8000/api/Admin").then(res => {
       res.data.filter(fl => fl.email==auth_admin && fl.type==0).map(item => {
            window.localStorage.removeItem("auth_admin");
            window.location.href="/Admin/sub-Admin";
       })
       }).catch(err =>  {
          console.log(err);
       }) 

   }
   const HideSide =()=> {

      setCounter(counter+1);
      console.log(counter);
      if(counter%2==0){
        dispatch(incremnetWidth(90))
       }else{
        dispatch(incremnetWidth(270))
        }
   }

  return (
    <Content className='d-flex align-items-center justify-content-between p-4'>
        <IconMenu onClick={HideSide}>
           <MenuIcon/>
        </IconMenu>
        <div>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> <Link to="/Profile">Profile</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
           <Link to="/Settings">Settings</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
           <a onClick={logout}>Logout</a>
        </MenuItem>
      </Menu>
        </div>

    </Content>
  )
}

export default Header

const Content = styled.div`
   height:70px;
   background:#fff;
   box-shadow:10px 10px 5px grey;

`
const IconMenu = styled.div`
    svg{
        font-size:50px;
        cursor:pointer
    }
`