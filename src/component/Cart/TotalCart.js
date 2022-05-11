import React,{useEffect,useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector,useDispatch,connect } from "react-redux";
import { Get_Shipping,CouponCode } from '../../Redux/Action/allActions'
import NewsletterModal from '../../component/Common/NewModel'
import Alert from '@mui/material/Alert';
import Swal from 'sweetalert2'
import { notification } from 'antd';
const TotalCart = (props) => {
    let dispatch=useDispatch()
    let history=useHistory()
    const [CouponDetl,setCouponDetl]=useState()
    const [FilterData,setFilterData]=useState([])
    const [coupon,setcoupon]=useState("")
    const [couponErr,setcouponErr]=useState(false)
    const [proceed,setproceed]=useState(false)
    const [login,setlogin]=useState(false)
    const [flag,setflag]=useState(0)
    const [TotalCarts,setTotalCarts]=useState(localStorage.getItem('Total'))
    const [ShoopingCarts,setShoopingCarts]= useState(JSON.parse(localStorage.getItem('carts')))
    const cartTotal = () => {
        return ShoopingCarts?.reduce(function (total, item) {
            return total + ((Number(item.quantity) || 1) * item.discount_price)
        }, 0)
    }
    const FliterProduct=()=>{
        ShoopingCarts.filter((data)=>{
           if(data.flag===0){
            setflag(0)
           }else if(data.flag===2){
               setflag(2)   
            }else{
                setflag(1) 
            }
        })
      }
      useEffect(()=>{
        dispatch(Get_Shipping())
        dispatch(CouponCode())
        FliterProduct()
      },[])
      useEffect(()=>{
        let Total=cartTotal()
        if(Total>1000){
            setFilterData(props.ShippingDetails[0])
        }else{
            setFilterData(props.ShippingDetails[1]) 
        }
      },[props.ShippingDetails,props.coupon_code,ShoopingCarts])

      const Proceed=()=>{
        if(JSON.parse(localStorage.getItem("UserId"))){
          history.push(`/checkout-one`)
        }else{
            setlogin(true)
        }
      }

       useEffect(() => {
        setShoopingCarts(JSON.parse(localStorage.getItem('carts')))  
        setTotalCarts(localStorage.getItem('Total'))
        },[props.QuantityValues,props.Premium])
    return (
        <>
         


                <div className="col-lg-6 col-md-6">
                    <div className="coupon_code right">
                        <h3>Cart Total</h3>
                        <div className="coupon_inner">
                        {flag!=2?<div className="cart_subtotal">
                                <p>Subtotal</p>
                                <p className="cart_amount"> <i class="fa fa-inr"></i> {flag==1?Number(localStorage.getItem("Total")):cartTotal()}.00</p>
                            </div>:""}
                            {FilterData?.length!=0&&
                            <>
                            {flag!=2?<div className="cart_subtotal ">
                                <p>Delivery Charge</p>
                              
                                <p className="cart_amount" > <i class="fa fa-inr"></i> {FilterData?.price}.00</p>
                            </div>:""}
                         
                            {/* <div style={{textAlign:"end",paddingBottom:"10px",color:"green",}}></div> */}
                            </>
                            }
                            {/* <a href="#!" onClick={ShippingCalculation}>Calculate shipping</a> */}
                         
                            <div className="cart_subtotal">
                                <p>Total</p>
                                <p className="cart_amount"><i class="fa fa-inr"></i> {Number(flag!==2?FilterData?.price:0)+Number(flag===1?Number(localStorage.getItem("Total")):cartTotal())}.00</p>
                            </div>
                            <div className="checkout_btn">

                                <a className="theme-btn-one btn-black-overlay btn_sm">
                                    <label onClick={Proceed}>Proceed to Checkout</label>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <NewsletterModal show={login} stop={()=>setlogin(false)} start={()=>setlogin(false)} />
        </>
    )
}

const mapStateToProps = (state) =>
({
    ShippingDetails: state.AllReducer.Shipping || [],
    coupon_code: state.AllReducer.coupon_code || [],
});
export default connect(mapStateToProps)(TotalCart);