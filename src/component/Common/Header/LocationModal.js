import React,{useState} from 'react'
import logo from '../../../assets/img/agamlogo.png'
// import logo2 from '../../../assets/img/logo3.png'
import img from '../../../assets/img/product-image/product4.jpg'
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom'
import { PinCode_Submit } from '../../../Redux/Action/CreateActions'
import { useDispatch } from 'react-redux';

const LocationModal = (props) => {
    let dispatch=useDispatch()
    const [pincode,setpincode]=useState("")
    const Submit=()=>{
        dispatch(PinCode_Submit(pincode)).then(()=>{
            props.start()
            setTimeout(()=>{
            window.location.reload()
            },3000)

        })
    }
    return (
        <div className='location_point'>
            <Modal show={props.show} 
                // size="sm"
                aria-labelledby="contained-modal-title-vcenter" centered  className='location_point'>
                        {/* <Modal.Header closeButton>
                        <Modal.Title>Choose Your Location</Modal.Title>
                          
                       </Modal.Header> */}
                        <Modal.Body>
                        <button type="button" className="close" style={{bottom:0,right:0}} data-dismiss="modal" aria-label="Close" onClick={props.start}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div className='login-input'>
                                <form onSubmit={(e) => { Submit();e.preventDefault(); }}>
                                    <div className="default-form-box">
                                        <label>Enter your pincode<span className="text-danger">*</span></label>
                                        <input type="number" className="form-control" required defaultValue="elancier123"  onChange={(data)=>setpincode(data.target.value)} minLength="6" required/>
                                    </div>
                                    <div className="btnShow">
                                        <button className="theme-btn-one btn-black-overlay btn_md" type="submit">Apply</button>
                                    </div>
                            
                                </form>
                            </div>
                           
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default LocationModal;