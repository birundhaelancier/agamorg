import React,{useEffect, useState} from 'react'
import { useSelector } from "react-redux";
import ProductCard from '../../Common/Product/ProductCard';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Heading from '../Heading';
import axios from 'axios'
const TodayDeal = () => {
  // let products = useSelector((state) => state.products.products);
  const [DealList,setDealList]=useState([])
    let settings = {
        arrows: false,
        dots: true,
        margin:30,
        infinite: false,
        speed: 500, 
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
          {
 
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
            }
          }, 
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
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
          },
        ]
      };
      useEffect(()=>{
        // dispatch(Get_HomeProduct_List("deal"))
        axios({
            method: 'post',
            url:"https://elancier.in/agam/api/homeProduct",
            data:{"type":"deal"}
        })
        .then((response) => {
            setDealList(response.data)
        })
        },[]) 
    return (
    <>
    <section id="to_days_area" className="ptb-10 slider_arrows_one">
    {DealList.length>0&& <div className="container">
       <Heading heading="ToDay's Deal" para="Lorem Ipsum is simply dummy text of the printing and typesetting industry"/>
            <div className="row">
                <div className="col-lg-12">
                    <div className="todays_slider">
                    <Slider {...settings}>
                    {DealList.length>0&&DealList.map((data, index) =>(
                          <ProductCard data={data} key={index}/>
                     ))}
                  </Slider>
                    </div>
                </div>
            </div>
        </div>}
    </section> 
        </>
    )
}

export default TodayDeal
