import React, { useEffect, useState } from 'react'
import ProductInfo from './ProductInfo'
import RelatedProduct from './RelatedProduct'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch,connect } from "react-redux";
import { useParams } from 'react-router-dom';
import { RatingStar } from "rating-star";
import Swal from 'sweetalert2';
import { Get_Single_Product_List } from '../../../Redux/Action/allActions'
import { ImageUrl } from '../../../Redux/Utils/baseurl';
import { AddWishlist } from '../../../Redux/Action/CreateActions'
const ProductDetailsOne = (props) => {
    let dispatch = useDispatch();
    let history=useHistory()
    const [product,setProducts]=useState([])
    const [cartChange,setcartChange]=useState(false)
    const [selectpack,setselectpack]=useState(props.data?.attribute[0]?.name)
    const [filterPack,setfilterPack]=useState(props.data?.attribute[0])
    const StoreDetail=JSON.parse(localStorage.getItem("carts")) || []
    let { id } = useParams();
    const [CartsDetails, setCartsDetails] = useState(JSON.parse(localStorage.getItem("carts")) || []);
    dispatch({ type: "products/getProductById", payload: { id } });
    // let product = ""

    // Add to cart
    const addToCart = async (product) => {
       

        var Id =StoreDetail&&StoreDetail.find((cart)=>{
             return cart?.id===product?.id
        })
        if(Id!=null  || Id!=undefined || product?.id===Id?.id){
            history.push("/cart")
        }else{
           PageReload()
           let items=[...CartsDetails]
           items.push({
               id:product.id,
               discount_price:filterPack?.selling || (product.discount_price),
               previous_price:filterPack?.price || (product.previous_price),
               name:product.name,
               photo:product.photo,
               quantity:count,
               pack:selectpack,
               slug:product.slug,
               attributeId:filterPack?.id
           })
           setCartsDetails(items);
           
           Swal.fire('Success', "Successfully added to your Cart", 'success') 
        }
        
        
        // window.location.reload()
    }
    const PageReload = () => {
        setTimeout(() => {
            window.location.reload();
        }, 2000)
    }
    // Add to Favorite
    const addToFav = async (id) => {
        dispatch({ type: "products/addToFav", payload: { id } })
        var Data=props?.WishList?.filter((item)=>{
            return item?.id===id
        })
        if(JSON.parse(localStorage.getItem("UserId"))){
           if(Data[0]?.id===id){Swal.fire('Failed', "Already Added in Wishlist", 'warning')}
           else{ dispatch(AddWishlist(id)) }
         }
        else{
        Swal.fire('Failed', "Please Login then Added in Your Wishlist", 'warning')
        }
    }

    // Add to Compare
    const addToComp = async (id) => {
        dispatch({ type: "products/addToComp", payload: { id } })
    }

    const colorSwatch = (i) => {
        let data = product.color.find(item => item.color === i)
        setImg(data.img)
    }

    const [count, setCount] = useState(1)

    const [img, setImg] = useState(product.img)

    const incNum = () => {
        setCount(count + 1)
    }
    const decNum = () => {
        if (count > 1) {
            setCount(count - 1)
        } else {
            Swal.fire('Sorry!', "Minimun Quantity Reached",'warning')
            setCount(1)
        }
    }
    useEffect(()=>{
      dispatch(Get_Single_Product_List(id))
    },[id])
    useEffect(()=>{
        setProducts(props.SingleProduct)
    },[props.SingleProduct,props?.WishList])
 useEffect(()=>{
    window.localStorage.setItem("carts",JSON.stringify(CartsDetails))
 },[CartsDetails])
 useEffect(()=>{
    var Id =StoreDetail&&StoreDetail.find((cart)=>{
        return cart?.id===product?.id
   })
   if(Id!=null  || Id!=undefined || product?.id===Id?.id){
       setcartChange(true)
   }else{
    setcartChange(false) 
   }
 },[StoreDetail])

 const ChangeAttribute=(data)=>{
    setselectpack(data)
    // FilterData(data)
 }
    return (
        <>{product
            ?
            <section id="product_single_one" className="ptb-100">
                <div className="container">
                    <div className="row area_boxed">
                        <div className="col-lg-4">
                            <div className="product_single_one_img">
                                <img src={ImageUrl+product.photo} alt="img" />
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="product_details_right_one">
                                <div className="modal_product_content_one">
                                    <h3>{product.name}</h3>
                                    {/* <div className="reviews_rating">
                                        <RatingStar maxScore={5} rating={product.rating.rate} id="rating-star-common" />
                                        <span>({product.rating.count} Customer Reviews)</span>
                                    </div> */}
                                    <h4>₹{product.discount_price}.00 <del>₹{parseInt(product.previous_price)}.00</del> </h4>
                                    <p>{product.sort_details}</p>
                                    {product?.attribute?.length>0&&<div className="customs_selects">
                                        <select name="product" className="customs_sel_box" onChange={(e)=>ChangeAttribute(e.target.value)} value={selectpack}>
                                        {product.attribute.map((data)=>{
                                           return(
                                             <option value={data.name}>{data.name} - ₹{data.price}</option>
                                           )})}
                                        </select>
                                    </div>}
                                   
                                    <form id="product_count_form_two">
                                        <div className="product_count_one">
                                            <div className="plus-minus-input">
                                                <div className="input-group-button">
                                                    <button type="button" className="button" onClick={decNum}>
                                                        <i className="fa fa-minus"></i>
                                                    </button>
                                                </div>
                                                <input className="form-control" type="number" value={count} readOnly />
                                                <div className="input-group-button">
                                                    <button type="button" className="button" onClick={incNum}>
                                                        <i className="fa fa-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="links_Product_areas">
                                        <ul>
                                            <li>
                                                <a href="#!" className="action wishlist" title="Wishlist" onClick={() => addToFav(product.id)}><i
                                                    className="fa fa-heart"></i>Add To Wishlist</a>
                                            </li>
                                            {/* <li>
                                                <a href="#!" className="action compare" onClick={() => addToComp(product.id)} title="Compare"><i
                                                    className="fa fa-exchange"></i>Add To Compare</a>
                                            </li> */}
                                        </ul>
                                        <a href="#!" className="theme-btn-one btn-black-overlay btn_sm" onClick={() => addToCart(product)}>{cartChange?"Go To Cart":"Add To Cart"}</a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <ProductInfo  Details={product}/>
                </div>
            </section>
            :
            <div className="container ptb-100">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                        <div className="empaty_cart_area">
                            <img src={img} alt="img" />
                            <h2 style={{color:"#333"}}>PRODUCT NOT FOUND</h2>
                            <h3>Sorry Mate... No Item Found according to Your query!</h3>
                            <Link to="/shop" className="btn btn-black-overlay btn_sm">Continue Shopping</Link>
                        </div>
                    </div>
                </div>
            </div>
        }

            {/* <RelatedProduct /> */}
        </>
    )
}

const mapStateToProps = (state) =>
({
    SingleProduct: state.AllReducer.SingleProduct || [],
    WishList: state.AllReducer.WishList || [],
});
export default connect(mapStateToProps)(ProductDetailsOne);
