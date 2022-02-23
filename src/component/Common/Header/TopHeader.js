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
const TopHeader = (props) => {
    let dispatch = useDispatch();
    const history = useHistory()
    const [profileDetails,setprofileDetails]=useState([])
    // const ProfileData= JSON.parse(localStorage.getItem("data")) 
    const [login,setLogin] =useState(false)
    const [register,setregister]=useState(false)
    // let status = useSelector((state) => state.user.status);
    // let user = useSelector((state) => state.user.user);

    const logout = () => {
        window.location.reload()
        // localStorage.clear()
        localStorage.removeItem("data")
        localStorage.removeItem("UserId")
        Swal.fire({
            icon: 'success',
            title: 'Logout Sucessfull',
            text: 'Thank You'
        })
        dispatch({ type: "user/logout" })
        // history.push("/login");
    }
    useEffect(()=>{
        dispatch(Profile_Details())
    },[])
    useEffect(()=>{
        setprofileDetails(props.ProfileData)
    },[props.ProfileData])
    console.log(profileDetails.photo,"fdfdfd")
    
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
                               
                                            
                                        <ul className="right_list_fix">
                                        {JSON.parse(localStorage.getItem("data"))?.email===undefined && JSON.parse(localStorage.getItem("data"))?.mobile===undefined?
                                            <>
                                            <li><Link to="/enquiryarea"><i className="fa fa-building-o"></i> Enquiry</Link></li>
                                           <li onClick={()=>setLogin(true)}><a><i className="fa fa-user"></i> Login</a></li>
                                            <li onClick={()=>{setregister(true);setLogin(false)}}><a><i className="fa fa-lock"></i> Register</a></li>
                                            </>:
                                           
                                             <li className="after_login">
                                                 {profileDetails.photo===undefined || profileDetails.photo===null ?
                                                   <Avatar src="/broken-image.jpg" />:
                                                <img src={ImageUrl+profileDetails.photo} alt="avater" />} <span style={{paddingLeft:"10px"}}>{profileDetails.first_name || "Profile"}</span> <i className="fa fa-angle-down"></i>
                                                <ul className="custom_dropdown">
                                                    <li><Link to="/my-account"><i className="fa fa-tachometer"></i> Dashboard</Link></li>
                                                    <li><Link to="/my-account/customer-order"><i className="fa fa-cubes"></i> My Orders</Link></li>
                                                    <li><Link to="#!" onClick={() => { logout() }} ><i className="fa fa-sign-out"></i> Logout</Link></li>
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