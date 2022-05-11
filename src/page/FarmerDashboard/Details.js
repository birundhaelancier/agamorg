import React,{useEffect,useState} from 'react';
import { useHistory,Link } from 'react-router-dom';
import image1 from '../../assets/img/bigimage2.jpg'
import { useDispatch,connect } from 'react-redux'
import { Profile_Details } from '../../Redux/Action/allActions'
import { ImageUrl } from '../../Redux/Utils/baseurl'
import avater from '../../assets/img/common/avater.png'
 function Details(props) {
 let history=useHistory()
 let dispatch=useDispatch()
 const [profileDetails,setprofileDetails]=useState([])
 useEffect(()=>{
  dispatch(Profile_Details())
 },[])
 useEffect(()=>{
     setprofileDetails(props.ProfileData)
 },[props.ProfileData])
 console.log("rrrrr",profileDetails,props.Farmer_Posts.length)
  return(
      <div>
          <div className='post_div'>
          <div className='details_comp'>
              <div><img src={profileDetails?.users?.photo===null?avater:ImageUrl+profileDetails?.users?.photo} style={{width:"90px",height:"90px",borderRadius:"50%"}}/>
              <div className='detai_div' style={{padding:"10px 0px"}}><label>{profileDetails?.users?.first_name} </label><label>{profileDetails?.users?.phone}</label></div></div>
              <div><label>{props?.Farmer_Posts?.length}</label><label>Posts</label></div>
              <div onClick={()=>history.push("/farmer-followers")}><label>0</label><label>Followers</label></div>
              <div onClick={()=>history.push("/farmer-followers")}><label>0</label><label>Following</label></div>
          </div>
          </div>
         
          <div className='edit_pro'>
              <label onClick={()=>history.push("/vendor/vendor-profile")}>Edit Profile</label><label><i class="fa fa-user"></i></label>
          </div>

      </div>
  );
}
const mapStateToProps = (state) =>
({
    ProfileData: state.AllReducer.ProfileData || [],
    Farmer_Posts:state.AllReducer.Farmer_Posts || []
});
export default connect(mapStateToProps)(Details);