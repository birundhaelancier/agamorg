import React, { useEffect, useState } from 'react'
import { useSelector,connect,useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { WISHLIST_FAVORITES } from '../../Redux/Utils/constant'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { ProductData } from '../../app/data/productsData'
import { Order_List,UpdateOrder } from '../../Redux/Action/allActions'
import { OrderUpdate } from '../../Redux/Action/CreateActions'
import { ImageUrl } from '../../Redux/Utils/baseurl'
import OrderDetails from '../../page/order';
import moment from 'moment'
const Orders = (props) => {
    let dispatch=useDispatch()
    const [StockList,setStockList]=useState([])
 
    useEffect(()=>{
        dispatch(Order_List())
    },[])
    useEffect(()=>{
        setStockList(props.order_list)
    },[props.order_list])
    const UpdateOrder=(id)=>{
     dispatch(OrderUpdate(id)).then(()=>{

     })
    }
    return (
        <>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="vendor_order_boxed pt-4">
                       <div className="mb-2">
                       <h4>Customer Orders</h4>
                       {/* <Link to="/vendor/add-products" data-toggle="tab" className="theme-btn-one bg-black btn_sm add_prod_button">Add Product</Link> */}
                       </div>
                        <div className="table-responsive">
                            <table className="table pending_table">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Order ID</th>
                                        <th scope="col">Executive Head</th>
                                        <th scope="col">Executive</th>
                                        <th scope="col">Product Name</th>
                                        <th scope="col">Qty</th>
                                        <th scope="col">Status</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {StockList && StockList.map((data, index)=>(
                                        <tr key={index}>
                                            
                                            {/* <td><Link to={ `/product-details-one/${data.id}`}><img width="70px" src={ImageUrl+data?.product?.photo} alt="img" /></Link></td> */}
                                            <td>{index+1}</td>
                                            <td>{moment(data.created_at).format("DD-MM-YYYY")}</td>
                                            <td>{data.noid}</td>
                                            <td>{data.executive}</td>
                                            <td>{data.executiveHead}</td>
                                            <td>{data.productName}</td>
                                            <td>{data.qty}</td>
                                            {data.status===0?
                                            // <td>{data.statusName}</td>
                                               <td> <button style={{background:"#3caf90",color:"#fff",fontWeight:"600",borderRadius:"10px",fontSize:"12px",padding:"5px 10px"}} onClick={()=>UpdateOrder(data.id)}><i className="fa fa-edit"></i>  Update</button></td> 
                                            :<td><span className="badge badge-info">{data.statusName}</span></td>}
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                   
                    </div>
                </div>
            </div>
        </>


    )
}

const mapStateToProps = (state) =>
({
    order_list: state.AllReducer.order_list || [],
});
export default connect(mapStateToProps)(Orders);

