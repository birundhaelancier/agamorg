import React,{useEffect, useState} from 'react'
import logo from '../../../assets/img/agamlogo.png'
// import logo2 from '../../../assets/img/logo3.png'
import img from '../../../assets/img/product-image/product4.jpg'
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAuth } from "../../../context/auth"
import { User_Login,User_Register } from '../../../Redux/Action/LoginActions';
import LocationModal from '../Header/LocationModal'
import Swal from "sweetalert2";
const NewsletterModal = (props) => {
    let dispatch=useDispatch()
    const [register,setregister]=useState(false)
    const [location,setlocation]=useState(false)
    const [UserDetail,setUserDetail]=useState({ password:"", mobileno:"",email:"" })
    const  { setAuthTokens }  = useAuth();
    let h__register=props?.header
    const onChangeData=(data,key)=>{
        setUserDetail((prevState) => ({
            ...prevState,
            [key]: data,
        }));
    }
    const Submit=(e)=>{
        e.preventDefault();
        if(h__register==="register" || register){
            dispatch(User_Register(UserDetail)).then((res)=>{
                props.start()
                ClearState()
                if(res.payload.status===1){   
                Swal.fire({
                    title: 'Success!',
                    text: "Registration Successfully",
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                  })
                }else if(res.payload.status===0){
                    Swal.fire({
                        title: 'Failed!',
                        text: res.payload.response,
                        icon: 'warning',
                        showConfirmButton: false,
                        timer: 2000
                    })   
                }
            }) 
        }
        else{
        dispatch(User_Login(UserDetail)).then((res)=>{
            props.start()
            ClearState()
            if(res.payload.status===1){
            // window.location.reload()
         
            setAuthTokens(res.payload.response) 
            Swal.fire({
                title: 'Success!',
                text: "Successfully Logined",
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              })
               setTimeout(()=>{
                   setlocation(true)
               },2000); 
            }else if(res.payload.status===0){
                Swal.fire({
                    title: 'Failed!',
                    text: res.payload.response,
                    icon: 'warning',
                    showConfirmButton: false,
                    timer: 2000
                })   
            }
        }) 
    }  
}
    const ClearState=()=>{
        let key=Object.keys(UserDetail)
        key.map((data)=>{
            UserDetail[data]=""
        })
        setUserDetail((prevState) => ({
            ...prevState,
        }));
    }
    return (
        <>
            <Modal show={props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Body className="newsleetre_modal">
                    <div className='row'>
                        <div className='col-md-5 col-lg-5 col-sm-12 model-left-side'>
                            <div className='sletterTitle'>{h__register==="register" || register?"Register":"Login"}</div>
                            <p>Get access to your Orders, Wishlist and Recommendations</p>
                            {/* <img src={logo2} /> */}
                        </div>
                        <div className='col-md-7 col-lg-7 col-sm-12  model-right-side'>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.start}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div className="footerLogo">
                                <img src={logo} alt="logo" className='agalogoImageFooter' />
                                <div className='footerlogoTitle'>
                                    <div className='agamTitle'>Agam</div>
                                    <div className='organicTitle'>org</div>
                                </div>
                            </div>
                            <div className='login-input'>
                                <form onSubmit={(e) =>Submit(e) }>
                                    <div className="default-form-box">
                                        <label>Mobile No {h__register==="register" || register ? "":"or email"}<span className="text-danger">*</span></label>
                                        {h__register==="register" || register?
                                        <input type={"text"} title={"Please enter exactly 10 digits"} className="form-control"   pattern={"[1-9]{1}[0-9]{9}"} minLength={10} maxLength={10}  onChange={(data) => onChangeData(data.target.value, "mobileno")} required  value={UserDetail.mobileno}/>:
                                        <input type={"text"} className="form-control"     onChange={(data) => onChangeData(data.target.value, "mobileno")} required  value={UserDetail.mobileno}/>


                                        }
                                    </div>
                                    {h__register==="register" || register?<div className="default-form-box">
                                        <label>Email<span className="text-danger">*</span></label>
                                        <input type="email" className="form-control" required  onChange={(data) => onChangeData(data.target.value, "email")}   value={UserDetail.email} />
                                    </div>:null}
                                    <div className="default-form-box">
                                        <label>Passwords<span className="text-danger">*</span></label>
                                        <input type="password" className="form-control" required  minLength={6}   onChange={(data) => onChangeData(data.target.value, "password")}  value={UserDetail.password}/>
                                    </div>
                                    <div  className="forget_pass">Forgot Password?</div>

                                    <div className="btnShow">
                                        <button className="theme-btn-one btn-black-overlay btn_md" type="submit">{h__register==="register" || register?"Register":"Login"}</button>
                                    </div>
                                    {/* <div className="remember_area">
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" id="materialUnchecked" />
                                            <label className="form-check-label" htmlFor="materialUnchecked">Remember me</label>
                                        </div>
                                    </div> */}
                                    <Link to="">
                                        <div  className="active c_create_css"  onClick={()=>setregister(true)}><span>{h__register==="register" || register? "Already have an account? Login":"Create Your Account? "}</span></div>
                                        {/* <span>{register?"Login":"Register"}</span> */}
                                    </Link>
                                </form>
                            </div>
                            {/* <div className='createLink'>
                                <div>Create an account</div>
                            </div> */}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <LocationModal show={location} start={() => setlocation(false)} />
        </>
    )
}

export default NewsletterModal;
