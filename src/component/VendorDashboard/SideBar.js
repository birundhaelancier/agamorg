import { notification } from 'antd';
import React from 'react'
import { Link , useLocation,useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
const SideBar = () => {
    const location = useLocation()
    const history = useHistory()
    // let status = useSelector((state) => state.user.status);
    const logout = () => {
        localStorage.removeItem("data")
        localStorage.removeItem("UserId")
        notification.success({
            message: 'Logout Sucessfull',
        })
        history.push("/");
    }
    return (
        <>
            <div className="col-sm-12 col-md-12 col-lg-3">
                    <div className="dashboard_tab_button">
                        <ul role="tablist" className="nav flex-column dashboard-list">
                            <li><Link to="/my-account" className={location.pathname === '/my-account'?'active':null}><i className="fa fa-tachometer"></i>DashBoard</Link></li>
                            <li><Link to="/farmer-order-details" className={location.pathname === '/farmer-order-details'?'active':null}><i className="fa fa-user"></i>Customer Order</Link></li>


                            <li> <Link to="/vendor/all-product" className={location.pathname === '/vendor/all-product'?'active':null}><i className="fa fa-shopping-cart"></i>Stock List</Link></li>

                            <li><Link to="/farmer-dashboard" className={location.pathname === '/farmer-dashboard'?'active':null}><i className="fa fa-shopping-bag"></i>Posts</Link></li>


                            {/* <li><Link to="/my-account/customer-address" className={location.pathname === '/my-account/customer-address'?'active':null}><i className="fa fa-id-badge"></i>Cart</Link></li> */}

                            <li><Link to="/vendor/all-order" className={location.pathname === '/vendor/all-order'?'active':null}><i className="fa fa-cart-plus "></i>My Orders</Link></li>

                            <li><Link to="/vendor/vendor-profile" className={location.pathname === '/vendor/vendor-profile'?'active':null}><i className="fa fa-user-circle"></i>My Account</Link></li>

                            {
                              JSON.parse(localStorage.getItem("data"))?.email!==null || JSON.parse(localStorage.getItem("data")).mobile!==null?<li><Link to="/#!" onClick={(e)=>{e.preventDefault();logout()}}><i className="fa fa-sign-out"></i>logout</Link></li>:null
                        }
                        </ul>
                    </div>
                </div>
        </>
    )
}

export default SideBar
