import React,{useState} from 'react'
import logo from '../../../assets/img/agamlogo.png'
// import logo2 from '../../../assets/img/logo3.png'
import img from '../../../assets/img/product-image/product4.jpg'
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom'

const NewsletterModal = (props) => {
    const [register,setregister]=useState(false)
    let h__register=props?.header
    return (
        <>
            <Modal show={props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Body className="newsleetre_modal">
                    <div className='row'>

                        <div className='col-5 model-left-side'>
                            <div className='sletterTitle'>{h__register==="register" || register?"Register":"Login"}</div>
                            <p>Get access to your Orders, Wishlist and Recommendations</p>
                            {/* <img src={logo2} /> */}
                        </div>
                        <div className='col-7 model-right-side'>
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
                                <form onSubmit={(e) => { e.preventDefault(); }}>
                                    <div className="default-form-box">
                                        <label>Mobile No {h__register==="register" || register ? "":"or email"}<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" required defaultValue="8956745678" />
                                    </div>
                                    {h__register==="register" || register?<div className="default-form-box">
                                        <label>Email<span className="text-danger">*</span></label>
                                        <input type="email" className="form-control" required defaultValue="elancier@gmail.com" />
                                    </div>:null}
                                    <div className="default-form-box">
                                        <label>Passwords<span className="text-danger">*</span></label>
                                        <input type="password" className="form-control" required defaultValue="elancier123" minLength="8" />
                                    </div>
                                    <div  className="forget_pass">Forgot Password?</div>

                                    <div className="btnShow">
                                        <button className="theme-btn-one btn-black-overlay btn_md" type="submit">{h__register==="register" || register?"Register":"Login"}</button>
                                    </div>
                                    <div className="remember_area">
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" id="materialUnchecked" />
                                            <label className="form-check-label" htmlFor="materialUnchecked">Remember me</label>
                                        </div>
                                    </div>
                                    <Link to="">
                                        <div  className="active c_create_css"  onClick={()=>setregister(true)}><span>Create Your Account?</span>
                                        {/* <span>{register?"Login":"Register"}</span> */}
                                        </div>
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
        </>
    )
}

export default NewsletterModal;