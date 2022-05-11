import React,{useEffect, useState} from 'react'
import { useDispatch,connect } from 'react-redux'
// import Map from './Map'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Radio } from 'antd';
import { OutSideFarmer } from '../../Redux/Action/CreateActions'
import { Package_List,City_List } from '../../Redux/Action/allActions'
import Header from '../../component/Common/Header'
import Footer from '../../component/Common/Footer'
import Labelbox from '../../component/labelbox/labelbox'
import ValidationLibrary from '../../component/validationfunction'
import Avatar from './Upload'
const EnquiryArea = (props) => {
    let dispatch=useDispatch()
    const [Package,setPackage]=useState([])
    const [CityList,setCityList]=useState([])
    const [pincodeList,setpincodeList]=useState([])
    const [Detail,setDetail]=useState({ 
    first_name: {  value: "", validation: [{ name: "required" }], error: null, errmsg: null,},
    last_name: {  value: "", validation: [{ name: "required" }], error: null, errmsg: null,},
    phone: {  value: "", validation: [{ name: "required" },{name:"mobilenumber"}], error: null, errmsg: null,},
    dob: {  value: "", validation: [{ name: "required" }], error: null, errmsg: null,},
    pincode: {  value: "", validation: [{ name: "required" },{name:"Pincode"}], error: null, errmsg: null,},
    city: {  value: "", validation: [{ name: "required" }], error: null, errmsg: null,},
    gender: {  value: "", validation: [{ name: "required" }], error: null, errmsg: null,},
    age: {  value: "", validation: [{ name: "required" }], error: null, errmsg: null},
    qualification: {  value: "", validation: [{ name: "required" }], error: null, errmsg: null},
    district: {  value: "", validation: [{ name: "required" }], error: null, errmsg: null},
    phone1: {  value: "", validation: [{name:"mobilenumber"}], error: null, errmsg: null},
    address: {  value: "", validation: [{ name: "required" }], error: null, errmsg: null},
    company_name: {  value: "", validation: [{ name: "required" }], error: null, errmsg: null},
    upload: {  value: "", validation: [], error: null, errmsg: null},
    })
 
    const onChangeData = (data,key,type) => {
        
        if(type==="image"){
               
            data.fileList.forEach(function(file, index) {
                let reader = new FileReader();
              
                reader.onload = (evn) => {
                    let dynObj = {
                        value: evn.target.result,
                    }
                   setDetail((prevState) => ({
                    ...prevState,
                    ["upload"]:dynObj,
                }));
                };
                reader.readAsDataURL(data.file.originFileObj);
              });
             
        }else{
            var errorcheck = ValidationLibrary.checkValidation(
                data,
                Detail[key].validation
            );
            let dynObj = {
                value: data,
                error: !errorcheck.state,
                errmsg: errorcheck.msg,
                validation: Detail[key].validation,
            };
    
            setDetail(prevState => ({
                ...prevState,
                [key]: dynObj,
            }));
    }
    }



    const Submit = (e) => {
        e.preventDefault();
        var mainvalue = {};
        var targetkeys = Object.keys(Detail);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                Detail[targetkeys[i]].value,
                Detail[targetkeys[i]].validation
            );
            Detail[targetkeys[i]].error = !errorcheck.state;
            Detail[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = Detail[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => Detail[obj].error == true);

        if (filtererr.length > 0) {
        } else {
            dispatch(OutSideFarmer(Detail)).then((res)=>{
                ClearState()
            }) 
        }
        setDetail((prevState) => ({
            ...prevState,
        }));
    }
    const ClearState=()=>{
        let key=Object.keys(Detail)
        key.map((data)=>{
            Detail[data].value=""
        })
        setDetail((prevState) => ({
            ...prevState,
        }));
    }
    useEffect(()=>{
     dispatch(City_List())
     dispatch(Package_List())
   
    },[])
    useEffect(()=>{
        // setCityList()
        let city_data=[]
        props.City_List.map((data)=>{
            city_data.push({id:data.id,value:data.name}) 
        })
        setCityList(city_data)
        setPackage(props.Package_list)
    },[props.Package_list,props.City_List])
    return (
        <>
        <Header/>
            <section id="contact_area farmer_form" className="ptb-100 farmer_form">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="contact_form_one contact_info_wrapper">
                                <h4 className="text-center">Outside Farmer / Seller</h4>
                                <form onSubmit={(e)=>Submit(e)} autoComplete="off">
                                    <div className="row">

                                       <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                                            <div className="form-group">
                                            <Labelbox type="text" labelname={"First Name"}
                                                 changeData={(data) => onChangeData(data, "first_name")}
                                                 value={Detail.first_name.value}
                                                 error={Detail.first_name.error}
                                                 errmsg={Detail.first_name.errmsg}
                                            />
                                                {/* <input type="text" className="form-control" name="first_name" value={Detail.first_name} placeholder="First Name" required  onChange={onChangeData}/> */}
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                                            <div className="form-group">
                                            <Labelbox type="text" labelname={"Last Name"}
                                                 changeData={(data) => onChangeData(data, "last_name")}
                                                 value={Detail.last_name.value}
                                                 error={Detail.last_name.error}
                                                 errmsg={Detail.last_name.errmsg}
                                            />
                                                {/* <input type="text" className="form-control" name="last_name" value={Detail.last_name} placeholder="Last Name" required onChange={onChangeData}/> */}
                                            </div>
                                        </div>
                                       
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                                            <div className="form-group">
                                            <Labelbox type="datepicker" labelname={"DOB"}
                                                 changeData={(data) => onChangeData(data, "dob")}
                                                 value={Detail.dob.value}
                                                 error={Detail.dob.error}
                                                 errmsg={Detail.dob.errmsg}
                                            />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                                            <div className="form-group formdiv">
                                            <div className='labeltxt'>Gender</div>
                                            <Radio.Group onChange={(e)=>onChangeData(e.target.value,"gender")} name="gender" value={Detail.gender.value}>

                                                     <Radio value={"Male"}> Male</Radio>{" "}

                                                     <Radio value={"Female"}> Female</Radio>
                                             </Radio.Group>
                                             <div className='Errormsg'>{Detail.gender.errmsg}</div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                                            <div className="form-group">
                                            <Labelbox type="number" labelname={"Age"}
                                                 changeData={(data) => onChangeData(data, "age")}
                                                 value={Detail.age.value}
                                                 error={Detail.age.error}
                                                 errmsg={Detail.age.errmsg}
                                            />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                                            <div className="form-group">
                                            <Labelbox type="text" labelname={"Qualification"}
                                                 changeData={(data) => onChangeData(data, "qualification")}
                                                 value={Detail.qualification.value}
                                                 error={Detail.qualification.error}
                                                 errmsg={Detail.qualification.errmsg}
                                            />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-12"> 
                                            <div className="form-group">
                                            <Labelbox type="text" labelname={"Pincode"}
                                                 changeData={(data) => onChangeData(data, "pincode")}
                                                 value={Detail.pincode.value}
                                                 error={Detail.pincode.error}
                                                 errmsg={Detail.pincode.errmsg}
                                            />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                                            <div className="form-group">
                                            <Labelbox type="text" labelname={"City"}
                                                 changeData={(data) => onChangeData(data, "city")}
                                                 value={Detail.city.value}
                                                 error={Detail.city.error}
                                                 errmsg={Detail.city.errmsg}
                                            />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                                            <div className="form-group">
                                            <Labelbox type="select" labelname={"District"}
                                                 changeData={(data) => onChangeData(data, "district")}
                                                 value={Detail.district.value}
                                                 error={Detail.district.error}
                                                 errmsg={Detail.district.errmsg}
                                                 dropdown={CityList}
                                            />
                                            </div>
                                        </div>
                                       
                                    
                                        
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                                            <div className="form-group">
                                            <Labelbox type="number" labelname={"Contact Number1"}
                                                 changeData={(data) => onChangeData(data, "phone")}
                                                 value={Detail.phone.value}
                                                 error={Detail.phone.error}
                                                 errmsg={Detail.phone.errmsg}
                                            />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                                            <div className="form-group">
                                            <Labelbox type="number" labelname={"Contact Number2"}
                                                 changeData={(data) => onChangeData(data, "phone1")}
                                                 value={Detail.phone1.value}
                                                 error={Detail.phone1.error}
                                                 errmsg={Detail.phone1.errmsg}
                                            />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                                            <div className="form-group formdiv">
                                            <Labelbox type="text" labelname={"Company Name"}
                                                 changeData={(data) => onChangeData(data, "company_name")}
                                                 value={Detail.company_name.value}
                                                 error={Detail.company_name.error}
                                                 errmsg={Detail.company_name.errmsg}
                                            />
                                            </div>
                                        </div>
                                       
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group formdiv">
                                                <div className='labeltxt'>Address Details</div>
                                                <textarea rows="7" className="form-control" name="address"  value={Detail.address.value} onChange={(e)=>onChangeData(e.target.value,"address")}></textarea>
                                            <div className='Errormsg'>{Detail.address.errmsg}</div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                                            <div className="form-group formdiv">
                                            <div className='labeltxt'>Image</div>
                                             <Avatar handleChange={(e)=>onChangeData(e,"upload","image")}/>
                                            </div>
                                        </div>
                                       
                                        
                                        <div className="col-lg-12 col-md-12 col-sm-6 col-12">
                                            <div className="submit_bitton_contact_one text-center">
                                                <button value="Submit" className="theme-btn-one btn-black-overlay btn_md">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                     
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}


const mapStateToProps = (state) =>
({
    Package_list: state.AllReducer.Package_list || [],
    City_List: state.AllReducer.City_List || [],
});
export default connect(mapStateToProps)(EnquiryArea);