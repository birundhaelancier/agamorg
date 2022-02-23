import React,{useEffect,useState} from 'react'
import { useHistory, useParams } from 'react-router-dom'
// import img
import img1 from '../../assets/img/invoice/invoice.svg'
import logo from '../../assets/img/agamlogo.png'
import sign from '../../assets/img/invoice/sign.png'
import { UserOrders } from '../../Redux/Action/allActions'
import { connect,useDispatch } from 'react-redux'
import moment from 'moment'
const InvoiceOnes = (props) => {
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
  console.log(OrderDetail,"hjfg")
  const cartTotal = () => {
    return OrderDetail.reduce(function (total, item) {
        return total + ((item.qty || 1) * item.main_price)
    }, 0)
}
  return (
   
    <>
      <section className="theme-invoice-1 pb-100">
        <div className="container">
          <div className="row">
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
                    {/* <div className='footerlogoTitle'>
                      <div className='agamTitle'>Agam</div>
                      <div className='organicTitle'>Org</div>
                    </div> */}
                  </div>
                  <div className="row header-content">
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
                        Agamorg Demo Store india - 363512
                        </h4>
                        <h4 className="mb-0">info@agamorg.com</h4>
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
                  <table className="table table-borderless mb-0">
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
                        <td colSpan="2"></td>
                        <td className="font-bold text-dark" colSpan="2">GRAND TOTAL</td>
                        <td className="font-bold text-theme">${cartTotal()}.00</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div className="invoice-footer text-right">
                  <div className="authorise-sign">
                    <img src={sign} className="img-fluid" alt="sing" />
                    <span className="line"></span>
                    <h6>Authorised Sign</h6>
                  </div>
                  <div className="buttons">
                    <button className="theme-btn-one btn-black-overlay btn_sm">export as PDF</button>
                    <button className="theme-btn-one btn-black-overlay btn_sm ml-2">print</button>
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
