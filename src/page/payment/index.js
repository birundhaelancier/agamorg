import React,{useEffect} from 'react';


export default function PaymentGateway(props) {
    const options = {
        key: 'rzp_test_VyjrBb8Sl4Nb05',
        amount:100*100, //  = INR 1
        name: 'Agam',
        description: 'some description',
        image: 'https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png',
        handler: function(response) {
        },
        prefill: {
            name:"Divya",
            contact:678788888,
            email:"email@gmail.com"
        },
        notes: {
            address:"fghj"
        },
        theme: {
            color: 'green',
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
  return (
      <div onClick={props.openPayModal&&openPayModal}>
         {props.children} 
      </div>
  )
}
