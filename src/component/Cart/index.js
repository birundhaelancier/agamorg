import React,{useState,useEffect} from "react";
import Coupon from './Coupon'
import TotalCart from './TotalCart'
import { Link } from 'react-router-dom'
import img from '../../assets/img/common/empty-cart.png'
import { useDispatch, connect } from "react-redux";
import { ImageUrl } from '../../Redux/Utils/baseurl'
import { Get_Shipping } from '../../Redux/Action/allActions'
import Swal from 'sweetalert2';
const CartArea = (props) => {
    let dispatch = useDispatch();
    const [ShoopingCarts,setShoopingCarts]= useState(JSON.parse(window.localStorage.getItem("carts")))
    const [Ship_Detail,setShip_Detail]=useState()
    const [QuantityValues,setQuantityValues]=useState({})
    // Remove from Cart
    const PageReload = () => {
        setTimeout(() => {
            window.location.reload();
        }, 2000)
    }
    const rmProduct = (id) => {
        Swal.fire({
            title: 'Success!',
            text: "Product Deleted Successfully",
            icon: 'success',
            showConfirmButton: false,
            timer: 1000
          })
          let arr = ShoopingCarts.filter(item => item.id !== id)
          window.localStorage.setItem("carts",JSON.stringify(arr))
          PageReload()
        dispatch({ type: "products/removeCart", payload: { id } });
       
    }
    // Clear
    const clearCarts = () => {
        Swal.fire({
            title: 'Success!',
            text: "All Products Deleted Successfully",
            icon: 'success',
            showConfirmButton: false,
            timer: 1000
          })
        window.localStorage.removeItem("carts");
        PageReload()
    }
    // Value Update
    const cartValUpdate = (val, index,id) => {
    for (var i = 0; i < ShoopingCarts.length; i++) {
        if(id === ShoopingCarts[i].id){
            ShoopingCarts[i].quantity =val
            break; 
        }
     }
     setQuantityValues((prevState) => ({
        ...prevState,
        ["test"+index]: val,
      }));
       window.localStorage.setItem("carts",JSON.stringify(ShoopingCarts))
    }
    useEffect(()=>{
        setShoopingCarts(JSON.parse(window.localStorage.getItem("carts")))
      },[window.localStorage.getItem("carts")])
    
    return (
        <>
            {ShoopingCarts?.length
                ?
                <section id="cart_area_one" className="ptb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="table_desc">
                                    <div className="table_page table-responsive">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className="product_remove">Remove</th>
                                                    <th className="product_thumb">Image</th>
                                                    <th className="product_name">Product</th>
                                                    <th className="product-price">Price</th>
                                                    <th className="product_quantity">Quantity</th>
                                                    <th className="product_total">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {console.log(window.localStorage.getItem("carts"))}
                                                {ShoopingCarts && ShoopingCarts?.map((data, index) => (
                                                    <tr key={index}>
                                                        <td className="product_remove">
                                                            <i className="fa fa-trash text-danger" onClick={() => rmProduct(data.id)} style={{ 'cursor': 'pointer' }}></i>
                                                        </td>
                                                        <td className="product_thumb">
                                                            <Link to={`/product-details-one/${data.id}`}>
                                                                <img src={ImageUrl+data.photo} alt="img" />
                                                            </Link>
                                                        </td>
                                                        <td className="product_name">
                                                            <Link to={`/product-details-one/${data.id}`}>
                                                                {data.name}
                                                            </Link>
                                                        </td>
                                                        <td className="product-price">₹{data.discount_price}.00</td>
                                                        <td className="product_quantity">
                                                            <input min="1" max="100" type="number" onChange={e => cartValUpdate(e.target.value, index,data.id)} value={QuantityValues["test"+index] || data.quantity }/>
                                                        </td>
                                                        <td className="product_total">₹{Number(data.discount_price) * (Number(QuantityValues["test"+index] || data.quantity ))}.00</td>
                                                    </tr>
                                                ))

                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="cart_submit">
                                        {ShoopingCarts?.length
                                            ? <button className="theme-btn-one btn-black-overlay btn_sm" type="button" onClick={() => clearCarts()}>Clear cart</button>
                                            : null
                                        }

                                    </div>
                                </div>
                            </div>
                            <Coupon />
                            <TotalCart />
                        </div>
                    </div>
                </section>
                : <section id="empty_cart_area" className="ptb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                                <div className="empaty_cart_area">
                                    <img src={img} alt="img" />
                                    <h2>YOUR CART IS EMPTY</h2>
                                    <h3>Sorry Mate... No Item Found Inside Your Cart!</h3>
                                    <Link to="/" className="btn btn-black-overlay btn_sm">Continue Shopping</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

const mapStateToProps = (state) =>
({
    ShippingDetails: state.AllReducer.Shipping || []
});
export default connect(mapStateToProps)(CartArea);