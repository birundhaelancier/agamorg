
import React,{useState,useEffect} from 'react'
import { connect, useDispatch } from 'react-redux'
import { Get_Shipping,CouponCode,Get_Address_List,City_List,Profile_Details } from '../../Redux/Action/allActions'
import { OrderPlaced_Create,Add_Address } from '../../Redux/Action/CreateActions'
import logo from "../../assets/img/agamlogo.png";
import Swal from "sweetalert2";
import Alert from '@mui/material/Alert';
import NewsletterModal from '../../component/Common/NewModel'
import AddressDetail from './Address'
import { useHistory, useParams } from 'react-router-dom'
const Checkout = (props) => {
    let { discount } =useParams()
    let dispatch=useDispatch()
    let history=useHistory()
    const [CityList,setCityList]=useState([])
    const [pincodeList,setpincodeList]=useState([])
    const ShoopingCarts= JSON.parse(localStorage.getItem("carts"))
    const [changeAddress,setchangeAddress]=useState(false)
    const [discountAmt,setdiscountAmt]=useState()
    const [DiscountFilter,setDiscountFilter]=useState()
    const [mobileerr,setmobileerr]=useState("")
    const [BillingErr,setBillingErr]=useState(false)
    const [emailerr,setemailerr]=useState("")
    const [pincodeerr,setpincodeerr]=useState("")
    const [Billing_Info,setBilling_Info]=useState({firstname:"",lastname:"",email:"",mobileno:"",fulladdress:"",pincode:"",city:""})
    const [FilterData,setFilterData]=useState([])
    const [coupon,setcoupon]=useState("")
    const [couponErr,setcouponErr]=useState(false)
    const cartTotal = () => {
        return ShoopingCarts?.reduce(function (total, item) {
          return total + item.discount_price*item.quantity;
        }, 0);
      };
      useEffect(()=>{
        dispatch(Get_Shipping())
        dispatch(CouponCode())
        dispatch(Get_Address_List())
        dispatch(City_List())
        dispatch(Profile_Details())
      },[])
      useEffect(()=>{
        let Total=cartTotal()
        if(Total>1000){
            setFilterData(props.ShippingDetails[0])
        }else{
            setFilterData(props.ShippingDetails[1]) 
        }
        var Data=props.coupon_code.filter((data)=>{
            return data.code_name===coupon
         })
        
      console.log(Data)
      },[props.ShippingDetails,props.coupon_code,discount])  
      const profileDetails=JSON.parse(localStorage.getItem("data"))
      const [value,setvalue]=useState("online")
      const options = {
          key: 'rzp_test_cDBuRdcX87VjyC',
          amount:cartTotal()*100, //  = INR 1
          name: 'Agam',
          description: 'some description',
          image:logo,
          handler: function(response) {
            let product=[]
            var amount=cartTotal()
            ShoopingCarts.forEach((data) => {
                product.push({
                        "id":data.id,
                        "attributeName":data.pack || "",
                        "attributeId":data.attributeId || "",
                        "price":data.discount_price,
                        "qty":data.quantity
                })
            })
              if(response){
            dispatch(OrderPlaced_Create(Billing_Info,product,FilterData.status,value,amount,DiscountFilter,response)).then(()=>{
                Swal.fire({
                    icon: 'success',
                    title: 'Payment Sucessfull',
                    text: 'Thank You',
                    showConfirmButton: false,
                    timer: 4000
                })
                history.push("/my-account/customer-order")
                localStorage.removeItem("carts");
             })
               }
          },
          prefill: {
              name:profileDetails[0]?.first_name || "Surya",
              contact:profileDetails[0]?.phone,
              email:profileDetails[0]?.email
          },
          notes: {
              address:"address"
          },
          theme: {
              color: '#007a58',
              hide_topbar: false
          }
        };
        
        const openPayModal = () => {
          var rzp1 = new window.Razorpay(options);
          let product=[]
          var amount=cartTotal()
          ShoopingCarts.forEach((data) => {
              product.push({
                      "id":data.id,
                      "attributeName":data.pack || "",
                      "attributeId":data.attributeId || "",
                      "price":data.discount_price,
                      "qty":data.quantity
              })
          })
          rzp1.on('payment.failed', function (response){
              console.log("gfh",response)
            if(response){
                dispatch(OrderPlaced_Create(Billing_Info,product,FilterData.status,value,amount,DiscountFilter,response)).then(()=>{
                    Swal.fire({
                        icon: 'warning',
                        title: 'Payment Failed',
                        // text: 'Thank You',
                        showConfirmButton: false,
                        timer: 4000
                    })
                 })
                   }
    });
          rzp1.open();
        };
        useEffect(() => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.async = true;
          document.body.appendChild(script);
        }, []);
     
       const paymentType=(e,data)=>{
          setvalue(data)
       }
       useEffect(()=>{
        var targetkeys = Object.keys(Billing_Info);
        for (var i in targetkeys) {
            if (Billing_Info[targetkeys[i]]&& Billing_Info[targetkeys[i]] != "") {
                setBillingErr(false)
            }
            else {
                setBillingErr(true)
            }
        } 
       },[Billing_Info])
       const Submit=()=>{
        let product=[]
        var amount=cartTotal()
        ShoopingCarts.forEach((data) => {
            product.push({
                    "id":data.id,
                    "attributeName":data.pack || "",
                    "attributeId":data.attributeId || "",
                    "price":data.discount_price,
                    "qty":data.quantity
            })
        })
        if(mobileerr=="" && !BillingErr && pincodeerr=="" && emailerr==""){
          if(value!=="online"){
        dispatch(OrderPlaced_Create(Billing_Info,product,FilterData.status,value,amount,DiscountFilter)).then(()=>{
            Swal.fire({
                icon: 'success',
                title: 'Payment Sucessfull',
                text: 'Thank You',
                showConfirmButton: false,
                timer: 4000
            })
            localStorage.removeItem("carts");
            history.push("/my-account/customer-order")
         })
           }
          else{
              openPayModal()
          }
        }else{
            Swal.fire({
                icon: 'warning',
                // title: 'Failed',
                text:"Please Filled All Mandatory Fields",
                showConfirmButton: false,
                timer: 2000
            })
            // setmobileerr("Please Enter Your Email") 
        }
        setBilling_Info((prevState) => ({
            ...prevState,
        }));
       }
       const OnChangeInfo=(data,key)=>{
        if(data&&key==="city"){
            var Data=props.City_List.filter((item)=>{
                return(item.id===Number(data))
                }
            )
            var s = Data.map((data)=>{
                return data.pincode.split(/[\s,]+/)
            });
            var match = s[0]
            let citydata=[]
            console.log(data)
            for ( var a in match)
            {
                citydata.push({id:a,name:match[a]})
            }
            setpincodeList(citydata)
        }
        if(data&&key==="email"){
            var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (re.test(data)) {
              setemailerr("")
            }else{
                setemailerr("Email is Invalid")
            }
         }
         if(data&&key==="pincode"){
            var re = /(^\d{6}$)|(^\d{6}-\d{6}$)/;
            if (re.test(data)) {
              setpincodeerr("")
            }else{
              setpincodeerr("Invalid Pincode")
            }
         }
         if(data&&key==="mobileno"){
            var re = /^(?=.*?[1-9])[0-9()-]+$/;
            if (re.test(data)) {
              setmobileerr("")
            }else{
              setmobileerr("Please Enter Numeric Value only")
            }
         }
       
        setBilling_Info((prevState) => ({
            ...prevState,
            [key]: data,
        }));
       }
       const CheckValdeCoupon=()=>{
        let Total=cartTotal()
        var Data=props.coupon_code.filter((data)=>{
            return data.code_name===coupon
            })
            setDiscountFilter(Data[0])
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
            if(Data[0]?.type==="amount"){
               setdiscountAmt(Total-Number(Data[0]?.discount))
            }else{
                let calculate=Number(Data[0]?.discount)/100
               setdiscountAmt(Total-(Total*calculate))  
            }
      }
      const Add_Address_Detail=(e)=>{
          dispatch(Add_Address(Billing_Info)).then(()=>{
            setchangeAddress(false)
            
          })
      }
      useEffect(()=>{
        setCityList(props.City_List)
      },[props.City_List])

      useEffect(()=>{
        const Details=props.Address_list

        var CityData=pincodeList.filter((data)=>{
            return Number(data.name)===Number(Details[0]?.pincode)
        })

        Billing_Info.firstname=props.ProfileData.first_name || ""
        Billing_Info.lastname=props.ProfileData.last_name || ""
        Billing_Info.mobileno=props.ProfileData.phone || ""
        Billing_Info.pincode=CityData[0]?.name || ""
        // Billing_Info.city=Details[0]?.city || ""
        Billing_Info.address=Details[0]?.address || ""
        Billing_Info.email=props.ProfileData.email || ""
        setBilling_Info((prevState) => ({
            ...prevState,
        }));
     

      },[props.Address_list,props.ProfileData,pincodeList])

  console.log(Billing_Info)   

    return (
        <div className='Adress_detail'>
            <section id="checkout_one" className="ptb-100">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="checkout-area-bg bg-white">
                    <div className="check-heading">
                        <h3>Billing Information</h3>
                    </div>
                    <div className="check-out-form">
                        {changeAddress ?
                         <form  onSubmit={(e) => { Add_Address_Detail();e.preventDefault();}}>
                            <div className="row">
                                <div className="col-lg-6 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="fname">First name<span className="text-danger">*</span> </label>
                                        <input type="text" required className="form-control" id="fname" 
                                            placeholder="First name" onChange={(data)=>OnChangeInfo(data.target.value,"firstname")} value={Billing_Info.firstname}/>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="lname">Last name<span className="text-danger">*</span></label>
                                        <input type="text" required className="form-control" id="lname"
                                            placeholder="Last name" onChange={(data)=>OnChangeInfo(data.target.value,"lastname")} value={Billing_Info.lastname}/>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="cname">Mobile No.<span className="text-danger">*</span></label>
                                        <input className="form-control" required type="text" id="number"   minLength={10} pattern={"[1-9]{1}[0-9]{9}"} maxlength={10}
                                            placeholder="Mobile No." onChange={(data)=>OnChangeInfo(data.target.value,"mobileno")} value={Billing_Info.mobileno}/>
                                        <div style={{color:"red",fontSize:"13px",paddingTop:"5px"}}>{mobileerr}</div> 
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="email">Email Addresse<span className="text-danger">*</span></label>
                                        <input className="form-control" required type="email" id="email"
                                            placeholder="elancier@gmail.com"  onChange={(data)=>OnChangeInfo(data.target.value,"email")} value={Billing_Info.email}/>
                                        <div style={{color:"red",fontSize:"13px",paddingTop:"5px"}}>{emailerr}</div>    
                                    </div>
                                </div>
                          

                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="form-group">
                                            <div className="select-input">
                                        <label htmlFor="city">City<span className="text-danger">*</span></label>

                                                    <select name="city" id="city" placeholder='City' required onChange={(data) => OnChangeInfo(data.target.value, "city")} value={Billing_Info.city}>
                                                    <option value="">Select City</option>
                                                        {CityList.map((data)=>{
                                                        return( <option value={data.id}>{data.name}</option>
                                                        )})}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="form-group">
                                            <div className="select-input">
                                        <label htmlFor="zip">Pincode<span className="text-danger">*</span></label>

                                                    <select name="pincode" id="pincode" placeholder='pincode' required onChange={(data) => OnChangeInfo(data.target.value, "pincode")} value={Billing_Info.pincode}>
                                                    <option value="">Select Pincode</option>
                                                        {pincodeList&&pincodeList.map((data)=>{
                                                        return( <option value={data.name}>{data.name}</option>
                                                        )})}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                               
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="faddress">Full Address<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" id="faddress" required
                                            placeholder="Enter your address here.." onChange={(data)=>OnChangeInfo(data.target.value,"address")} value={Billing_Info.address}/>
                            
                                    </div>
                                </div>
  
                             
                            </div>
                            <div  style={{textAlign:"center"}}><button type="submit" className="theme-btn-one btn-black-overlay btn_sm">Add Address</button></div>
                        </form>
                        :
                        <>
                        <div  style={{textAlign:"end",marginBottom:"10px"}}><button  className="theme-btn-one btn-black-overlay btn_sm" onClick={()=>setchangeAddress(true)}>Change Address</button></div>
                        <AddressDetail/>
                        </>
                       }



            {changeAddress && BillingErr&&<Alert  variant="filled" severity="warning" style={{marginTop:"20px"}}>Billing Information All are Mantatory</Alert>}

                    </div>
                </div>
                
            {/* coupon */}
            <div className="col-lg-12 col-md-12">
                <div className="coupon_code left">
                    <h3>Coupon</h3>
                    <div className="coupon_inner">
                        <p>Enter your coupon code if you have one.</p>
                        <form onSubmit={(e) =>{ e.preventDefault(); CheckValdeCoupon() }}>
                            <input className="mb-2" placeholder="Coupon code" type="text" value={coupon} required onChange={(e)=>{setcoupon(e.target.value);couponErr&&CheckValdeCoupon()}}/>
                            <button type="submit" className="theme-btn-one btn-black-overlay btn_sm">Apply coupon</button>
                            {couponErr&&<Alert severity="error">Invalid Cuppon Code!</Alert>}
                        </form>

                    </div>
                </div>
            </div>
            </div>




                        <div className="col-lg-6 col-md-12 col-sm-12 col-12">
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
                        {ShoopingCarts?.map((data)=>{
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
                                <td className="product-subtotal">₹{discountAmt?discountAmt:Number(cartTotal())+Number(FilterData?.price || 0)}.00</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            {discountAmt>0&&<Alert  variant="filled" severity="success" style={{marginTop:"20px"}}>{DiscountFilter?.title} {DiscountFilter?.discount} {DiscountFilter?.type=="amount"?"Rupees Amount":"Percentage"} Discount</Alert>}

            </div>

            
            {/* payment */}
            <div className="order_review bg-white">
                <div className="check-heading">
                    <h3>Payment</h3>
                </div>
                <div className="payment_method">
                    <form>
                        <div className="accordion" id="accordionExample">
                            <div className="payment_area_wrappers">
                                <div className="heading_payment" id="headingOne">
                                    <div className="" data-toggle="collapse" data-target="#collapseOne" >
                                        <input type="radio" name="payment" id="html" value={value} defaultChecked onChange={(e)=>paymentType(e,"online")}/>
                                        <label htmlFor="html">Online </label>
                                    </div>
                                </div>
                                <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div className="payment_body">
                                        <p>Online </p>
                                    </div>
                                </div>
                            </div>
                            <div className="payment_area_wrappers">
                                <div className="heading_payment" id="headingTwo">
                                    <div className="collapsed" data-toggle="collapse" data-target="#collapseTwo">
                                        <input type="radio" name="payment" id="javascript" value={value} onChange={(e)=>paymentType(e,"cash")}/>
                                        <label htmlFor="javascript">Cash on delivery </label>
                                    </div>
                                </div>
                                <div id="collapseTwo" className="collapse" data-parent="#accordionExample">
                                    <div className="payment_body">
                                        <p> Cash on delivery</p>
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                    </form>
                </div>
                <button className="theme-btn-one btn-black-overlay btn_sm" onClick={()=>Submit()}>Place Order</button>
            </div>
            {/* payment end */}

                        </div>


                    </div>
                </div>
            </section>
        </div>
    )
}

const mapStateToProps = (state) =>
({
    ShippingDetails: state.AllReducer.Shipping || [],
    coupon_code: state.AllReducer.coupon_code || [],
    Address_list:state.AllReducer.Address_list || [],
    City_List: state.AllReducer.City_List || [],
    ProfileData: state.AllReducer.ProfileData || [],
    
});
export default connect(mapStateToProps)(Checkout);