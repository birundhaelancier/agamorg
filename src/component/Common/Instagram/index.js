import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from 'react-router-dom'
import { InstgramData } from './InstgramData';
import Heading from '../../Furniture/Heading'
import HeadingTwo from '../../Fashion/Heading'
import { Related_Products,Get_Post_List } from '../../../Redux/Action/allActions';
import { useDispatch,connect } from 'react-redux';
import { ImageUrl } from '../../../Redux/Utils/baseurl'
const InstgramSlider = (props) => {
  let dispatch=useDispatch()
  const [RelatedProduct,setRelatedProduct]=useState([])
  let settings = {
    arrows: false,
    dots: false,
    infinite: false,
    speed: 900,
    slidesToShow: 5,
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
  };
  useEffect(()=>{
   dispatch(Get_Post_List())
  },[])
  useEffect(()=>{
    setRelatedProduct(props.title==="Latest Post"?props.Farmer_Posts:props.RelatedProduct)
  },[props.RelatedProduct,props.Farmer_Posts])
  const PostUrl=props.title==="Latest Post"?"https://agamorg.com/admin/assets/post/":ImageUrl

  return (
    <>
     
        <section id="instagram_area_one">
          <div className="container-fluid">
            <HeadingTwo heading={props.title} />
            <div className="row">
              <div className="col-lg-12">
                <div className="instagram_post_slider">
                  
                 {props.title==="Latest Post"? 
                    <Slider {...settings}>
                 {RelatedProduct && RelatedProduct.map((data, index) => {
                      const ProductImg=props.title==="Latest Post"?data.image:data.photo
                      return(
                      <div className="instgram_post" key={index}>
                        <Link to={"/farmer-posts"}>
                          {/* <i className={data.icon}></i> */}
                          <img src={PostUrl+ProductImg} alt="img"/>
                        </Link>
                      </div>
                    )})}
                    </Slider>:
                  <Slider {...settings}>
                       {RelatedProduct && RelatedProduct.map((data, index) => {
                        const ProductImg=props.title==="Latest Post"?data.image:data.photo
                        return(
                    <div className="product_wrappers_one productslider">
                    <div className="thumb">
                        <Link to={`/product-details-one/${data.slug}`} className="image">
                            {/* <img src={props.data.img} alt="Product" />
                            <img className="hover-image" src={data.hover_img}
                                alt="Product" /> */}
                            <img src={PostUrl+ProductImg} alt="img"/>
                        </Link>
                    </div>
                    <div className="content">
                        <h5 className="title">
                            <Link to={`/product-details-one/${data.slug}`}>{data.name}</Link>
                        </h5>
                        <span className="price">
                            <span className="new"> <i class="fa fa-inr"></i> {data.seller_discount_price}.00</span>{""}
                            <del style={{ paddingLeft: "5px", color: "green" }}> <i class="fa fa-inr"></i> {data.seller_previous_price}.00</del>
                        </span>
                    </div>
                </div>
                )})}
                </Slider>
                    }
                </div>
              </div>
            </div>
          </div>
        </section>

    </>
  )
}


const mapStateToProps = (state) =>
({
  Farmer_Posts:state.AllReducer.Post_list || []
});
export default connect(mapStateToProps)(InstgramSlider);