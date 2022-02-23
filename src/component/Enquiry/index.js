import React,{useEffect, useState} from 'react'
import { useDispatch,connect } from 'react-redux'
// import Map from './Map'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { FarmerRegister_Enquiry } from '../../Redux/Action/LoginActions'
import { Package_List,City_List } from '../../Redux/Action/allActions'
const EnquiryArea = (props) => {
    let dispatch=useDispatch()
    const [Package,setPackage]=useState([])
    const [CityList,setCityList]=useState([])
    const [pincodeList,setpincodeList]=useState([])
    const [EnquiryDetail,setEnquiryDetail]=useState({ name:"", phone:"",email:"",pincode:"",city:"",total_area:"",floor:"",package:"",address:"",decrip:"" })
    const onChangeData=(data,key)=>{
        if(data&&key==="city"){
            var Data=props.City_List.filter((item)=>{
                return(item.id===Number(data))
                }
            )
            var s = Data[0]&&Data[0]?.pincode;
            var match = s.split(', ')
            let citydata=[]
            for ( var a in match)
            {
                citydata.push({id:a,name:match[a]})
            }
            setpincodeList(citydata)


        }
        setEnquiryDetail((prevState) => ({
            ...prevState,
            [key]: data,
        }));
    }

    const Submit=(e)=>{
        e.preventDefault();
            dispatch(FarmerRegister_Enquiry(EnquiryDetail)).then((res)=>{
                ClearState()
                if(res.payload.status===1){
                Swal.fire({
                    title: 'Success!',
                    text: "Registration Successfully",
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 5000
                  })
                }else if(res.payload.status===0){
                    Swal.fire({
                        title: 'Failed!',
                        text: res.payload.response,
                        icon: 'warning',
                        showConfirmButton: false,
                        timer: 5000
                    })   
                }
            }) 
    }
    const ClearState=()=>{
        let key=Object.keys(EnquiryDetail)
        key.map((data)=>{
            EnquiryDetail[data]=""
        })
        setEnquiryDetail((prevState) => ({
            ...prevState,
        }));
    }
    useEffect(()=>{
     dispatch(City_List())
     dispatch(Package_List())
   
    },[])
    useEffect(()=>{
        // setCityList()
        setPackage(props.Package_list)
        setCityList(props.City_List)
    },[props.Package_list,props.City_List])
      
    // Swal.fire('Thank You', 'We Got Your Message', 'success')
    console.log(EnquiryDetail,"EnquiryDetail")
    return (
        <>
            <section id="contact_area" className="ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="contact_form_one contact_info_wrapper">
                                <h3 className="text-center">Enquiry</h3>
                                <form onSubmit={(e) => Submit(e)}>
                                    <div className="row">
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="name" placeholder="Name" required  onChange={(data) => onChangeData(data.target.value, "name")} value={EnquiryDetail.name}/>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-6">
                                            <div className="form-group">
                                                <input type="number" className="form-control" name="phone" placeholder="Phone" required  onChange={(data) => onChangeData(data.target.value, "phone")} value={EnquiryDetail.phone}/>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="email" placeholder="Email" required onChange={(data) => onChangeData(data.target.value, "email")} value={EnquiryDetail.email}/>
                                            </div>
                                        </div>
                                       
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-6">
                                            <div className="form-group">
                                            <div className="select-input">
                                                    <select name="city" id="city" placeholder='City' required onChange={(data) => onChangeData(data.target.value, "city")} value={EnquiryDetail.city}>
                                                    <option value="">Select City</option>
                                                        {CityList.map((data)=>{
                                                        return( <option value={data.id}>{data.name}</option>
                                                        )})}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-6">
                                            <div className="form-group">
                                            <div className="select-input">
                                                    <select name="pincode" id="pincode" placeholder='pincode' required onChange={(data) => onChangeData(data.target.value, "pincode")} value={EnquiryDetail.pincode}>
                                                    <option value="">Select Pincode</option>
                                                        {pincodeList&&pincodeList.map((data)=>{
                                                        return( <option value={data.name}>{data.name}</option>
                                                        )})}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="totalarea" placeholder="Total Area(SQ.FT)" required onChange={(data) => onChangeData(data.target.value, "total_area")} value={EnquiryDetail.total_area}/>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-6">
                                            <div className="form-group">
                                                <input type="number" className="form-control" name="floor" placeholder="Floor" required onChange={(data) => onChangeData(data.target.value, "floor")} value={EnquiryDetail.floor}/>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-6">
                                            <div className="form-group">
                                                <div className="select-input">
                                                    <select name="package" id="package" placeholder='Package' required onChange={(data) => onChangeData(data.target.value, "package")} value={EnquiryDetail.package}>
                                                    <option value="">Select Package</option>
                                                        {Package.map((data)=>{
                                                        return( <option value={data.id}>{data.name}</option>
                                                        )})}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <textarea rows="7" className="form-control" name="address" placeholder="Address" onChange={(data) => onChangeData(data.target.value, "address")} value={EnquiryDetail.address}></textarea>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <textarea rows="7" className="form-control" name="description" placeholder="Description" onChange={(data) => onChangeData(data.target.value, "decrip")} value={EnquiryDetail.decrip}></textarea>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="submit_bitton_contact_one">
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
        </>
    )
}


const mapStateToProps = (state) =>
({
    Package_list: state.AllReducer.Package_list || [],
    City_List: state.AllReducer.City_List || [],
});
export default connect(mapStateToProps)(EnquiryArea);