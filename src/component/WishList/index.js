import React, { useEffect,useState } from "react";
import { Link, useHistory } from 'react-router-dom'

import { useDispatch,connect, useSelector } from "react-redux";
import img from '../../assets/img/common/empty-cart.png'
import { Get_Wishlist } from '../../Redux/Action/allActions'
import { DeleteWishlist } from '../../Redux/Action/CreateActions'
import { ImageUrl } from '../../Redux/Utils/baseurl'
import Swal from "sweetalert2";
import { notification } from "antd";
const Wishlist = (props) => {
    let dispatch = useDispatch();
    let history=useHistory()
    const [WishListData,setWishListData]=useState([])
    const [CartsDetails, setCartsDetails] = useState(JSON.parse(localStorage.getItem("carts")) || []);
    // let favorites = useSelector((state) => state.products.favorites);
    
    const rmProduct = (id) => {
        dispatch(DeleteWishlist(id));
    }
    const PageReload = () => {
        setTimeout(() => {
            window.location.reload();
        }, 2000)
    }

    // Add to cart
    const addToCart = async (product) => {
        // dispatch({ type: "products/addToCart", payload: { id } })
        // dispatch({ type: "products/removeFav", payload: { id } });
        // dispatch(DeleteWishlist(id));
        let items=[...CartsDetails]
        items.push(product)
        setCartsDetails(items);
        notification.success({message:"Successfully added to your Cart"}) 
        PageReload()
        var Id =CartsDetails&&CartsDetails.find((cart)=>{
            return cart?.id===product?.id
        })
//   let arr = ShoopingCarts?.filter(item => item.id !== id)
//   window.localStorage.setItem("carts",JSON.stringify(arr))

        if(product?.id===Id?.id || Id!==undefined){
           history.push("/cart")
        }else{
      
       }
       dispatch(DeleteWishlist(product.id,"addcart"))
      
    }
    useEffect(()=>{
     dispatch(Get_Wishlist())
    },[])
    useEffect(()=>{
        var Data=props.WishList.filter((data)=>{
            return data!==null
        })
        setWishListData(Data)
    },[props.WishList])

    useEffect(()=>{
        window.localStorage.setItem("carts",JSON.stringify(CartsDetails))
     },[CartsDetails])
    return (
        <>
          {WishListData?.length
                                                ?
            <section id="Wishlist_area" className="ptb-100 wish_list_view"  >
                <div className="container">
                    <div className="row">
                        <div className="col-12 desktop_view_cart">
                            <div className="table_desc">
                                <div className="table_page table-responsive">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="product_remove">Remove</th>
                                                <th className="product_thumb">Image</th>
                                                <th className="product_name">Product</th>
                                                <th className="product-price">Price</th>
                                                {/* <th className="product_stock">Stock Status</th> */}
                                                {/* <th className="product_addcart">Add To Cart</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                          {WishListData.map((data, index)=>(
                                                    <tr key={index}>
                                                        <td className="product_remove">
                                                            <i className="fa fa-trash text-danger" onClick={() => rmProduct(data.id)} style={{'cursor':'pointer'}}></i>
                                                        </td>
                                                        <td className="product_thumb">
                                                        <Link to={ `/product-details-one/${data.slug}`}>
                                                                <img src={ImageUrl+data.photo} alt="img" />
                                                        </Link>
                                                        </td>
                                                        <td className="product_name">
                                                        <Link to={ `/product-details-one/${data.slug}`}>
                                                            {data.name}
                                                        </Link>
                                                        </td>
                                                        <td className="product-price">₹{data.discount_price}.00</td>
                                                        {/* <td className="product_stock"><h6>{data.stock}</h6></td> */}
                                                        {/* <td className="product_addcart">
                                                            <button type="button" className="theme-btn-one btn-black-overlay btn_sm" onClick={() => addToCart(data)}>Add to cart</button>
                                                        </td> */}
                                                    </tr> 
                                                ))}                                  
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                 
                <> <div className="offcanvas-add-cart-wrapper mobile_view_cart">
          {/* <h4 className="offcanvas-title">Shopping Cart</h4> */}
          <ul className="offcanvas-cart">
            {WishListData&& WishListData?.map((data, index) => (
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
                        Price:₹{data.discount_price || 0}.00
                      </span>
                    </div>
                    {/* <div style={{color:"green"}}> Stock:{data.stock || 0}</div> */}
                       {/* <td className="product_stock"><h6>{data.stock}</h6></td> */}
                    {/* <div style={{color:"green"}}> ₹{Number(data.discount_price)*Number(data.quantity)}</div> */}
                  </div>
                </div>
                <div className="offcanvas-wishlist-item-delete text-right">
                  <a
                    href="#!"
                    className="offcanvas-wishlist-item-delete"
                    onClick={() => rmProduct(data.id)}
                  >
                    <i className="fa fa-trash"></i>
                  </a>
                </div>
              </li>
            ))}
          </ul>
          </div>
          </>
          </div>
        </div>
            </section>
      

            :         <section id="empty_cart_area" className="ptb-100">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                        <div className="empaty_cart_area">
                            <img src={img} alt="img" />
                            <h2>YOUR WISHLIST IS EMPTY</h2>
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
    WishList: state.AllReducer.WishList || []
});
export default connect(mapStateToProps)(Wishlist);