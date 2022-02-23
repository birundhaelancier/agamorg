import {
    USER_PROFILE_UPDATE,DELETE_WISHLIST,ADD_WISHLIST,ORDER_CREATE,PINCODE_CHECK 
} from '../Utils/constant';
import { apiurl, findServer } from '../Utils/baseurl';
import axios from 'axios';
import Swal from "sweetalert2";
import { Profile_Details,Get_Wishlist,Get_Address_List } from './allActions'


export const ProfileUpdate = (data,upload) => async dispatch => {
    try {
        axios({
            method: 'post',
            url:apiurl+"profileUpdate/"+JSON.parse(localStorage.getItem("UserId")),
            data:{
                "first_name":data.f_name,
                "last_name":data.l_name,
                "email":data.email,
                "password":data.new_password,
                "image": upload        
            },
        })
        .then((response) => {
            dispatch({type:USER_PROFILE_UPDATE,payload:response.data})
            if(response.data.status===1){
                dispatch(Profile_Details())
                Swal.fire({
                    title: 'Success!',
                    text: response.data.response,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 3000
                  })
                }
                if(response.data.status===0){
                    Swal.fire({
                        title: 'Failed!',
                        text: response.data.response,
                        icon: 'warning',
                        showConfirmButton: false,
                        timer: 3000
                      })
                    }
               
            return Promise.resolve();
        })
        
    } catch (err) {
        // notification.error({
        //     message: 'Something wrong,Not Updated User Details',
        // });
    }
}


export const DeleteWishlist = (item_id,cartlist) => async dispatch => {
    try {
        axios({
            method: 'post',
            url:apiurl+"wishlistDelete",
            data:{
                "user_id":JSON.parse(localStorage.getItem("UserId")),
                "item_id":item_id      
            },
        })
        .then((response) => {
            dispatch({type:DELETE_WISHLIST,payload:response.data})
            if(response.data.status===1){
                dispatch(Get_Wishlist())
                if(cartlist!=="addcart")
                Swal.fire({
                    title: 'Success!',
                    text: response.data.response,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
                  })
                
                }
                if(response.data.status===0){
                    if(cartlist!=="addcart")
                   Swal.fire({
                        title: 'Failed!',
                        text: response.data.response,
                        icon: 'warning',
                        showConfirmButton: false,
                        timer: 1000
                      })
                    }
               
            return Promise.resolve();
        })
        
    } catch (err) {
        // notification.error({
        //     message: 'Something wrong,Not Updated User Details',
        // });
    }
}


export const AddWishlist = (item_id) => async dispatch => {
    try {
        axios({
            method: 'post',
            url:apiurl+"wishlistAdd",
            data:{
                "user_id":JSON.parse(localStorage.getItem("UserId")),
                "item_id":item_id      
            },
        })
        .then((response) => {
            dispatch({type:ADD_WISHLIST,payload:response.data})
            if(response.data.status===1){
                dispatch(Get_Wishlist())
                Swal.fire({
                    title: 'Success!',
                    text: response.data.response,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
                  })
                }
                if(response.data.status===0){
                    Swal.fire({
                        title: 'Failed!',
                        text: response.data.response,
                        icon: 'warning',
                        showConfirmButton: false,
                        timer: 1000
                      })
                    }
               
            return Promise.resolve();
        })
        
    } catch (err) {
        // notification.error({
        //     message: 'Something wrong,Not Updated User Details',
        // });
    }
}



// export const DeleteWishlist = (item_id,cartlist) => async dispatch => {
//     try {
//         axios({
//             method: 'post',
//             url:apiurl+"wishlistDelete",
//             data:{
//                 "user_id":JSON.parse(localStorage.getItem("UserId")),
//                 "item_id":item_id      
//             },
//         })
//         .then((response) => {
//             dispatch({type:DELETE_WISHLIST,payload:response.data})
//             if(response.data.status===1){
//                 dispatch(Get_Wishlist())
//                 if(cartlist!=="addcart")
//                 Swal.fire({
//                     title: 'Success!',
//                     text: response.data.response,
//                     icon: 'success',
//                     showConfirmButton: false,
//                     timer: 1000
//                   })
                
