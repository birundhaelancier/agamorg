import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import avater from '../../../assets/img/common/avater.png'
import { useSelector, useDispatch,connect } from "react-redux";
import { useHistory } from "react-router-dom"
import Avatar from '@mui/material/Avatar';
import Swal from 'sweetalert2';
import NewsletterModal from '../NewModel'
import { ImageUrl } from '../../../Redux/Utils/baseurl'
import { Profile_Details } from '../../../Redux/Action/allActions'
import { notification } from 'antd';
const TopHeader = (props) => {
    let dispatch = useDispatch();
    const history = useHistory()
    const [profileDetails,setprofileDetails]=useState([])
    const ProfileData= JSON.parse(localStorage.getItem("data")) 
    const [login,setLogin] =useState(false)
    const [register,setregister]=useState(false)
    // let status = useSelector((state) => state.user.status);
    // let user = useSelector((state) => state.user.user);

    const logout = () => {
   
        // localStorage.clear()
        localStorage.removeItem("data")
        localStorage.removeItem("UserId")
        notification.success({
            message: 'Logout Sucessfull',
        })

        history.push("/")
        setTimeout(()=>{
            window.location.reload()
        },500)
    }
    useEffect(()=>{
        dispatch(Profile_Details())
    },[])
    useEffect(()=>{
        setprofileDetails(props.ProfileData)
    },[props.ProfileData])
    const Handleclick=()=>{
      props.click(true)
    }
    
    return (
        <>
            <section id="top_header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="top_header_left">
                                <p>Enjoy your shopping with all categories.<Link to="/">Read more ...</Link></p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="top_header_right">
                    <a
                      className="offcanvas-toggle mobile_toggle"
                      onClick={Handleclick}
                    >
                      <i className="fa fa-bars"></i>
                    </a>
                                            
                                        <ul className="right_list_fix">
                                        <li><Link to="/enquiryarea"><i className="fa fa-building-o"></i>Plan for a Garden</Link></li>
                                        {JSON.parse(localStorage.getItem("data"))?.email===undefined && JSON.parse(localStorage.getItem("data"))?.mobile===undefined?
                                            <>
                                           <li onClick={()=>setLogin(true)}><a><i className="fa fa-user"></i> Login</a></li>
                                            <li className="after_login">
                                            <a><i className="fa fa-lock"></i> Register</a>
                                            <ul className="custom_dropdown">
                                                    <li  onClick={()=>{setregister(true);setLogin(false)}}><i className="fa fa-angle-double-right"></i> Register</li>
                                                    <li><Link to="/excutivehead"><i className="fa fa-angle-double-right"></i> Executive Head</Link></li>
                                                    <li><Link to="/excutive"><i className="fa fa-angle-double-right"></i> Executive</Link></li>
                                                    <li><Link to="/outsidefarmer"><i className="fa fa-angle-double-right"></i> Outside Farmer</Link></li>
                                                </ul>
                                            </li>
                                            </>:
                                           
                                             <li className="after_login">
                                                 <strong style={{paddingRight:"10px"}}>{profileDetails?.users?.first_name || "Profile"}</strong> 
                                                 {profileDetails?.users?.photo===undefined || profileDetails?.users?.photo===null ?
                                                   <Avatar src="/broken-image.jpg" />:
                                                <img src={ImageUrl+profileDetails?.users?.photo} alt="avater" />} <i className="fa fa-angle-down"></i>
                                                <ul className="custom_dropdown">
                                                    <li><Link to={ProfileData?.type===1?"/my-account":"/my-account/customer-account-details"}><i className="fa fa-tachometer"></i> Dashboard</Link></li>
                                                    <li><Link to="/my-account/customer-order"><i className="fa fa-cubes"></i> My Orders</Link></li>
                                                    <li onClick={() =>logout()}><i className="fa fa-sign-out"></i> Logout</li>
                                                </ul>
                                            </li>
                                           }
                                        </ul>
                   
{/*                                         
                                        // <ul className="right_list_fix">
                                        //     <li><Link to="/order-tracking"><i className="fa fa-truck"></i> Track your Order</Link></li>
                                        //     <li className="after_login"><img src={avater} alt="avater" /> {'Jhon Doe'} <i className="fa fa-angle-down"></i>
                                        //         <ul className="custom_dropdown">
                                        //             <li><Link to="/my-account"><i className="fa fa-tachometer"></i> Dashboard</Link></li>
                                        //             <li><Link to="/my-account/customer-order"><i className="fa fa-cubes"></i> My Orders</Link></li>
                                        //             <li><Link to="#!" onClick={() => { logout() }} ><i className="fa fa-sign-out"></i> Logout</Link></li>
                                        //         </ul>
                                        //     </li>
                                        // </ul>  */}
                                
                            </div>
                        </div>
                    </div>
                </div>
                <NewsletterModal show={login || register} start={()=>{setLogin(false);setregister(false)}} header={login?"login":"register"}/>
            </section>
        </>
    )
}


const mapStateToProps = (state) =>
({
    ProfileData: state.AllReducer.ProfileData || [],
});
export default connect(mapStateToProps)(TopHeader);