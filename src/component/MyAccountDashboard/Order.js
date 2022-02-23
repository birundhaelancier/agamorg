



import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { UserOrders } from '../../Redux/Action/allActions'
import { connect, useDispatch } from 'react-redux'
import moment from 'moment'
const Order = (props) => {
    let dispatch=useDispatch()
    const [OrderDetails,setOrderDetails]=useState([])
    useEffect(()=>{
      dispatch(UserOrders())
    },[])
    useEffect(()=>{
        setOrderDetails(props.Orders)
    },[props.Orders])
    return (
        <>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="vendor_order_boxed">
                        <h4>All Order</h4>
                        <div className="table-responsive">
                            <table className="table pending_table">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Payment Type</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Action</th>

                                    </tr>
                                </thead>
                                {OrderDetails?.map((data)=>
                                <tbody>
                                <tr>
                                    {/* <td><Link to={`/invoice-one/${data.id}`} className="text-primary">#{data.txnid}</Link></td> */}
                                    <td>{moment(data.created_at).format("DD-MM-YYYY")}</td>
                                    <td>{data.payment_method}</td>
                                    <td><span className={`badge ${data.order_status==="Pending"?"badge-warning":data.order_status==="Completed"?"badge-success":"badge-info"}`}>{data.order_status}</span></td>
                                    <td>₹{data.orderTotal}</td>
                                    <td><Link to={`/order-success/${data.id}`} className="view">view</Link></td>

                                </tr>
                                
                                </tbody>
                                )}
                            </table>
                        </div>
                        <div className="col-lg-12">
                            <ul className="pagination">
                                <li className="page-item">
                                    <a href="#!" className="page-link">
                                        <span aria-hidden="true">«</span>
                                    </a>
                                </li>
                                <li className="page-item active"><a href="#!" className="page-link">1</a></li>
                                <li className="page-item"><a href="#!" className="page-link">2</a></li>
                                <li className="page-item"><a href="#!" className="page-link">3</a></li>
                                <li className="page-item">
                                    <a href="#!" className="page-link">
                                        <span aria-hidden="true">»</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
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
export default connect(mapStateToProps)(Order);