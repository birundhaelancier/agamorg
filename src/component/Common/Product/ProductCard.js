import React, { useState,useEffect } from 'react'
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineExpand } from 'react-icons/ai';
import { FaExchangeAlt } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch,connect } from "react-redux";
import MyVerticallyCenteredModal from '../../Common/Modal';
import logo from "../../../assets/img/agamlogo.png";
import { AddWishlist } from '../../../Redux/Action/CreateActions'
import Swal from "sweetalert2";
const ProductCard = (props) => {
    let history=useHistory()
    const [storeDetail,setstoreDeatil]=useState([])
    const [cartChange,setcartChange]=useState(false)
    const [qtyValue,setqtyValue]=useState(1)
    const [selectpack,setselectpack]=useState(props.data?.attribute[0]?.name)
    const [filterPack,setfilterPack]=useState(props.data?.attribute[0])
    const [CartsDetails, setCartsDetails] = useState(JSON.parse(localStorage.getItem("carts")) || []);
    let dispatch = useDispatch();
    // Add to cart
    const addToCart = (product) => {
        var Id =CartsDetails&&CartsDetails.find((cart)=>{
            return cart?.id===product?.id
        })
       if(product?.id===Id?.id || Id!==undefined){
           history.push("/cart")
       }else{
        let items=[...CartsDetails]
        items.push({
            id:product.id,
            discount_price:filterPack?.selling || product.discount_price,
            previous_price:filterPack?.price || product.previous_price,
            name:product.name,
            photo:product.photo,
            quantity:qtyValue,
            pack:selectpack,
            slug:product.slug,
            attributeId:filterPack?.id
        })
        setCartsDetails(items);
        PageReload()
           Swal.fire('Success', "Successfully added to your Cart", 'success') 
       }
    }
    const PageReload = () => {
        setTimeout(() => {
            window.location.reload();
        }, 2000)
    }
    // Add to Favorite
    const addToFav = async (id) => {
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
 
    const [modalShow, setModalShow] = useState(false);
      useEffect(()=>{
        window.localStorage.setItem("carts",JSON.stringify(CartsDetails))
     },[CartsDetails])
     useEffect(()=>{
        setstoreDeatil(CartsDetails)  
     },[CartsDetails])
     
     useEffect(()=>{
        var Id =CartsDetails&&CartsDetails.find((cart)=>{
            return cart?.id===props.data?.id
       })
       if(Id!=null  || Id!=undefined || props.data?.id===Id?.id){
           setcartChange(true)
         }else{
         setcartChange(false) 
        }
     },[CartsDetails])
     const ChangeAttribute=(data)=>{
        setselectpack(data)
        FilterData(data)
     }
     const FilterData=(value)=>{
        var Data=props.data.attribute.filter((data)=>{
            return(data.name===value)
            })
        setfilterPack(Data[0])
     }
     const OnChangeQty=(data,id)=>{
        setqtyValue(data)
     }
     console.log(selectpack,filterPack,"fghj")
     const [count, setCount] = useState(1)

     const incNum = () => {
         console.log(1);
         setCount(count + 1)
     }
     const decNum = () => {
         console.log(2);
         if (count > 1) {
             setCount(count - 1)
         } else {
             alert("Sorry, Limit Reached")
             setCount(1)
         }
     }
    return (
        <>
            <div className="product_wrappers_one">
                <div className="thumb">
                    <Link to={`/product-details-one/${props.data.slug}`} className="image">
                        <img src={"https://elancier.in/agam/assets/images/"+props.data.photo} alt="Product" />
                        <img className="hover-image" src={"https://elancier.in/agam/assets/images/"+props.data.photo}
                            alt="Product" />
                    </Link>
                    <span className="badges">
                        <span className={(['hot','new','sale'][Math.round(Math.random()*2)])}>{props.data.slug}</span>
                    </span>
                    <div className="actions">
                        <a href="#!" className="action wishlist" title="Wishlist" onClick={() => addToFav(props.data.id)}><AiOutlineHeart /></a>
                        <a href="#!" className="action quickview" title="Quick view" onClick={() => setModalShow(true)}><AiOutlineExpand /></a>
                        {/* <a href="#!" className="action compare" title="Compare" onClick={() => addToComp(props.data.id)}><FaExchangeAlt /></a> */}
                    </div>
                    {/* {cartChange&& props.data.id &&<button type="button" className="add-to-cart offcanvas-toggle" onClick={() => addToCart(props.data.id)}>Go To Cart</button>} */}
                </div>
                <div className="content">
               
                    <h5 className="title">
                        <Link to={`/product-details-one/${props.data.slug}`}>{props.data.name}</Link>
                    </h5>
                    <span className="price">
                        <span className="new">₹{filterPack?filterPack.selling:props.data.discount_price}.00</span><del style={{paddingLeft:"5px",color:"green"}}>₹{filterPack?filterPack.price:props.data.previous_price}.00</del>
                    </span>
                
                    <div className='add_cart_qty' style={{justifyContent:"center"}}>
                    {!cartChange? <input min="1" max="100" type="number" style={{width:"30%",minHeight:"30px",padding:"0px 0px 0px 10px"}} onChange={(e)=>OnChangeQty(e.target.value)} value={qtyValue}/>:
                    <form id="product_count_form_two" style={{paddingTop:"0px"}}>
                                        <div className="product_count_one">
                                            <div className="plus-minus-input" style={{justifyContent:"center",alignItems:"center"}}>
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
}
                    {props.data.attribute.length>0 && !cartChange?  
                <div className="customs_selects" style={{padding:"8px",width:"65%"}}>
                        <select name="product" className="customs_sel_box product_card_select" style={{minHeight:"30px"}} onChange={(e)=>ChangeAttribute(e.target.value)} value={selectpack}>
                            {props.data.attribute.map((data)=>{
                                return(
                                <option value={data.name}>{data.name} - ₹{data.price}</option>
                                )})}
                        </select>
                </div>
                :null
                }
                    </div>
                    <button type="button" className="add-to-cart offcanvas-toggle custom_btn qty_btn" onClick={()=>addToCart(props.data)}>{ !cartChange?"Add to cart":"Go to cart"}</button>

                </div>
            </div>

            <MyVerticallyCenteredModal data={props.data} show={modalShow} onHide={() => setModalShow(false)} />
        </>
    )
}

const mapStateToProps = (state) =>
({
    WishList: state.AllReducer.WishList || [],
});
export default connect(mapStateToProps)(ProductCard);