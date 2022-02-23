import React,{useEffect,useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector,useDispatch,connect } from "react-redux";
import { Get_Shipping,CouponCode } from '../../Redux/Action/allActions'
import Alert from '@mui/material/Alert';
import Swal from 'sweetalert2'
const TotalCart = (props) => {
    let dispatch=useDispatch()
    let history=useHistory()
    const [CouponDetl,setCouponDetl]=useState()
    const [FilterData,setFilterData]=useState([])
    const [coupon,setcoupon]=useState("")
    const [couponErr,setcouponErr]=useState(false)
    const [proceed,setproceed]=useState(false)
    const [ShoopingCarts,setShoopingCarts]= useState(JSON.parse(window.localStorage.getItem("carts")))
    const cartTotal = () => {
        return ShoopingCarts.reduce(function (total, item) {
            return total + ((item.quantity || 1) * item.discount_price)
        }, 0)
    }
  
      useEffect(()=>{
        dispatch(Get_Shipping())
        dispatch(CouponCode())
      },[])
      useEffect(()=>{
        let Total=cartTotal()
        if(Total>1000){
            setFilterData(props.ShippingDetails[0])
        }else{
            setFilterData(props.ShippingDetails[1]) 
        }
      },[props.ShippingDetails,props.coupon_code])
      useEffect(()=>{
        setShoopingCarts(JSON.parse(window.localStorage.getItem("carts")))
      },[window.localStorage.getItem("carts")])
      const CheckValdeCoupon=()=>{
        var Data=props.coupon_code.filter((data)=>{
            return data.code_name===coupon
            })
            setCouponDetl(Data[0])
            if(Data.length===0){
                setcouponErr(true)
            }else{
                setcouponErr(false)  
                Swal.fire({
                    icon: 'success',
                    title: 'Valid Coupon',
                    // text: 'Welcome '+ name
                })
            }
      }
    return (
        <>
            {/* <div className="col-lg-6 col-md-6">
                <div className="coupon_code left">
                    <h3>Coupon</h3>
                    <div className="coupon_inner">
                        <p>Enter your coupon code if you have one.</p>
                        <form onSubmit={(e) =>{ e.preventDefault();  CheckValdeCoupon()}}>
                            <input className="mb-2" placeholder="Coupon code" type="text" value={coupon} required onChange={(e)=>{setcoupon(e.target.value);couponErr&&CheckValdeCoupon()}}/>
                            <button type="submit" className="theme-btn-one btn-black-overlay btn_sm">Apply coupon</button>
                            {couponErr&&<Alert severity="error">Invalid Cuppon Code!</Alert>}
                        </form>
                    </div>
                </div>
            </div> */}


                <div className="col-lg-6 col-md-6">
                    <div className="coupon_code right">
                        <h3>Cart Total</h3>
                        <div className="coupon_inner">
                            <div className="cart_subtotal">
                                <p>Subtotal</p>
                                <p className="cart_amount"> &#8377; {cartTotal()}.00</p>
                            </div>
                            {FilterData?.length!=0&&
                            <>
                            <div className="cart_subtotal ">
                                <p>Shipping</p>
                              
                                <p className="cart_amount" ><span style={{paddingBottom:"10px",color:"green"}}>{FilterData?.title}</span> &#8377; {FilterData?.price}.00</p>
                            </div>
                         
                            {/* <div style={{textAlign:"end",paddingBottom:"10px",color:"green",}}></div> */}
                            </>
                            }
                            {/* <a href="#!" onClick={ShippingCalculation}>Calculate shipping</a> */}
                         
                            <div className="cart_subtotal">
                                <p>Total</p>
                                <p className="cart_amount"> &#8377; {Number(cartTotal())+Number(FilterData?.price || 0)}.00</p>
                            </div>
                            <div className="checkout_btn">

                                <a className="theme-btn-one btn-black-overlay btn_sm">
                                    <label onClick={()=>{{history.push(`/checkout-one/${CouponDetl?.id}`)}}}>Proceed to Checkout</label>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

const mapStateToProps = (state) =>
({
    ShippingDetails: state.AllReducer.Shipping || [],
    coupon_code: state.AllReducer.coupon_code || [],
});
export default connect(mapStateToProps)(TotalCart);