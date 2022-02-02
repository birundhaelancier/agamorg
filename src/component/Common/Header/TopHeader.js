import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import avater from '../../../assets/img/common/avater.png'
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import Swal from 'sweetalert2';
import NewsletterModal from '../NewModel'
const TopHeader = () => {
    let dispatch = useDispatch();
    const history = useHistory()
    const [login,setLogin] =useState(false)
    const [register,setregister]=useState(false)
    let status = useSelector((state) => state.user.status);
    let user = useSelector((state) => state.user.user);

    const logout = () => {
        Swal.fire({
            icon: 'success',
            title: 'Logout Sucessfull',
            text: 'Thank You'
        })
        dispatch({ type: "user/logout" })
        history.push("/login");
    }
    return (
        <>
            <section id="top_header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="top_header_left">
                                <p>Special collection already available.<Link to="/shop">Read more ...</Link></p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="top_header_right">
                                {
                                    !status ?
                                        <ul className="right_list_fix">
                                            <li><Link to="/enquiryarea"><i className="fa fa-building-o"></i> Enquiry</Link></li>
                                            <li onClick={()=>setLogin(true)}><a><i className="fa fa-user"></i> Login</a></li>
                                            <li onClick={()=>{setregister(true);setLogin(false)}}><a><i className="fa fa-lock"></i> Register</a></li>
                                        </ul>
                                        :
                                        <ul className="right_list_fix">
                                            <li><Link to="/order-tracking"><i className="fa fa-truck"></i> Track your Order</Link></li>
                                            <li className="after_login"><img src={avater} alt="avater" /> {user.name || 'Jhon Doe'} <i className="fa fa-angle-down"></i>
                                                <ul className="custom_dropdown">
                                                    <li><Link to="/my-account"><i className="fa fa-tachometer"></i> Dashboard</Link></li>
                                                    <li><Link to="/my-account/customer-order"><i className="fa fa-cubes"></i> My Orders</Link></li>
                                                    <li><Link to="#!" onClick={() => { logout() }} ><i className="fa fa-sign-out"></i> Logout</Link></li>
                                                </ul>
                                            </li>
                                        </ul>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <NewsletterModal show={login || register} start={()=>{setLogin(false);setregister(false)}} header={login?"login":"register"}/>
            </section>
        </>
    )
}

export default TopHeader