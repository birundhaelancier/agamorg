import React,{useEffect,useState} from 'react'
import BarChart from '../VendorDashboard/BarChart'
import LineChart from '../VendorDashboard/LineChart'
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { UserOrders } from '../../Redux/Action/allActions'
import moment from 'moment'
import { ImageUrl } from '../../Redux/Utils/baseurl'
import { useDispatch,connect } from 'react-redux'
const DashBoard = (props) => {
    let dispatch=useDispatch()
    const [OrderDetails,setOrderDetails]=useState([])
    const [cartDetail,setcartDetail]=useState([])
    useEffect(()=>{
      dispatch(UserOrders())
    },[])
    useEffect(()=>{
        let Data=[]
        setOrderDetails(props.Orders)
        props.Orders.filter((data)=>{
            if(data.order_status==="Pending"){
            Data.push(data)
            }
        })
        setcartDetail(Data)

    },[props.Orders])
    console.log(cartDetail,"dddddddddddddd")

    return (

        <>
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <div className="vendor_top_box pt-4">
                        <h2>25</h2>
                        <h4>Total Orders</h4>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <div className="vendor_top_box">
                        <h2>2552</h2>
                        <h4>Total Delivery</h4>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <div className="vendor_top_box">
                        <h2>50</h2>
                        <h4>Total Pending</h4>
                    </div>
                </div>
            </div>
           
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="vendor_order_boxed pt-4">
                        <h4>Pending Orders</h4>
                        <table className="table pending_table">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">OrderId</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Price</th>
                                </tr>
                            </thead>
                            {/* <tbody> */}
                                {/* {products.slice(1, 5).map((data, index) => (
                                    <tr key={index}>
                                        <td><img width="52px" src={data.img} alt="img" /></td>
                                        <td>{data.title}</td>
                                        <td>₹{data.price}</td>
                                        <td>{parseInt(data.price) * 3}</td>
                                    </tr>
                                ))} */}

                           {cartDetail?.map((data)=>
                                <tbody>
                                <tr>

                                    <td><Link to={`/invoice-one/${data.id}`} className="text-primary">#{data.txnid}</Link></td>
                                    <td>{moment(data.created_at).format("DD-MM-YYYY")}</td>
                                    <td><span>₹{data.orderTotal}</span></td>

                                </tr>
                                
                                </tbody>
                                )}

                            {/* </tbody> */}
                        </table>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="vendor_order_boxed pt-4">
                        <h4>All Orders</h4>
                        <table className="table pending_table">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Order Id</th>
                                    <th scope="col">Product Details</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            {OrderDetails?.map((data)=>{
                            return(
                            <tbody>
                                <tr>
                                    <td><Link to={`/invoice-one/${data.id}`} className="text-primary">#{data.txnid}</Link></td>
                                    <td>{moment(data.created_at).format("DD-MM-YYYY")}</td>
                                    <td><span className={`badge ${data.order_status==="Pending"?"badge-warning":data.order_status==="Completed"?"badge-success":"badge-info"}`}>{data.order_status}</span></td>
                                </tr>                                
                            </tbody>
                            )})}
                            
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) =>
({
    Orders: state.AllReducer.Orders || []
});
export default connect(mapStateToProps)(DashBoard);