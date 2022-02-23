import React, { useEffect, useState } from 'react'
import { useSelector,connect,useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { WISHLIST_FAVORITES } from '../../Redux/Utils/constant'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { ProductData } from '../../app/data/productsData'
const AllProduct = (props) => {
    let dispatch=useDispatch()
    // const [products, setProducts] = useState(useSelector((state) => state.products.products))
    const [page, setPage] = useState(1)
    // let allData = [...useSelector((state) => state.products.products)];

    const randProduct = (page) => {
        // if(page){
        //     let data = allData.sort((a, b) => 0.5 - Math.random())
        //     data = data.slice(0,9);
        //     setProducts(data);
        //     setPage(page);
        // }
    }
    useEffect(()=>{
        dispatch({type:WISHLIST_FAVORITES,payload:{carts:ProductData.slice(5,8),favorites:ProductData.slice(9,12)}})
    },[])
    return (
        <>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="vendor_order_boxed pt-4">
                       <div className="mb-2">
                       <h4>Products</h4>
                       <Link to="/vendor/add-products" data-toggle="tab" className="theme-btn-one bg-black btn_sm add_prod_button">Add Product</Link>
                       </div>
                        <div className="table-responsive">
                            <table className="table pending_table">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">Product Name</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Stock</th>
                                        <th scope="col">Sales</th>
                                        <th scope="col">Edit/Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props?.Products?.favorites?.map((data, index)=>(
                                        <tr key={index}>
                                            <td><Link to={ `/product-details-one/${data.id}`}><img width="70px" src={data.img} alt="img" /></Link></td>
                                            <td><Link to={ `/product-details-one/${data.id}`}>{data.title}</Link></td>
                                            <td>{data.category}</td>
                                            <td>₹{data.price}</td>
                                            <td>{parseInt(data.price)*2}</td>
                                            <td>{parseInt(data.price)*3}</td>
                                            {/* <td><Link to="/vendor/add-products"><i className="fa fa-edit"></i></Link> <button style={{background:"Transparent"}}><i className="fa fa-trash"></i></button></td> */}
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                        <div className="col-lg-12">
                        <ul className="pagination">
                                        <li className="page-item" onClick={(e) => { randProduct(page >1?page-1:0) }}>
                                            <a className="page-link" href="#!" aria-label="Previous">
                                                <span aria-hidden="true">«</span>
                                            </a>
                                        </li>
                                        <li className={"page-item "+ (page === 1?"active":null)} onClick={(e) => { randProduct(1) }}><a className="page-link" href="#!">1</a></li>
                                        <li className={"page-item "+ (page === 2?"active":null)}  onClick={(e) => { randProduct(2) }}><a className="page-link" href="#!">2</a></li>
                                        <li className={"page-item "+ (page === 3?"active":null)}  onClick={(e) => { randProduct(3) }}><a className="page-link" href="#!">3</a></li>
                                        <li className="page-item" onClick={(e) => { randProduct(page <3?page+1:0) }}>
                                            <a className="page-link" href="#!" aria-label="Next">
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
    Products: state.AllReducer.Wish_Fav_List || [],
});
export default connect(mapStateToProps)(AllProduct);

{/* <>
<div className="row">
    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="vendor_order_boxed pt-4">
           <div className="mb-2">
           <h4 style={{textAlign:"center"}}>My Wallet</h4>
           </div>
           <div style={{textAlign:"center",color:"green",padding:"20px 0px",fontSize:"20px"}}>Total Balance</div>
           <div  style={{textAlign:"center",padding:"0px 0px",fontSize:"20px",fontWeight:"bold"}}>35600.00</div>
           <div className="default-form-box" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                                        <input type="text"  style={{borderRadius:"50px",marginTop:"20px",width:"60%",height:"50px"}} className="form-control" required defaultValue="500" minLength="8"/>
                                    </div>
                                    <div className="login_submit"  style={{margin:"30px 0px 0px 0px"}}>
                                        <button className="theme-btn-one btn-black-overlay btn_md" type="submit">Top Up Wallet</button>
                                    </div>
                                    <h3 style={{}}>My Transactions</h3>
                                    <div>
                                        {[...Array(3)].map((data)=>
                                        <>
                                        <div className="trans__parent">
                                           <div>
                                            <ArrowDownwardIcon/>
                                            <div><label style={{fontWeight:"500"}}>Received</label><label>Wednesday,12-3-2022</label></div>
                                            </div>
                                            <div  style={{fontWeight:"500"}}><label style={{fontWeight:"500",color:"green"}}>Success</label><label>₹500.00</label></div> 
                                        </div>
                         
                                        <div className="trans__parent">
                                           <div>
                                            <ArrowUpwardIcon/>
                                            <div><label style={{fontWeight:"500"}}>Sent</label><label>Monday,20-4-2022</label></div>
                                            </div>
                                            <div  style={{fontWeight:"500"}}><label style={{fontWeight:"500",color:"green"}}>Success</label><label>₹1000.00</label></div> 
                                        </div>
                                        </>
                                        )}
                                    </div>

            <div className="col-lg-12">
         
            </div>
        </div>
    </div>
</div>
</> */}