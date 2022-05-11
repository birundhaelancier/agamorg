import React,{useEffect,useState,useRef} from 'react'
import { useHistory, useParams,Link } from 'react-router-dom'
// import img
import img1 from '../../assets/img/invoice/invoice.svg'
import logo from '../../assets/img/agamlogo.png'
import sign from '../../assets/img/invoice/sign.png'
import { UserOrders } from '../../Redux/Action/allActions'
import { ImageUrl } from '../../Redux/Utils/baseurl'
import { connect,useDispatch } from 'react-redux'
import ReactToPrint from "react-to-print";
import moment from 'moment'
const InvoiceOnes = (props) => {
  const componentRef = useRef();
  const history = useHistory();
  let { id } =useParams()
  let dispatch=useDispatch()
  const routeChange = () => {
    history.goBack()
  };
  const [OrderDetails,setOrderDetails]=useState([])
  useEffect(()=>{
    dispatch(UserOrders())
  },[])
  useEffect(()=>{
    props.Orders.filter((data)=>{
     if(data.id===Number(id)){
      setOrderDetails(data)
     }
    })

  },[props.Orders,id])
  const  Billing =OrderDetails?.billing_info
  const OrderDetail=Object.values(OrderDetails?.cart || "") || OrderDetails.cart
  const cartTotal = () => {
    return OrderDetail.reduce(function (total, item) {
        return total + ((item.qty || 1) * item.main_price)
    }, 0)
}

  return (
   
    <>
      <section className="theme-invoice-1 pb-100">
        <div className="container">
          <div className="row" ref={componentRef}>
            <div className="col-xl-8 m-auto">
              <div className="back_btn_emial">
                <button className="theme-btn-one btn-black-overlay btn_sm" onClick={routeChange}>
                  <i className="fa fa-arrow-left mr-2"></i>Go Back
                </button>
              </div>
              <div className="invoice-wrapper">
                <div className="invoice-header">
                  <div className="upper-icon">
                    <img src={img1} className="img-fluid" alt="svg" />
                    
                  </div>
                  <div className="row header-content" >
                    <div className="col-md-6">
                      <div className="footerLogo">
                        <img src={logo} alt="logo" className='agalogoImageFooter' />
                        <div className='footerlogoTitle'>
                          <div className='agamTitle'>Agam</div>
                          <div className='organicTitle'>org</div>
                        </div>
                      </div>
                      {/* <img src={logo} className="img-fluid" alt="logo" /> */}
                      <div className="mt-md-4 mt-3">
                        <h4 className="mb-2">
                        {/* Agamorg Demo Store india - 363512 */}
                        31, MARUTHUPANDIYAR 1ST STREET, <br/>ANANDHA NAGAR,
                                     P&T NAGAR EXTENSION,<br/>
                                     MADURAI- 625017<br/>
                        </h4>
                        <a className="mb-0" href="https://agamorg.com/#/">info@agamorg.com</a>
                      </div>
                    </div>
                    <div className="col-md-6 text-md-right mt-md-0 mt-4">
                      <h2>invoice</h2>
                      <div className="mt-md-4 mt-3">
                        <h4 className="mb-2">
                          Customer Address : <br/> {Billing?.bill_address1}
                        </h4>
                        <h4 className="mb-0">{Billing?.bill_city}, {Billing?.bill_zip}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="detail-bottom">
                    <ul>
                      <li><span>date :</span><h4> {moment(OrderDetails?.created_at).format("DD MMMM , YYYY")}</h4></li>
                      <li><span>Transaction no :</span><h4> {OrderDetails?.transaction_number}</h4></li>
                      <li><span>email :</span><h4>{Billing?.bill_email}</h4></li>
                    </ul>
                  </div>
                </div>
                <div className="invoice-body table-responsive-md">
                <div>
                  <table className="table table-borderless mb-0 mbl" >
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Products</th>
                        <th scope="col">price</th>
                        <th scope="col">Qty</th>
                        <th scope="col">total</th>
                      </tr>
                    </thead>
             {OrderDetail.map((data,index)=>{
               console.log(data,"lllllllllll")
                     return(
                    <tbody>
                      <tr>
                        <th scope="row">{index+1}</th>
                        <td>{data.name}</td>
                        <td>₹{data.main_price}</td>
                        <td>{data.qty}</td>
                        <td>₹{data.main_price*data.qty}</td>
                      </tr>
                   
                    </tbody>
                    )})}      

                    <tfoot>
                    <tr>
                        <td colSpan="3"></td>
                        <td className="font-bold text-dark" colSpan="1">SUB TOTAL</td>
                        <td className="font-bold text-theme">₹{cartTotal()}.00</td>
                      </tr>
                      {OrderDetails?.discount!=="[]" &&<tr>
                        <td colSpan="3"></td>
                        <td className="font-bold text-dark" colSpan="1">Discount</td>
                        <td className="font-bold text-theme">₹{OrderDetails?.discount}.00</td>
                      </tr>}
                      <tr>
                        <td colSpan="3"></td>
                        <td className="font-bold text-dark" colSpan="1">Delivery Charge</td>
                        <td className="font-bold text-theme">₹{OrderDetails?.shipping?.price}.00</td>
                      </tr>
                      <tr>
                        <td colSpan="3"></td>
                        <td className="font-bold text-dark" colSpan="1">GRAND TOTAL</td>
                        <td className="font-bold text-theme">₹{cartTotal()}.00</td>
                      </tr>
                    </tfoot>
                  </table>
                  
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
                </div>
                <div className="invoice-footer text-right">
               
                  <div className="buttons">
                  <ReactToPrint
          trigger={() =>  <button className="theme-btn-one btn-black-overlay btn_sm ml-2">print</button>}
          content={() => componentRef.current}
        />
        {/* <ComponentToPrint  /> */}
                    {/* <button className="theme-btn-one btn-black-overlay btn_sm">export as PDF</button> */}
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const mapStateToProps = (state) =>
({
    Orders: state.AllReducer.Orders || []
});
export default connect(mapStateToProps)(InvoiceOnes);
