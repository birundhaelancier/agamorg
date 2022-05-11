import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import img1 from '../../../assets/img/product-image/product1.jpg';
import img2 from '../../../assets/img/product-image/product2.jpg';
import img3 from '../../../assets/img/product-image/product3.jpg';
import img4 from '../../../assets/img/product-image/product4.jpg';
import img5 from '../../../assets/img/product-image/product5.jpg';
import img6 from '../../../assets/img/product-image/product6.jpg';
import Heading from '../Heading';
import { Get_HomeProduct_List } from '../../../Redux/Action/allActions' 
import { connect,useDispatch } from 'react-redux' 
import { apiurl, ImageUrl } from '../../../Redux/Utils/baseurl'
import axios from 'axios'
const BannerBottom = (props) => {
    const [ArrivalList,setArrivalList]=useState([])
    let dispatch=useDispatch()
    useEffect(()=>{
        dispatch(Get_HomeProduct_List("deal"))
        axios({
            method: 'post',
            url:apiurl+"homeProduct",
            data:{"type":"new"}
        })
        .then((response) => {
            setArrivalList(response.data)
        })
        },[])  
        
        useEffect(()=>{
        },[props.Slider_list])
    return (
        <>
        <section id="product_variation_one" className="pt-100 sort_list">
        <div className="container-fluid">
        <Heading heading="New Arrivals" />
            {/* <div className='new_header'>New Arrivals</div> */}
            <div className="row">
                 {ArrivalList&&ArrivalList.map((data)=>{
                        return(
                <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6">
                    <div className="product_variation_one_boxed img-zoom-hover">
                        <img src={ImageUrl+data.photo} alt="img" />
                        <div className="product_var_one_text">
                            <h4 className="color_one">{data.name}</h4>
                            <h2>New</h2>
                            <h4>Collection</h4>
                            <Link to={`/product-details-one/${data.slug}/${data.id}`} className="theme-btn-one bg-black btn_sm">Shop Now</Link>
                        </div>
                    </div>
                    {/* <div className="product_variation_one_boxed img-zoom-hover">
                        <img src={img2} alt="img" />
                        <div className="product_var_one_text">
                            <h4 className="color_one">Summer</h4>
                            <h2>Hot</h2>
                            <h4>Collection</h4>
                            <Link to="/shop" className="theme-btn-one bg-black btn_sm">Shop Now</Link>
                        </div>
                    </div> */}
                </div>
                    )})}

                {/* <div className="col-lg-4 col-md-6">
                    <div className="product_variation_one_boxed img-zoom-hover">
                        <img src={img3} alt="img" />
                        <div className="product_var_one_text_center">
                            <h2 className="color_one">40% Offer</h2>
                            <h4>No Selected Models</h4>
                            <Link to="/shop" className="theme-btn-one bg-black btn_sm">Shop Now</Link>
                        </div>
                    </div>
                </div> */}
                {/* <div className="col-lg-4 col-md-6">
                    <div className="product_variation_one_boxed img-zoom-hover">
                        <img src={img4} alt="img" />
                        <div className="product_var_one_text">
                            <h2>New</h2>
                            <h4 className="color_one">Arrivals</h4>
                            <Link to="/shop" className="theme-btn-one bg-black btn_sm">Shop Now</Link>
                        </div>
                    </div>
                    <div className="product_variation_one_boxed img-zoom-hover">
                        <img src={img5} alt="img" />
                        <div className="product_var_one_text">
                            <h2>Hot</h2>
                            <h4 className="color_one">Offer</h4>
                            <Link to="/shop" className="theme-btn-one bg-black btn_sm">Shop Now</Link>
                        </div>
                    </div>
                </div> */}
                {/* <div className="col-lg-4 col-md-6">
                    <div className="product_variation_one_boxed img-zoom-hover">
                        <img src={img3} alt="img" />
                        <div className="product_var_one_text">
                            <h2>New</h2>
                            <h4 className="color_one">Arrivals</h4>
                            <Link to="/shop" className="theme-btn-one bg-black btn_sm">Shop Now</Link>
                        </div>
                    </div>
                    <div className="product_variation_one_boxed img-zoom-hover">
                        <img src={img6} alt="img" />
                        <div className="product_var_one_text">
                            <h2>Hot</h2>
                            <h4 className="color_one">Offer</h4>
                            <Link to="/shop" className="theme-btn-one bg-black btn_sm">Shop Now</Link>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
        </section>
        </>
    )
}

// const mapStateToProps = (state) =>
// ({
//     // Products: state.AllReducer.Products || [],
// });
export default BannerBottom;