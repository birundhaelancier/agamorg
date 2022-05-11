import React,{useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useHistory, useLocation } from 'react-router-dom';
import Createpost from './Createpost'





export default function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [post,setpost]=useState(false)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  let history=useHistory()
  let location=useLocation()


  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor:"#fff",color:"#333"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <KeyboardBackspaceIcon onClick={()=>history.goBack()}/>
          </IconButton>
          <div>{props.title}</div>
          <Box sx={{ flexGrow: 1 }} />
          {location.pathname==="/farmer-dashboard"&&
          <div style={{display:"grid",fontSize:"14px",lineHeight:"1"}}>
            <label>Create Post</label><div style={{textAlign:"center"}}>
         {/* <input type="file" id="my_file_input" style={{display:"none"}}/> */}
         {/* <label htmlFor="my_file_input"> */}
           <AddBoxOutlinedIcon onClick={()=>setpost(true)}/>
           {/* </label> */}
           </div>
           </div>}
        
        </Toolbar>
      </AppBar>
    </Box>
     <Createpost show={post} stop={()=>setpost(false)} start={()=>setpost(false)} />
     </>
  );
}
