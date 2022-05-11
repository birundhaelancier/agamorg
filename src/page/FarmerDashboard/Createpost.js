import plus from '../../assets/img/plus.png'
import React,{useEffect, useState} from 'react'
// import logo2 from '../../../assets/img/logo3.png'
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { Create_Post,Update_Post } from '../../Redux/Action/CreateActions'
const Createpost = (props) => {
    let dispatch=useDispatch()
    const [CreateData,setCreateData]=useState({title:"",upload:""})
    const [upload,setupload]=useState("")
    const [pincode,setpincode]=useState("")
    const Submit=()=>{
      if(props?.Edit==="edit"){
        dispatch(Update_Post(CreateData,props?.EditData?.id)).then(()=>{
          HandleCancel()
          props.start()
        }) 
      }else{
       dispatch(Create_Post(CreateData)).then(()=>{
        HandleCancel()
        props.start()
       })
      }
    }
    const OnChangeData=(e)=>{
      if(e.target.name==="upload"){
      var reader = new FileReader();
      var file = e.target.files[0];
  
      reader.onload = function (upload) {
        setCreateData((prevState) => ({
          ...prevState,
          [e.target.name]:upload.target.result
        }));
      };
      reader.readAsDataURL(file);
    }else{
      setCreateData((prevState) => ({
        ...prevState,
        [e.target.name]:e.target.value
      }));
    }
    
    }
    const HandleCancel=()=>{
      let Key=["title","upload"]
      Key.map((data)=>{
        CreateData[data]=""
      })
    }
    useEffect(()=>{
      CreateData.title=props?.EditData?.title
      setupload(props?.EditData?.image)
      setCreateData((prevState) => ({
        ...prevState,
      }));
    },[props.EditData])
    console.log("check",props.Edit)
    return (
        <div className='location_point'>
            <Modal show={props.show} 
                // size="sm"
                aria-labelledby="contained-modal-title-vcenter" centered  className='location_point'>
                        {/* <Modal.Header closeButton>
                        <Modal.Title>Create Post</Modal.Title>
                          
                       </Modal.Header> */}
                        <Modal.Body>
                        <button type="button" className="close" style={{bottom:0,right:0}} data-dismiss="modal" aria-label="Close" onClick={props.start}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div className='login-input'>
                                <form onSubmit={(e) => { Submit();e.preventDefault(); }}>
                                <div className="default-form-box">
                                        <label>Title<span className="text-danger">*</span></label>
                                        <input type="text" name="title" className="form-control" required value={CreateData.title}  onChange={(data)=>OnChangeData(data)}  required/>
                                    </div>
                                    <div className="default-form-box">
                                        <label>Upload Image<span className="text-danger">*</span></label>
                                        <input type="file" name="upload" className="form-control" required  onChange={(data)=>OnChangeData(data)}  required/>
                                    </div>
                                    {upload && <img src={CreateData.upload || "https://elancier.in/agam/assets/post/"+upload}/>}
                                    <div className="btnShow">
                                        <button className="theme-btn-one btn-black-overlay btn_md" type="submit">{props?.Edit==="edit"?"Update":"Create"}</button>
                                    </div>
                            
                                </form>
                            </div>
                           
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Createpost;