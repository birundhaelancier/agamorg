import React from "react";
import Header from "./Header";
import Layout from "../../component/VendorDashboard/Layout";
import { Tabs,Tab,TabPanel,Box,Button,Grid,Typography } from '@mui/material';
import { Carousel } from 'antd'
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
import DriveFolderUploadRoundedIcon from '@mui/icons-material/DriveFolderUploadRounded';
import Image1 from '../../assets/img/product-image/product1.jpg'
import Image2 from '../../assets/img/product-image/product2.jpg'
import Image3 from '../../assets/img/product-image/product3.jpg'
import Banner from '../../component/Common/Banner'
import Footer from '../../component/Common/Footer'
import Post from './Post'
export default function FollowAndFollowings() {
    const [value, setValue] = React.useState(0);
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
      {/* <Header /> */}
      {/* <Banner title="Vendor" /> */}
      {/* <Layout> */}
      <Header title="Followers And Followings"/>
        <Box sx={{ width: "100%", margin: "20px 0px" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label={"Followers"} {...a11yProps(0)} />
            <Tab label={"Followings"} {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Grid container spacing={2}>
              {ImageSlide.map((data, index) => {
                return (
                  <Grid item xs={12} md={12} className="follow_parent d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center justify-content-between">
                        <img src={data} style={{ width: "80px", height: "80px",borderRadius:"50%" }} />
                        <div  className="flex-d"><label>Aruna_j3456</label><label>Aruna</label></div>
                    </div>
                    <div>Remove</div>
                  </Grid>
                );
              })}
            </Grid>
            <Grid item xs={12} md={12}>
                <label  style={{padding:"10px 0px",fontWeight:"bold"}}>Suggestions for you</label> 
                {ImageSlide.map((data, index) => {
                return (
                  <Grid item xs={12} md={12} className="follow_parent d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center justify-content-between">
                        <img src={data} style={{ width: "80px", height: "80px",borderRadius:"50%" }} />
                        <div  className="flex-d"><label>sibinantony_s345</label><label>Sibin Antony</label><label>Suggested for you</label></div>
                    </div>
                    <div className="follow_text">Follow</div>
                  </Grid>
                );
              })}
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
          <Grid container spacing={4}>
          {ImageSlide.map((data, index) => {
                return (
                  <Grid item xs={12} md={12} className="follow_parent d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center justify-content-between">
                        <img src={data} style={{ width: "80px", height: "80px",borderRadius:"50%" }} />
                        <div  className="flex-d"><label>sibinantony_s345</label><label></label></div>
                    </div>
                    <div>Following</div>
                  </Grid>
                );
              })}
              </Grid>
          </TabPanel>
        </Box>
      {/* </Layout> */}
      <Footer />
    </div>
  );
}
