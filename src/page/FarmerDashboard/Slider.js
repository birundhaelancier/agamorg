import React, { Component } from "react";
// import Carousel from "react-spring-3d-carousel";
import   { v4 as uuidv4 }   from "uuid";
import { config } from "react-spring";
import image1 from '../../assets/image1.jpg'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image1 from '../../assets/img/product-image/product1.jpg'
import Image2 from '../../assets/img/product-image/product2.jpg'
import Image3 from '../../assets/img/product-image/product3.jpg'
import { Tabs,Tab,TabPanel,Box,Button,Grid } from '@mui/material';
import { Carousel } from 'antd'
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
import DriveFolderUploadRoundedIcon from '@mui/icons-material/DriveFolderUploadRounded';
import Typography from '@mui/material/Typography';
import { useHistory } from "react-router-dom";
import Post from './Post'
var settings = {
  // arrows: true,
  // dots: true,
  infinite: true,
  speed: 900,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [{
    breakpoint: 1024,
    settings: {
      slidesToShow: 3,
    }

  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 2,
    }
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
    }
  }
  ]
  // variableWidth: true
}

export default function SliderComp() {
  const [value, setValue] = React.useState(0);
  let history=useHistory()
  const ImageSlide=[Image1,Image2,Image3]
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
  }
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
 
    return (
      <div>

        <Slider  {...settings}>
          {[...Array(6)].map((data,index)=>{
          return(
       
        <div style={{textAlign:"center"}} className="slider_comp_far">
             <div style={{padding:"10px"}}>
            <div key={index}><div><img src={image1}  style={{width:"80px",height:"80px",borderRadius:"50%"}}/></div></div>
               <label style={{padding:"10px 0px 0px 0px",fontWeight:"bold"}}>Tamil</label>

               <div>Suggested for you</div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center"}} className="fllow_btn">
                <Button>Follow</Button>
               {/* {[...Array(3)].map((data)=>{
                 return(
                <div className="img_post"><img src={image1} style={{width:"100px",height:"90px",objectFit:"cover"}}/></div>
               )})} */}
               </div>
               </div>
           </div>
            )})}
         </Slider>  
         
    <Box sx={{ width: '100%',margin:"20px 0px"}}>
    {/* <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
    <Tab label={<DriveFolderUploadRoundedIcon/>} {...a11yProps(0)} />
    <Tab label={<AddCommentRoundedIcon/>} {...a11yProps(1)} />
  </Tabs>
      <TabPanel value={value} index={0}>
      <Grid container spacing={2}>
      {ImageSlide.map((data,index)=>{
          return(
            <Grid item xs={12} md={4}>
              <img src={data} style={{width:"100%",height:"100%"}} onClick={()=>history.push("/farmer-posts")}/>
            </Grid>
          )})}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item dsds
      </TabPanel> */}
          <Post />

    </Box>
      </div>
    );
}