//                 }
//                 if(response.data.status===0){
//                     if(cartlist!=="addcart")
//                    Swal.fire({
//                         title: 'Failed!',
//                         text: response.data.response,
//                         icon: 'warning',
//                         showConfirmButton: false,
//                         timer: 1000
//                       })
//                     }
               
//             return Promise.resolve();
//         })
        
//     } catch (err) {
//         // notification.error({
//         //     message: 'Something wrong,Not Updated User Details',
//         // });
//     }
// }


export const OrderPlaced_Create = (data,product,ship_Id,payment,amount,coupon_dis,payment_res) => async dispatch => {
    try {
        axios({
            method: 'post',
            url:apiurl+"order",
            data:{
                "user_id":JSON.parse(localStorage.getItem("UserId")),
                "firstname":data.firstname,
                "lastname":data.lastname,
                "email":data.email,
                "mobileno":data.mobileno,
                "fulladdress":data.address,
                "pincode":data.pincode,
                "city":data.city,
                "product":product,
                "shipping":ship_Id,
                "payment":payment,
                "payment_id":payment_res?.razorpay_payment_id ||  payment_res?.error?.metadata.payment_id,
                "payment_status":payment_res?.error?"Failed":"Success",
                "amount":amount,
                "discount":coupon_dis?.discount
              
            },
        })
        .then((response) => {
            dispatch({type:ORDER_CREATE,payload:response.data})
            if(response.data.status===1){
                dispatch(Get_Wishlist())
                Swal.fire({
                    title: 'Success!',
                    text: response.data.response,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
                  })
                }
                if(response.data.status===0){
                    Swal.fire({
                        title: 'Failed!',
                        text: response.data.response,
                        icon: 'warning',
                        showConfirmButton: false,
                        timer: 1000
                      })
                    }
               
            return Promise.resolve();
        })
       
    } catch (err) {
       
    }
}


export const PinCode_Submit = (data) => async dispatch => {
    try {
        axios({
            method: 'post',
            url:apiurl+"checkPincode",
            data:{
                "pincode":data
            },
        })
        .then((response) => {
            dispatch({type:PINCODE_CHECK,payload:response.data})
            console.log("check",response)
            if(response.data.length>0){
                // dispatch(Get_Wishlist())
                Swal.fire({
                    title: 'Success!',
                    text:"Delivery Availability for this pincode"+" " + response.data.map((data)=>data.pincode),
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 4000
                  })
                }
                else{
                    Swal.fire({
                        title: 'Sorry!',
                        text: "This particular pincode not Delivery Availability" ,
                        icon: 'warning',
                        // showConfirmButton: false,
                        timer: 4000
                      })
                    }
               
            return Promise.resolve();
        })
       
    } catch (err) {
       
    }
}



export const Add_Address = (data) => async dispatch => {
    try {
        axios({
            method: 'post',
            url:apiurl+"addressAdd",
            data:{
                "user":JSON.parse(localStorage.getItem("UserId")),
                "address":data.address,
                "city":data.city,
                "pincode":data.pincode,
                "type":"home"
            },
        })
        .then((response) => {
            dispatch({type:PINCODE_CHECK,payload:response.data})
            if(response.data.status===1){
                dispatch(Get_Address_List())
                Swal.fire({
                    title: 'Success!',
                    text: response.data.response,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
                  })
                }
                if(response.data.status===0){
                    Swal.fire({
                        title: 'Failed!',
                        text: response.data.response,
                        icon: 'warning',
                        showConfirmButton: false,
                        timer: 1000
                      })
                    }
               
               
            return Promise.resolve();
        })
       
    } catch (err) {
       
    }
}