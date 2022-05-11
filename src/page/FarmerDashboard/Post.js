import React, { useState, useEffect } from "react";
// import './Feed.scss'
import { useDispatch, connect } from "react-redux";
import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Grid,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import comments from "../../assets/img/comment.svg";
import smile from "../../assets/img/smile.svg";
import avater from '../../assets/img/common/avater.png'
import Image3 from "../../assets/img/product-image/product3.jpg";
import empty from '../../assets/img/common/empty-cart.png'
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import Header from "./Header";
import Layout from "../../component/VendorDashboard/Layout";
import Banner from "../../component/Common/Banner";
import Footer from "../../component/Common/Footer";
import { Get_Post_List,Farmer_Post_List } from '../../Redux/Action/allActions'
import { Delete_Posts } from '../../Redux/Action/CreateActions'
import { ImageUrl } from '../../Redux/Utils/baseurl'
import moment from 'moment'
import { Link, useLocation } from 'react-router-dom'
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Createpost from './Createpost'
function Post(props) {
  const [FeedData, setFeedData] = useState([]);
  const [FilterData,setFilterData]=useState([])
  const [Hide,setHide]=useState(false)
  let dispatch = useDispatch();
  let location=useLocation()
  
  const [post,setpost]=useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;



  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });
  useEffect(()=>{
    dispatch(Get_Post_List())
    dispatch(Farmer_Post_List())
   },[])
   useEffect(()=>{
      
       if(location.pathname==="/farmer-posts"){
          setHide(true)
       }else{
        setHide(false)
       }
       setFeedData(Hide?props.Post_List:props.Farmer_Posts)

   },[props.Post_List,props.Farmer_Posts,location])
   const postDelete=(id)=>{
     dispatch(Delete_Posts(id)).then(()=>{
      setAnchorEl(null)
     })
   }
    const EditFun=(id)=>{
      setpost(true)
      setAnchorEl(null)
      var Data=props.Post_List.filter((value) => {
          return value.id===id
      })
      setFilterData(Data[0])
    }
  return (
    <div>
      {Hide&&<Header title="Posts"/>}
      {/* <Banner title="Vendor" /> */}
      {/* <Layout> */}
      {!Hide&&<h4>My Posts</h4>}
      <div className="contest_feed_comp">
        <div className="follwers_div" style={{margin:"15px 20px 0px 20px"}}>
          <Grid container spacing={3}>
            {FeedData && FeedData.map((data) => (
              <Grid item xs={12} md={4}>
                <Card
                  sx={{ maxWidth: "100%", marginBottom: "10px" }}
                  className="card_header_div"
                >
                  <CardHeader
                    avatar={
                      <img
                        src={data.photo!==null?ImageUrl+data.photo:avater}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50px",
                          display:Hide?"block":"none"
                        }}
                      />
                    }
                    action={
               
                     <div>

       {!Hide  ?<>
      <MoreVertIcon onClick={handleClick}/>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography style={{ padding: "3px 15px",cursor:"pointer" }} onClick={()=>EditFun(data.id)}>Edit</Typography>

        <Typography style={{ padding: "3px 15px",cursor:"pointer" }} onClick={()=>postDelete(data.id)}>Delete</Typography>
      </Popover>
      </>:""}
                     </div>    
                      // </IconButton>
                     
                    }
                    title={data.farmerName}
                    subheader={
                      <>
                          <div>{data.title}</div>
                          <div>
                          {/* Monday, March 13, 2022 */}
                          {data.updated_at!=null ?moment(data.updated_at).format("DD-MM-YYYY"):moment().format("DD-MM-YYYY")}
                          </div>
                      </>
                    }
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={data.image!==null?"https://agamorg.com/admin/assets/post/"+data.image:empty}
                    style={{width:"100%",height:"220px"}}
                    alt="Paella dish"
                  />
                  <CardActions
                    disableSpacing
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems:"center"
                      }}
                    >
                      {/* <img src={thumb}/> */}
                     {Hide&& <StyledRating
                        name="customized-color"
                        defaultValue={1}
                        getLabelText={(value) =>
                          `${value} Heart${value !== 1 ? "s" : ""}`
                        }
                        // precision={1}
                        max={1}
                        icon={<FavoriteIcon fontSize="inherit" />}
                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                      />}
                      {/* <img src={smile} /> */}
                      {/* <img src={comments} /> */}
                      <div className="feed_txt">
                    <label>53,123 Likes</label>
                  </div>
                    </div>
                    <Link  className="button folow_btn">{"Follow"}</Link>
                    {/* <div>
                      <BookmarkBorderOutlinedIcon />
                    </div> */}
                  
                  </CardActions>
                 
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      {/* </Layout> */}
      {/* <Footer /> */}
      <Createpost show={post} Edit={"edit"} EditData={FilterData} stop={()=>setpost(false)} start={()=>setpost(false)} />
    </div>
  );
}
const mapStateToProps = (state) =>
({
  Post_List: state.AllReducer.Post_list || [],
  Farmer_Posts:state.AllReducer.Farmer_Posts || []
});
export default connect(mapStateToProps)(Post);


        //  {/* <MoreVertIcon />:"" */}
                    
                      // <IconButton aria-label="settings">

  