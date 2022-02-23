import React,{useState,useEffect} from 'react'
import { connect, useDispatch } from 'react-redux'
import { Get_Shipping } from '../../Redux/Action/allActions'
const YourOrders = (props) => {
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
      console.log(FilterData)
    return (
        <>
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
export default connect(mapStateToProps)(YourOrders);