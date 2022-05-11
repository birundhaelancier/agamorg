import {
    USER_PROFILE_UPDATE,DELETE_WISHLIST,ADD_WISHLIST,ORDER_CREATE,PINCODE_CHECK,CREATE_POST,DELETE_POSTS,UPDATE_POSTS 
} from '../Utils/constant';
import { apiurl, findServer } from '../Utils/baseurl';
import axios from 'axios';
import Swal from "sweetalert2";
import { Profile_Details,Get_Wishlist,Get_Address_List,Farmer_Post_List,Order_List } from './allActions'
import moment from 'moment'
import { notification } from 'antd';

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
                notification.success({
                    message: response.data.response,
                })
                }
                if(response.data.status===0){
                    notification.error({
                        message: response.data.response,
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
                notification.success({
                    message: response.data.response,
                })
                
                }
                if(response.data.status===0){
                    if(cartlist!=="addcart")
                   notification.error({
                        message: response.data.response,
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
                notification.success({
                    message: response.data.response,
                })
                }
                if(response.data.status===0){
                    notification.error({
                        message: response.data.response,
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


export const OrderPlaced_Create = (data,product,ship_Id,payment,amount,coupon_dis,payment_res,amc_plan,flag) => async dispatch => {
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
                "discount":coupon_dis?.discount,
                "flag":flag,
                "amc":amc_plan?.amc,
                "delivery":amc_plan?.delivery_charge,
                "installation":amc_plan?.installation,
                "award":amc_plan?.award,
                "premium":amc_plan?.premium,
                "premium_amt":amc_plan?.premium_amt
              
            },
        })
        .then((response) => {
            dispatch({type:ORDER_CREATE,payload:response.data})
            if(response.data.status===1){
                dispatch(Get_Wishlist())
                notification.success({
                    message: response.data.response,
                })
                }
                if(response.data.status===0){
                    notification.error({
                        message: response.data.response,
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
            if(response.data.length>0){
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
                "type":"home",
                "first_name":data.firstname,
                "last_name":data.lastname
            },
        })
        .then((response) => {
            dispatch({type:PINCODE_CHECK,payload:response.data})
            if(response.data.status===1){
                dispatch(Get_Address_List())
                notification.success({
                    message: response.data.response,
                })
                }
                if(response.data.status===0){
                    notification.error({
                        message: response.data.response,
                    })
                    }
               
               
            return Promise.resolve();
        })
       
    } catch (err) {
       
    }
}


export const Create_Post = (data) => async dispatch => {
    try {
        axios({
            method: 'post',
            url:apiurl+"postCreate",
            data:{
                "fid":JSON.parse(localStorage.getItem("UserId")),
                "title":data.title,
                "image":data.upload
            },
        })
        .then((response) => {
            dispatch({type:CREATE_POST,payload:response.data})
            if(response.data.status===1){
                dispatch(Farmer_Post_List())
                notification.success({
                    message: response.data.response,
                })
                }
                if(response.data.status===0){
                    notification.error({
                        message: response.data.response,
                    })
                    }
               
               
            return Promise.resolve();
        })
       
    } catch (err) {
       
    }
}

export const Delete_Posts= (id) => async dispatch => {
    try {
        axios({
            method: 'GET',
            url:apiurl+"postDelete/"+id,
        })
        .then((response) => {
            dispatch({type:DELETE_POSTS,payload:response.data})
            if(response.data.status===1){
                dispatch(Farmer_Post_List())
                notification.success({
                    message: response.data.response,
                })
                
                }
                if(response.data.status===0){
                    notification.error({
                        message: response.data.response,
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


export const Update_Post= (data,id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url:apiurl+"postUpdate/"+id,
            data:{
                "title":data.title,
                "image":data.upload || ""
            },
        })
        .then((response) => {
            dispatch({type:UPDATE_POSTS,payload:response.data})
            if(response.data.status===1){
                dispatch(Farmer_Post_List())
                notification.success({
                    message: response.data.response,
                })
                
                }
                if(response.data.status===0){
                    notification.error({
                        message: response.data.response,
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


export const AddExcutiveHead= (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url:apiurl+"executiveHead",
            data:{
                "first_name":data.first_name.value,
                "last_name":data.last_name.value,
                "dob":moment(data.dob.value).format("YYYY-MM-DD"),
                "gender":data.gender.value,
                "age":data.age.value,
                "qualification":data.qualification.value,
                "pincode":data.pincode.value,
                "city":data.city.value,
                "district":data.district.value,
                "phone":data.phone.value,
                "phone1":data.phone1.value,
                "address":data.address.value,
                "experience":data.experience.value,
                "currently":data.currently.value
            },
        })
        .then((response) => {
            console.log(  Object.entries(response.data).map((key, val) => console.log(key,val.toString()),"rrrrrrrrrrrrrr"))
            if(response.data.status===1){
                notification.success({
                    message: response.data.response,
                })
                
                }
                else{
                      notification.error({
                        message:Object.values(response.data),
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

export const AddExcutive= (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url:apiurl+"executive",
            data:{
                "first_name":data.first_name.value,
                "last_name":data.last_name.value,
                "dob":moment(data.dob.value).format("YYYY-MM-DD"),
                "gender":data.gender.value,
                "age":data.age.value,
                "qualification":data.qualification.value,
                "pincode":data.pincode.value,
                "city":data.city.value,
                "district":data.district.value,
                "phone":data.phone.value,
                "phone1":data.phone1.value,
                "address":data.address.value,
                "experience":data.experience.value,
                "currently":data.currently.value
            },
        })
        .then((response) => {
            
            if(response.data.status===1){
                notification.success({
                    message: response.data.response,
                })
                
                }else{
                    notification.error({
                        message:Object.values(response.data),
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


export const OutSideFarmer= (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url:apiurl+"outsideFarmer",
            data:{
                "first_name":data.first_name.value,
                "last_name":data.last_name.value,
                "dob":moment(data.dob.value).format("YYYY-MM-DD"),
                "gender":data.gender.value,
                "age":data.age.value,
                "qualification":data.qualification.value,
                "pincode":data.pincode.value,
                "city":data.city.value,
                "district":data.district.value,
                "phone":data.phone.value,
                "phone1":data.phone1.value,
                "address":data.address.value,
                "company":data.company_name.value,
                "photo":data.upload.value
            },
        })
        .then((response) => {
            if(response.data.status===1){
                notification.success({
                    message: response.data.response,
                })
                
                }else{
                    notification.error({
                        message:Object.values(response.data),
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

export const OrderUpdate= (id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url:apiurl+"orderUpdate",
            data:{
                "oid":id
            },
        })
        .then((response) => {
            if(response.data.status===1){
                notification.success({
                    message: response.data.response,
                })
                dispatch(Order_List())
                }
                if(response.data.status===0){
                    notification.error({
                        message:response.data.response,
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



