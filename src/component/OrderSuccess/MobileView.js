import React,{useEffect,useState} from 'react'
import { useHistory,useParams } from 'react-router-dom'
// import Img
import img from '../../assets/img/common/delivery_success.png'
import img1 from '../../assets/img/email/success.png'
import img2 from '../../assets/img/email/order-success.png'
import pro1 from '../../assets/img/email/pro-3.jpg'
import pro2 from '../../assets/img/email/pro-5.jpg'
import spoce from '../../assets/img/email/space.jpg'
// Icon Import
import facebook from '../../assets/img/email/facebook.png'
import youtube from '../../assets/img/email/youtube.png'
import twitter from '../../assets/img/email/twitter.png'
import gplus from '../../assets/img/email/gplus.png'
import linkedin from '../../assets/img/email/linkedin.png'
import pinterest from '../../assets/img/email/pinterest.png'
import { Link } from 'react-router-dom'
import { connect,useDispatch } from 'react-redux'
import { ImageUrl } from '../../Redux/Utils/baseurl'
import { UserOrders } from '../../Redux/Action/allActions'
const OrderMobile_View = (props) => {
    const history = useHistory();
    const routeChange = () => {
        history.goBack()
    };
    let { id } =useParams()
    let dispatch=useDispatch()
    const [OrderDetails,setOrderDetails]=useState([])
    useEffect(()=>{
      dispatch(UserOrders())
    },[])
    useEffect(()=>{
      props.Orders.filter((data)=>{
       if(data.txnid===id){
        setOrderDetails(data)
       }
      })
    },[props.Orders,id])
    const  Billing =OrderDetails?.billing_info
    const OrderDetail=Object.values(OrderDetails?.cart ||"") || OrderDetails.cart
    const cartTotal = () => {
      return OrderDetail.reduce(function (total, item) {
          return total + ((item.qty || 1) * item.main_price)
      }, 0)
  }
    return (
        <>
            <div className="mobile_view_cart order_success_deta">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div className="back_btn_emial">
                    <button className="theme-btn-one btn-black-overlay btn_sm" onClick={routeChange}>
                        <i className="fa fa-arrow-left mr-2"></i>Go Back
                    </button>
                </div>
                <div className="buttons" style={{textAlign:"end",padding:"36px 0px 30px 0px"}}>
                    <Link to={`/invoice-one/${OrderDetails?.id}`}><button className="theme-btn-one btn-black-overlay btn_sm">Invoice</button></Link>
                </div>
                </div>
              
                
                <div className="head_top_det">
                <div><img src={img1} alt="img" style={{marginTop:"13px"}}/></div>
                <h2 className="title">thank you</h2>
                <p>Payment Is Successfully Processsed And Your Order Is On The Way</p>
                <p>Transaction ID:{OrderDetails?.txnid}</p>
                <h2 className="title">YOUR ORDER DETAILS</h2>
                </div>
             <div className="offcanvas-add-cart-wrapper mobile_view_cart">
          <ul className="offcanvas-cart">
            {OrderDetail&& OrderDetail?.map((data, index) => (
              <li className="offcanvas-wishlist-item-single" key={index}>
                <div className="offcanvas-wishlist-item-block">
                  <Link
                    to={`/product-details-one/${data.slug}`}
                    className="offcanvas-wishlist-item-image-link"
                  >
                    <img
                      src={ImageUrl+data.photo}
                      alt="img"
                      className="offcanvas-wishlist-image"
                    />
                  </Link>
                  <div className="offcanvas-wishlist-item-content">
                    <Link
                      to={`/product-details-one/${data.slug}`}
                      className="offcanvas-wishlist-item-link"
                    >
                      {data.name}
                    </Link>
                    <div className="offcanvas-wishlist-item-details">
                      <span className="offcanvas-wishlist-item-details-quantity">
                        Quantity:{data.qty || 0}.00
                      </span>
                    </div>
                    <div className="offcanvas-wishlist-item-details">
                      <span className="offcanvas-wishlist-item-details-quantity">
                        Price:₹{data.main_price || 0}.00
                      </span>
                    </div>
                   
                    <div style={{color:"green"}}> Total: ₹{data.main_price*data.qty}</div>
                      
                  </div>
                </div>
                
              </li>
            ))}
          </ul>
          </div>
          <div className='mobile_fields'>
            <span>Products:</span>
            <span>₹{cartTotal()}</span>
            <span>Discount:</span>
            <span>₹0</span>
            <span>Gift Wripping:</span>
            <span>₹{OrderDetails?.shipping?.price || 0}</span>
            <span>Shipping:</span>
            <span>₹{OrderDetails?.shipping?.price || 0}</span>
            <span>TOTAL PAID:</span>
            <span>₹{cartTotal()+Number(OrderDetails?.shipping?.price)}</span>
          </div>


              <div className="row">
                <div className="col-lg-6">
                    <div className="myaccount-content" style={{marginBottom:"10px",padding:"15px"}}>
                        <h4 className="title"> DILIVERY ADDRESS</h4>
                     
                                                    <p
                                                    style={{ textAlign: "left", fontWeight: "normal", fontSize: "14px", color: "#000000", lineHeight: "21px", marginTop: "0" }}>
                                                    {OrderDetails?.billing_info?.bill_address1},<br /> {OrderDetails?.billing_info?.bill_city} <br />{OrderDetails?.billing_info?.bill_country},{OrderDetails?.billing_info?.bill_zip}
                                                    </p>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="myaccount-content"  style={{marginBottom:"10px",padding:"15px"}}>
                        <h4 className="title">SHIPPING ADDRESS</h4>
                           <p
                            style={{ textAlign: "left", fontWeight: "normal", fontSize: "14px", color: "#000000", lineHeight: "21px", marginTop: "0" }}>
                            {OrderDetails?.shipping_info?.ship_address1},<br /> {OrderDetails?.shipping_info?.ship_city} <br />{OrderDetails?.shipping_info?.ship_country},{OrderDetails?.shipping_info?.ship_zip}
                            </p>
                    </div>
                </div>
            </div>   

            <div className='footer_change'>
                    <a href="#!" style={{ fontSize: "13px" }}>Want to change how you receive these emails?</a>
                    <p style={{ fontSize: "13px", margin: "0" }}>2021 Copy Right by Themeforest powerd by andit_themes</p>
                    <a href="#!" style={{ fontSize: "13px", margin: "0", textDecoration: "underline" }}>Unsubscribe</a>
            </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) =>
({
    Orders: state.AllReducer.Orders || []
});
export default connect(mapStateToProps)(OrderMobile_View);
