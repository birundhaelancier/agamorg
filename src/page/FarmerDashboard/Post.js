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
import Image3 from "../../assets/img/product-image/product3.jpg";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import Header from "./Header";
import Layout from "../../component/VendorDashboard/Layout";
import Banner from "../../component/Common/Banner";
import Footer from "../../component/Common/Footer";
export default function Post(props) {
  const [FeedData, setFeedData] = useState([]);
  let dispatch = useDispatch();

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });

  return (
    <div>
      <Header title="Dashboard"/>
      {/* <Banner title="Vendor" /> */}
      {/* <Layout> */}
      <div className="contest_feed_comp">
        <div className="follwers_div" style={{margin:"15px 20px 0px 20px"}}>
          <Grid container spacing={3}>
            {[...Array(4)].map((data) => (
              <Grid item xs={12} md={4}>
                <Card
                  sx={{ maxWidth: "100%", marginBottom: "10px" }}
                  className="card_header_div"
                >
                  <CardHeader
                    avatar={
                      <img
                        src={Image3}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50px",
                        }}
                      />
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={"Kate Hollmann"}
                    subheader={
                      <>
                        <div>Monday, March 13, 2022</div>
                      </>
                    }
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={Image3}
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
                        width: "20%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* <img src={thumb}/> */}
                      <StyledRating
                        name="customized-color"
                        defaultValue={1}
                        getLabelText={(value) =>
                          `${value} Heart${value !== 1 ? "s" : ""}`
                        }
                        // precision={1}
                        max={1}
                        icon={<FavoriteIcon fontSize="inherit" />}
                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                      />
                      {/* <img src={smile} /> */}
                      {/* <img src={comments} /> */}
                    </div>
                    {/* <div>
                      <BookmarkBorderOutlinedIcon />
                    </div> */}
                     <div className="feed_txt">
                    <label>53,123 Likes</label>
                  </div>
                  </CardActions>
                 
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      {/* </Layout> */}
      <Footer />
    </div>
  );
}
