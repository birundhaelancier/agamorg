import React,{useState,useEffect} from 'react'
import { useDispatch,connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Profile_Details } from '../../Redux/Action/allActions'
const Profile = (props) => {
    let dispatch=useDispatch()
    const [profileDetails,setprofileDetails]=useState([])
    useEffect(()=>{
     dispatch(Profile_Details())
    },[])
    useEffect(()=>{
        setprofileDetails(props.ProfileData)
    },[props.ProfileData])
    console.log(props.ProfileData)
    return (
        <>
            <div className="vendors_profiles">
                <h4>Profile</h4>
                <ul>
                    {/* <li>
                        <div className="profils_details_vendor">
                            <div className="profile_left">
                                <h4>Company Name:</h4>
                            </div>
                            <div className="profile_right">
                                <h4>Fashion Store</h4>
                            </div>
                        </div>
                    </li> */}
                    {/* <li>
                        <div className="profils_details_vendor">
                            <div className="profile_left">
                                <h4>Email Address:</h4>
                            </div>
                            <div className="profile_right">
                                <h4>{profileDetails[0]?.email}</h4>
                            </div>
                        </div>
                    </li> */}
                    {/* <li>
                        <div className="profils_details_vendor">
                            <div className="profile_left">
                                <h4>Country / Region:</h4>
                            </div>
                            <div className="profile_right">
                                <h4>Downers Grove, IL</h4>
                            </div>
                        </div>
                    </li> */}
                    {/* <li>
                        <div className="profils_details_vendor">
                            <div className="profile_left">
                                <h4>Year Established:</h4>
                            </div>
                            <div className="profile_right">
                                <h4>2018</h4>
                            </div>
                        </div>
                    </li> */}
                    {/* <li>
                        <div className="profils_details_vendor">
                            <div className="profile_left">
                                <h4>Total Employees:</h4>
                            </div>
                            <div className="profile_right">
                                <h4>101 - 200 People</h4>
                            </div>
                        </div>
                    </li> */}
                    <li>
                        <div className="profils_details_vendor">
                            <div className="profile_left">
                                <h4>First Name:</h4>
                            </div>
                            <div className="profile_right">
                                <h4>{profileDetails.first_name}</h4>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="profils_details_vendor">
                            <div className="profile_left">
                                <h4>Last Name:</h4>
                            </div>
                            <div className="profile_right">
                                <h4>{profileDetails.last_name}</h4>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="profils_details_vendor">
                            <div className="profile_left">
                                <h4>Email:</h4>
                            </div>
                            <div className="profile_right">
                                <h4>{profileDetails.email}</h4>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="profils_details_vendor">
                            <div className="profile_left">
                                <h4>Phone Number:</h4>
                            </div>
                            <div className="profile_right">
                                <h4>{profileDetails.phone}</h4>
                            </div>
                        </div>
                    </li>
                </ul>
                <div className="btn_left_table">
                    <Link to="/account-edit" className="theme-btn-one bg-black btn_sm">Edit Profile</Link>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) =>
({
    ProfileData: state.AllReducer.ProfileData || [],
});
export default connect(mapStateToProps)(Profile);