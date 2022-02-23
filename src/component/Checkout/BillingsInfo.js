import React,{useState,useEffect} from 'react'
import { connect, useDispatch } from 'react-redux'
import { Get_Shipping } from '../../Redux/Action/allActions'
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom';
const BillingsInfo = (props) => {
    let { id } =useParams()
    let dispatch=useDispatch()
    const ShoopingCarts= JSON.parse(localStorage.getItem("carts"))
    const [FilterData,setFilterData]=useState([])
    const cartTotal = () => {
        return ShoopingCarts?.reduce(function (total, item) {
          return total + item.discount_price*item.quantity;
        }, 0);
      };
      useEffect(()=>{
        dispatch(Get_Shipping())
      },[])
      useEffect(()=>{
        let Total=cartTotal()
        if(Total>1000){
            setFilterData(props.ShippingDetails[0])
        }else{
            setFilterData(props.ShippingDetails[1]) 
        }
     
      },[props.ShippingDetails]) 

    return (
        <>
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="checkout-area-bg bg-white">
                    <div className="check-heading">
                        <h3>Billing Information</h3>
                    </div>
                    <div className="check-out-form">
                        <form method="post">
                            <div className="row">
                                <div className="col-lg-6 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="fname">First name<span className="text-danger">*</span> </label>
                                        <input type="text" required="" className="form-control" id="fname"
                                            placeholder="First name" />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="lname">Last name<span className="text-danger">*</span></label>
                                        <input type="text" required="" className="form-control" id="lname"
                                            placeholder="Last name" />
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="cname">Mobile No.<span className="text-danger">*</span></label>
                                        <input className="form-control" required="" type="number" id="cname"
                                            placeholder="Mobile No." />
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="email">Email Addresse<span className="text-danger">*</span></label>
                                        <input className="form-control" required="" type="email" id="email"
                                            placeholder="elancier@gmail.com" />
                                    </div>
                                </div>
                             
                                <div className="col-lg-6 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="city">City<span className="text-danger">*</span></label>
                                        <select className="form-control first_null" id="city">
                                            <option defaultValue="">Select an option...</option>
                                            <option defaultValue="AX">Madurai</option>
                                            <option defaultValue="AF">Mayiladuthurai</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="zip">Pincode<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" id="zip" required=""
                                            placeholder="Enter Your pincode" />
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="faddress">Full Address<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" id="faddress" required=""
                                            placeholder="Enter your address here.." />
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="messages">Additional Notes<span className="text-danger">*</span></label>
                                        <textarea rows="5" className="form-control" id="messages"
                                            placeholder="Order notes"></textarea>
                                    </div>
                                </div>
                             
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            <div className="order_review  box-shadow bg-white">
                <div className="check-heading">
                    <h3>Your Orders</h3>
                </div>
                <div className="table-responsive order_table">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                   
                        <tbody>
                        {ShoopingCarts.map((data)=>{
                            return(
                            <tr>
                                <td>{data.name} <span className="product-qty">x {data.quantity || 1}</span>
                                {/* <td>₹{data.pack}</td> */}

                                </td>
                                <td>₹{data.discount_price}.00</td>
                            </tr>
                        )})}
                        </tbody>
                      
                        <tfoot>
                            <tr>
                                <th>SubTotal</th>
                                <td className="product-subtotal">₹{cartTotal()}.00</td>
                            </tr>
                            <tr>
                                <th>Delivery Charges</th>
                                <td>{FilterData?.title==="Delivery"?"₹"+FilterData?.price+".00":FilterData?.title}</td>
                            </tr>
                            <tr>
                                <th>Total</th>
                                <td className="product-subtotal">₹{Number(cartTotal())+Number(FilterData?.price || 0)}.00</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </>
    )
}


const mapStateToProps = (state) =>
({
    ShippingDetails: state.AllReducer.Shipping || []
});
export default connect(mapStateToProps)(BillingsInfo);