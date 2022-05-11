import React,{useState,useEffect} from 'react'
import { useDispatch,connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { Profile_Details,Get_Address_List } from '../../Redux/Action/allActions'
const Address = (props) => {
    let history=useHistory()
    let dispatch=useDispatch()
    const [profileDetails,setprofileDetails]=useState([])
    useEffect(()=>{
     dispatch(Profile_Details())
     dispatch(Get_Address_List())
    },[])
    useEffect(()=>{
        setprofileDetails(props.ProfileData)
    },[props.ProfileData,props.Address_list])
    const  Details =props?.Address_list
    return (
        <>
            <div className="row">
                <div className="col-lg-6">
                    <div className="myaccount-content">
                        <h4 className="title">Billing Address</h4>
                        <div className="billing_address">
                            <h5><strong>{profileDetails.first_name} {profileDetails.last_name} </strong></h5>
                            <p>
                             {Details[0]?.address},<br />{Details[0]?.city===1&&"Madurai"},
                             <br/>{Details[0]?.pincode}
                            </p>
                            <p>Mobile: {profileDetails.phone}</p>
                            <button className="theme-btn-one bg-black btn_sm mt-4"  onClick={()=>history.push(`/checkout-one/${"no"}`)}>Edit
                               Address</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="myaccount-content">
                        <h4 className="title">Shipping Address</h4>
                        <div className="billing_address">
                            <h5><strong>Helen J Francis</strong></h5>
                            <p>
                             Travis street city	 <br /> Newyork, 90001
                            </p>
                            <p>Mobile: (458) 209-534-4814</p>
                            <button  className="theme-btn-one bg-black btn_sm mt-4">Edit
                                Address</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) =>
({
    ProfileData: state.AllReducer.ProfileData || [],
    Address_list:state.AllReducer.Address_list || []
});
export default connect(mapStateToProps)(Address);