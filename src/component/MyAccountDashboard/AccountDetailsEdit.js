import React,{useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect,useDispatch } from 'react-redux'
import img1 from '../../assets/img/team/team1.png'
import { Profile_Details } from '../../Redux/Action/allActions'
import { ProfileUpdate } from '../../Redux/Action/CreateActions'
import { ImageUrl } from '../../Redux/Utils/baseurl'
const AccountDetailsEdit = (props) => {
const ProfileData= JSON.parse(localStorage.getItem("data")) 
const [error_msg,seterror_msg]=useState("") 
const history = useHistory();
let dispatch=useDispatch()
const routeChange = () => {
    history.goBack()
  };
  const[profileDetails,setprofileDetails]=useState([])
  const [upload,setupload]=useState("")
  const [getImage,segetImage]=useState("")
  const [UserDetail,setUserDetail]=useState({ f_name:"", l_name:"",email:"",password:"",new_password:"",confirm_pass:"", })
  let h__register=props?.header
  const onChangeData=(data,key)=>{
    
      setUserDetail((prevState) => ({
          ...prevState,
          [key]: data,
      }));
  }
  const OnUplodFileChange = (data) => {
    var self = this;
    var reader = new FileReader();
    var file = data.target.files[0];

    reader.onload = function (upload) {
      setupload(upload.target.result);
      segetImage(upload.target.result)
    };
    reader.readAsDataURL(file);
  };


       useEffect(()=>{
        dispatch(Profile_Details())
       },[])
       useEffect(()=>{
        setprofileDetails(props.ProfileData)
       },[props.ProfileData])
       useEffect(()=>{
        UserDetail.f_name=profileDetails.first_name || ""
        UserDetail.l_name=profileDetails.last_name || ""
        UserDetail.email=profileDetails.email || ""
        setUserDetail((prevState) => ({
            ...prevState,
        }));
        setupload(profileDetails.photo || "")
      
        // UserDetail.password=profileDetails.phone
       },[profileDetails])
       useEffect(()=>{
        if(UserDetail.new_password===UserDetail.confirm_pass){
            seterror_msg("")
        }
       },[UserDetail])
    const Submit=(e)=>{
        e.preventDefault();
        if(UserDetail.new_password===UserDetail.confirm_pass){
        dispatch(ProfileUpdate(UserDetail,getImage!=""?upload:getImage)).then(()=>{
            history.push('/my-account/customer-account-details')
        })
       }else{
        seterror_msg("Password Does not Match")
       }
     }
console.log("upload",upload)
    return (
    <>
    <section id="account_edit" className="pt-100 pb-100">
        <div className="container">
            <div className="row">
            <div className="col-lg-6">
                    <div className="back_btn">
                       <Link to="/" onClick={routeChange}><i className="fa fa-arrow-left"></i>Back to Dashboard</Link>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-3">
                    <div className="account_thumd">
                        <div className="account_thumb_img">
                            <img src={getImage===""&&upload===""?img1:upload!==""&&getImage!==""?getImage:ImageUrl+upload} alt="img" style={{width:"200px",height:"200px"}}/>
                            <div className="fixed_icon"><input type="file" onChange={OnUplodFileChange}/><i className="fa fa-camera"></i></div>
                        </div>
                        <h4>{profileDetails.first_name}</h4>
                        <p>{profileDetails.last_name}</p>
                    </div>
                </div>
                <div className="col-lg-9">
                    <div className="account_setting">
                        <div className="account_setting_heading">
                            <h2>Account Details</h2>
                            <p>Edit your account settings and change your password here.</p>
                        </div>
                        <form id="account_info_form" onSubmit={(e) =>Submit(e)}>
                            {/* <div className="input-radio">
                                <span className="custom-radio"><input type="radio" value="1" name="id_gender" defaultChecked/> Mr.</span>
                                <span className="custom-radio"><input type="radio" value="1" name="id_gender"/> Mrs.</span>
                            </div> */}
                            <div className="form-group">
                                <label htmlFor="f_name">Name</label>
                                <input type="text" className="form-control" id="f_name" placeholder="First Name" required value={UserDetail.f_name} onChange={(data)=>onChangeData(data.target.value,"f_name")}/>
                                <input type="text" className="form-control" placeholder="Last Name" required  value={UserDetail.l_name}  onChange={(data)=>onChangeData(data.target.value,"l_name")}/>
                            </div>
                            <div className="form-group">
                                <label  htmlFor="email_address">Email Address</label>
                                <input type="email" className="form-control" id="email_address"
                                    placeholder="our email address is demo123@gmail.com" required value={UserDetail.email}  onChange={(data)=>onChangeData(data.target.value,"email")}/>
                            </div>
                            <div className="form-group">
                                <label  htmlFor="current_password">Current Password</label>
                                {/* <input type="password" className="form-control" id="current_password"
                                    placeholder="Enter your current password" required  value={ProfileData.password} onChange={(data)=>onChangeData(data.target.value,"password")}/> */}
                                <input type="password" className="form-control" minLength={6} id="new_password"
                                    placeholder="Enter your new password" value={UserDetail.new_password} onChange={(data)=>onChangeData(data.target.value,"new_password")}/>
                                <input type="password" className="form-control" minLength={6} id="re_password"
                                    placeholder="Re-type your new password" required={UserDetail.new_password!==""&&true} value={UserDetail.confirm_pass} onChange={(data)=>onChangeData(data.target.value,"confirm_pass")}/>
                                <div style={{lineHeight:0,fontSize:"13px",color:"red"}}>{error_msg}</div>
                            </div>
                            <button type="submit" className="theme-btn-one bg-black btn_sm">Update Information</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
        </>
    )
}


const mapStateToProps = (state) =>
({
    ProfileData: state.AllReducer.ProfileData || [],
});
export default connect(mapStateToProps)(AccountDetailsEdit);