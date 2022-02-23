import React,{useEffect} from 'react'
import Swal from 'sweetalert2'
import  axios  from 'axios'
import { apiurl } from '../../Redux/Utils/baseurl' 
import { CouponCode } from '../../Redux/Action/allActions'
import { useDispatch,connect } from 'react-redux'
const Coupon = (props) => {
    let dispatch=useDispatch()
    useEffect(()=>{
     dispatch(CouponCode())
    },[])
    useEffect(()=>{

    },[props.coupon_code])
    return (
        <>
            <div className="col-lg-6 col-md-6">
                {/* <div className="coupon_code left">
                    <h3>Coupon</h3>
                    <div className="coupon_inner">
                        <p>Enter your coupon code if you have one.</p>
                        <form onSubmit={(e) => { e.preventDefault(); Swal.fire('Error!!', 'Invalid Cuppon Code', 'error') }}>
                            <input className="mb-2" placeholder="Coupon code" type="text" required />
                            <button type="submit" className="theme-btn-one btn-black-overlay btn_sm">Apply coupon</button>
                        </form>
                    </div>
                </div> */}
            </div>
        </>
    )
}

const mapStateToProps = (state) =>
({
    coupon_code: state.AllReducer.coupon_code || [],
});
export default connect(mapStateToProps)(Coupon);