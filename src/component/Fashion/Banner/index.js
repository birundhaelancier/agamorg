
import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,connect } from "react-redux";
import { Get_Slider_List } from '../../../Redux/Action/allActions' 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Banner = (props) => {
    let dispatch=useDispatch()
    const [Sliderlist,setSliderlist]=useState([])
    let settings = {
        arrows: false,
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay:true,
        responsive: [{
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
            }
       
          },
           {
            breakpoint: 600, 
            settings: {
              slidesToShow: 1,
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
    dispatch(Get_Slider_List())
    },[])  
    
    useEffect(()=>{
        setSliderlist(props.Slider_list)
    },[props.Slider_list])
    return (
        <section id="furniture_banner">
        <div className="furniture_slider_box">
        <Slider {...settings}>
               {Sliderlist.length>0&&Sliderlist.map((data,index)=>{
                return(
           <div >        
          <div className="furniture_slider background_bg bg_1" style={{backgroundImage:`url(${"https://elancier.in/agam/assets/images/"+data?.photo})`}}>
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-8 col-sm-12 col-12">
                  <div className="furniture_slider_content">
                    {/* <h5> NEW TRENDING</h5> */}
                    <h2> {data.title}</h2>
                    <p>{data?.details}</p>
                    <Link to="/shop" className="theme-btn-one bg-black btn_sm">Shop Now</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div> 
      )})}
       
          </Slider>
        </div>
      </section>

    )
}

const mapStateToProps = (state) =>
({
    Slider_list: state.AllReducer.Slider_list || [],
});
export default connect(mapStateToProps)(Banner);




