import React, { useState,useEffect } from 'react'
import Swal from "sweetalert2";
import logo from "../../assets/img/agamlogo.png";
const Payment = () => {
    const profileDetails=JSON.parse(localStorage.getItem("data"))
    const [value,setvalue]=useState("")
    const options = {
        key: 'rzp_test_cDBuRdcX87VjyC',
        amount:100*100, //  = INR 1
        name: 'Agam',
        description: 'some description',
        image:logo,
        handler: function(response) {
            if(response){
                Swal.fire({
                    icon: 'success',
                    title: 'Payment Sucessfull',
                    text: 'Thank You',
                    showConfirmButton: false,
                    timer: 4000
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
     const Submit=()=>{
        if(value==="online"){
            openPayModal()
        }
     }
    return (
        <>
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
        </>
    )
}

export default Payment