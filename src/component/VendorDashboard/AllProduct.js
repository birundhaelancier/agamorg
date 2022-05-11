import React, { useEffect, useState } from 'react'
import { useSelector,connect,useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { WISHLIST_FAVORITES } from '../../Redux/Utils/constant'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { ProductData } from '../../app/data/productsData'
import { Stock_List } from '../../Redux/Action/allActions'
import { ImageUrl } from '../../Redux/Utils/baseurl'
const AllProduct = (props) => {
    let dispatch=useDispatch()
    const [StockList,setStockList]=useState([])
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
        dispatch(Stock_List())
        // dispatch({type:WISHLIST_FAVORITES,payload:{carts:ProductData.slice(5,8),favorites:ProductData.slice(9,12)}})
    },[])
    useEffect(()=>{
        setStockList(props.Products)
    },[props.Products])
    console.log("cheehhh",props.Products)
    return (
        <>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="vendor_order_boxed pt-4">
                       <div className="mb-2">
                       <h4>Products</h4>
                       {/* <Link to="/vendor/add-products" data-toggle="tab" className="theme-btn-one bg-black btn_sm add_prod_button">Add Product</Link> */}
                       </div>
                        <div className="table-responsive">
                            <table className="table pending_table">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">Product Name</th>
                                        {/* <th scope="col">Category</th> */}
                                        <th scope="col">Price</th>
                                        <th scope="col">Stock</th>
                                        <th scope="col">Sales</th>
                                        {/* <th scope="col">Edit/Delete</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {StockList && StockList.map((data, index)=>(
                                        <tr key={index}>
                                            <td><Link to={ `/product-details-one/${data.id}`}><img width="70px" src={ImageUrl+data?.product?.photo} alt="img" /></Link></td>
                                            <td><Link to={ `/product-details-one/${data.id}`}>{data?.productName}</Link></td>
                                            <td>₹{data.product.discount_price}</td>
                                            <td>{data.product.stock}</td>
                                            <td>{"-"}</td>
                                            {/* <td>{parseInt(data.price)*3}</td> */}
                                            {/* <td><Link to="/vendor/add-products"><i className="fa fa-edit"></i></Link> <button style={{background:"Transparent"}}><i className="fa fa-trash"></i></button></td> */}
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                        {/* <div className="col-lg-12">
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
                        </div> */}
                    </div>
                </div>
            </div>
        </>


    )
}

const mapStateToProps = (state) =>
({
    Products: state.AllReducer.Stock_list || [],
});
export default connect(mapStateToProps)(AllProduct);

