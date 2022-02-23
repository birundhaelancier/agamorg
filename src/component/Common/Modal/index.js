import React, { useState,useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from "react-redux";
import { RatingStar } from "rating-star";
import { useHistory } from 'react-router-dom'
import Swal from "sweetalert2";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, TelegramShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, LinkedinIcon, TelegramIcon, WhatsappIcon } from "react-share";

const MyVerticallyCenteredModal = (props) => {
    let dispatch = useDispatch();
    let history=useHistory()
    const [cartChange,setcartChange]=useState(false)
    const [qtyValue,setqtyValue]=useState(1)
    const [selectpack,setselectpack]=useState(props.data?.attribute[0]?.name)
    const [filterPack,setfilterPack]=useState(props.data?.attribute[0])
    const [CartsDetails, setCartsDetails] = useState(JSON.parse(localStorage.getItem("carts")) || []);
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

    const PageReload = () => {
        setTimeout(() => {
            window.location.reload();
        }, 2000)
    }
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
               props.onHide()
       }
    }
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
     useEffect(()=>{
        window.localStorage.setItem("carts",JSON.stringify(CartsDetails))
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
    return (
        <>
            <Modal {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Body>
                    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                        <div className="product_one_modal_top modal-content">
                            <button type="button" className="close close_modal_icon" onClick={props.onHide} >
                                <span aria-hidden="true"><i className="fa fa-times"></i></span>
                            </button>
                            <div id="product_slider_one">
                                <div className="row">
                                    <div className="col-lg-5 col-md-6 col-sm-12 col-12">
                                        <div className="products_modal_sliders">
                                            <img src={"https://elancier.in/agam/assets/images/"+props.data?.photo} alt="img" />
                                        </div>
                                    </div>
                                    <div className="col-lg-7 col-md-6 col-sm-12 col-12">
                                        <div className="modal_product_content_one">
                                            <h3>{props.data.name}</h3>
                                            {/* <div className="reviews_rating">
                                                <RatingStar maxScore={5} rating={props.data.discount_price} id="rating-star-modal" />
                                                <span>({props.data.discount_price} Customer Reviews)</span>
                                            </div> */}
                                            <h4>₹{filterPack?filterPack.selling:props.data.discount_price}.00 <del style={{fontWeight: 400, color: 'gray'}}>${parseInt(filterPack?filterPack.price:props.data.previous_price)}.00</del> </h4>
                                            <p>{props.data.description}</p>
                                            {props.data.attribute.length>0&&
                                            <div className="customs_selects" >
                                        <select name="product" className="customs_sel_box product_card_select" style={{minHeight:"30px"}} onChange={(e)=>ChangeAttribute(e.target.value)} value={selectpack}>
                                         {props.data.attribute.map((data)=>{
                                             return(
                                               <option value={data.name}>{data.name} - ₹{data.price}</option>
                                              )})}
                                         </select>
                                          </div>}
                                            {/* <div className="variable-single-item">
                                                <span>Color</span>
                                                <div className="product-variable-color">
                                                    <label htmlFor="modal-product-color-red">
                                                        <input name="modal-product-color" id="modal-product-color-red"
                                                            className="color-select" type="radio" defaultChecked/>
                                                        <span className="product-color-red"></span>
                                                    </label>

                                                    <label htmlFor="modal-product-color-green">
                                                        <input name="modal-product-color" id="modal-product-color-green"
                                                            className="color-select" type="radio" />
                                                        <span className="product-color-green"></span>
                                                    </label>

                                                    <label htmlFor="modal-product-color-blue">
                                                        <input name="modal-product-color" id="modal-product-color-blue"
                                                            className="color-select" type="radio" />
                                                        <span className="product-color-blue"></span>
                                                    </label>
                                                </div>
                                            </div> */}
                                            <form id="product_count_form_one">
                                                <div className="product_count_one">
                                                    <div className="plus-minus-input">
                                                        <div className="input-group-button">
                                                            <button type="button" className="button" onClick={decNum}>
                                                                <i className="fa fa-minus" aria-hidden="true"></i>
                                                            </button>
                                                        </div>
                                                        <input className="form-control" type="number" name="quantity" value={count}/>
                                                        <div className="input-group-button">
                                                            <button type="button" className="button" onClick={incNum}>
                                                                <i className="fa fa-plus" aria-hidden="true"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <a href="#!" className="theme-btn-one btn-black-overlay btn_sm" onClick={() => addToCart(props.data)}>{!cartChange?"Add To Cart":"Go To Cart"}</a>
                                                </div>
                                            </form>
                                            <div className="modal_share_icons_one">
                                                <h4>SHARE THIS PRODUCT</h4>
                                                <div className="posted_icons_one">
                                                    <FacebookShareButton url={"https://themeforest.net/item/andshop-ecommerce-react-js-template/33822003"} quote={"Best React.js ecommerce Templete"}>
                                                        <FacebookIcon size={32} round />
                                                    </FacebookShareButton>
                                                    <TwitterShareButton url={"https://themeforest.net/item/andshop-ecommerce-react-js-template/33822003"} title={"Best React.js ecommerce Templete"}>
                                                        <TwitterIcon size={32} round />
                                                    </TwitterShareButton>
                                                    <LinkedinShareButton url={"https://themeforest.net/item/andshop-ecommerce-react-js-template/33822003"} title={"Best React.js ecommerce Templete"}>
                                                        <LinkedinIcon size={32} round />
                                                    </LinkedinShareButton>
                                                    <TelegramShareButton url={"https://themeforest.net/item/andshop-ecommerce-react-js-template/33822003"} title={"Best React.js ecommerce Templete"}>
                                                        <TelegramIcon size={32} round />
                                                    </TelegramShareButton>
                                                    <WhatsappShareButton url={"https://themeforest.net/item/andshop-ecommerce-react-js-template/33822003"} title={"Best React.js ecommerce Templete"}>
                                                        <WhatsappIcon size={32} round />
                                                    </WhatsappShareButton>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default MyVerticallyCenteredModal