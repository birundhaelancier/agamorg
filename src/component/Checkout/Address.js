import React,{useState,useEffect} from 'react'
import { useDispatch,connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Profile_Details,Get_Address_List } from '../../Redux/Action/allActions'
const AddressDetail = (props) => {
    let dispatch=useDispatch()
    const [profileDetails,setprofileDetails]=useState([])
    useEffect(()=>{
     dispatch(Profile_Details())
     dispatch(Get_Address_List())
    },[])
    useEffect(()=>{
        setprofileDetails(props.ProfileData)
    },[props.ProfileData,props.Address_list])
    console.log(props.Address_list)
    const  Details =props?.Address_list
    return (
        <div className='Address_detail'>
            <div className="vendors_profiles">
                <ul>
                    <li>
                        <div className="profils_details_vendor">
                            <div className="profile_left">
                                <h4>First Name:</h4>
                            </div>
                            <div className="profile_right">
                                <h4>{profileDetails.first_name || "-"}</h4>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="profils_details_vendor">
                            <div className="profile_left">
                                <h4>Last Name:</h4>
                            </div>
                            <div className="profile_right">
                                <h4>{profileDetails.last_name || "-"}</h4>
                            </div>
                        </div>
                    </li>
                    
                    <li>
                        <div className="profils_details_vendor">
                            <div className="profile_left">
                                <h4>Phone Number:</h4>
                            </div>
                            <div className="profile_right">
                                <h4>{profileDetails.phone || "-"}</h4>
                            </div>
                        </div>
                    </li>

                    <li>
                        <div className="profils_details_vendor">
                            <div className="profile_left">
                                <h4>Email:</h4>
                            </div>
                            <div className="profile_right">
                                <h4>{profileDetails.email || "-"}</h4>
                            </div>
                        </div>
                    </li>

                    <li>
                        <div className="profils_details_vendor">
                            <div className="profile_left">
                                <h4>City:</h4>
                            </div>
                            <div className="profile_right">
                                <h4>{Details[0]?.city || "-"}</h4>
                            </div>
                        </div>
                    </li>

                    <li>
                        <div className="profils_details_vendor">
                            <div className="profile_left">
                                <h4>Pincode:</h4>
                            </div>
                            <div className="profile_right">
                                <h4>{Details[0]?.pincode || "-"}</h4>
                            </div>
                        </div>
                    </li>

                    <li>
                        <div className="profils_details_vendor">
                            <div className="profile_left">
                                <h4>Address:</h4>
                            </div>
                            <div className="profile_right">
                                <h4>{Details[0]?.address || "-"}</h4>
                            </div>
                        </div>
                    </li>



                </ul>
                {/* <div className="btn_left_table">
                    <Link to="/account-edit" className="theme-btn-one bg-black btn_sm">Edit Profile</Link>
                </div> */}
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>
({
    ProfileData: state.AllReducer.ProfileData || [],
    Address_list:state.AllReducer.Address_list || []
});
export default connect(mapStateToProps)(AddressDetail);