import React, { useState, useEffect,Fragment } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/agamlogo.png";
import logoWhite from "../../../assets/img/agamlogo.png";
import { MenuData } from "./MenuData";
import NaveItems from "./NaveItems";
import TopHeader from "./TopHeader";
import { useHistory } from "react-router-dom";
import svg from "../../../assets/img/svg/cancel.svg";
import svgsearch from "../../../assets/img/svg/search.svg";
import LocationModal from "./LocationModal";
import { useDispatch, useSelector,connect } from "react-redux";
import Swal from "sweetalert2";
import List from "@mui/material/List";
import { ListItemButton,ListItemText,Collapse } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { ProductData } from '../../../app/data/productsData'
import { WISHLIST_FAVORITES } from '../../../Redux/Utils/constant'
import { Get_Wishlist,SearchCategory } from '../../../Redux/Action/allActions'
import { DeleteWishlist } from '../../../Redux/Action/CreateActions'
import { apiurl, ImageUrl } from '../../../Redux/Utils/baseurl'
import TextField from '@mui/material/TextField';
import { Autocomplete,InputAdornment,Box} from '@mui/material';
import  { createFilterOptions } from '@mui/material/Autocomplete';
import NewsletterModal from '../NewModel'
import axios from 'axios'
// const MenuData = []
const Header = (props) => {
  const [click, setClick] = useState(false);
  const [searchValue,setsearchValue]=useState(null)
  const [login,setlogin]=useState(false)
  const [SearchList,setSearchList]=useState([])
  const [Category,setCategory]=useState([])
  const [FilterData,setFilterData]=useState([])
  const [WishListData,setWishListData]=useState([])
  const [show, setShow] = useState();
  const [location, setLocation] = useState(false);
  const [ShoopingCarts,setShoopingCarts]=useState(JSON.parse(window.localStorage.getItem("carts")) || [])
  const history = useHistory();
  const [open2, setOpen2] = useState(false);
  const [open, setOpen] = useState(false);


  let dispatch = useDispatch();

  const rmCartProduct = (id) => {
    Swal.fire({
      title: 'Success!',
      text: "Product Deleted Successfully",
      icon: 'success',
      showConfirmButton: false,
      timer: 1000
    })
    let arr = ShoopingCarts?.filter(item => item.id !== id)
    window.localStorage.setItem("carts",JSON.stringify(arr))
    PageReload()
  };
  const PageReload = () => {
        setTimeout(() => {
            window.location.reload();
        }, 2000)
    }
  const rmFavProduct = (id) => {
    dispatch(DeleteWishlist(id));
  };

  const cartTotal = () => {
    return ShoopingCarts?.reduce(function (total, item) {
      return total + item.discount_price*item.quantity;
    }, 0);
  };

  const handleClick = () => {
    if (click) {
      document.querySelector("#offcanvas-add-cart").style =
        "transform: translateX(100%);";
    } else {
      document.querySelector("#offcanvas-add-cart").style =
        "transform: translateX(0%);";
    }
    setClick(!click);
  };
  const handleWish = () => {
    if (click) {
      document.querySelector("#offcanvas-wishlish").style =
        "transform: translateX(100%);";
    } else {
      document.querySelector("#offcanvas-wishlish").style =
        "transform: translateX(0);";
    }
    setClick(!click);
  };

  const handleSearch = () => {
    if (click) {
      document.querySelector("#search").style =
        "transform: translate(-100%, 0); opacity: 0";
    } else {
      document.querySelector("#search").style =
        "transform: translate(0px, 0px); opacity: 1";
    }
    setClick(!click);
  };
  const handleabout = () => {
    if (click) {
      document.querySelector("#offcanvas-about").style =
        "transform: translateX(100%);";
    } else {
      document.querySelector("#offcanvas-about").style =
        "transform: translateX(0%);";
    }
    setClick(!click);
  };
  const handlemenu = () => {
    if (click) {
      document.querySelector("#mobile-menu-offcanvas").style =
        "transform: translateX(100%);";
    } 
    // else {
    //   document.querySelector("#mobile-menu-offcanvas").style =
    //     "transform: translateX(0%);";
    // }
    setClick(!click);
  };

  const handleShow = (value) => {
    value === show ? setShow("") : setShow(value);
  };

  // Sticky Menu Area
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });

  const isSticky = (e) => {
    const header = document.querySelector(".header-section");
    const scrollTop = window.scrollY;
    scrollTop >= 250
      ? header.classList.add("is-sticky")
      : header.classList.remove("is-sticky");
  };
  useEffect(()=>{
    dispatch(Get_Wishlist())
    dispatch({type:WISHLIST_FAVORITES,payload:{carts:ProductData.slice(5,8),favorites:ProductData.slice(9,12)}})
    axios({
      method: 'Get',
      url:"https://elancier.in/agam/api/category",
  })
  .then((response) => {
      setCategory(response.data)
  })
  dispatch(SearchCategory()).then((res)=>{
    let Data=[]
    res.payload.product.concat(res.payload.category).map((data)=>{
       Data.push(data)
    })
  setFilterData(res.payload)
  setSearchList(Data)

  })

  },[])

  useEffect(()=>{
    var Data=props.WishList.filter((data)=>{
      return data!==null
    })
    setWishListData(Data)
  },[props.WishList])
  const OnChangeCategory=(data)=>{
    history.push({
      pathname:`/shop/${data}`,
      state:props.Slug?props.Slug:data
    })
  }
useEffect(()=>{
  setShoopingCarts(JSON.parse(window.localStorage.getItem("carts")))
},[window.localStorage.getItem("carts")])
const ChangeSearchList=(event,data)=>{
  setsearchValue(data)
  FilterData.category.filter((item)=>{
    if(data?.name===item?.name){
      history.push(`/shop/${item.slug}`)
    }
  })
  FilterData.product.filter((item)=>{
    if(data?.name===item?.name){
      history.push(`/product-details-one/${item.slug}`)
    }
  })
  
}



  return (
    <>
      <TopHeader />
      <header className="header-section d-none d-xl-block">
        <div className="header-wrapper">
          <div className="header-bottom header-bottom-color--golden section-fluid sticky-header sticky-color--golden">
            <div className="container">
              <div className="row">
                <div className="col-12 d-flex align-items-center justify-content-between">
                  <div className="topSection">
                    <div className="header-logo">
                      <div className="logo">
                        <Link to="/">
                          <img src={logo} alt="logo" />
                        </Link>
                      </div>
                    </div>
                    <div className="logoTitle">
                      <div className="agamTitle">Agam</div>
                      <div className="organicTitle">org</div>
                    </div>
                  </div>
                  <div className="location_point"   onClick={() => setLocation(true)}>
                    <i
                      class="fa fa-map-marker loca"
                    
                      aria-hidden="true"
                    ></i>
                    <div className="l_div">
                      <div>Hello</div>
                      <div>Select Your Address</div>
                    </div>
                    {/* <input type="number" className="form-control" placeholder="Enter Your Pincode" required /> */}
                  </div>
                  <div className="SearchView">
                    <div className="search_space">
                      <div class="wrapper">

                        <div className="input-group md-form form-sm form-1 pl-0">
                          {/* <input
                            className="form-control my-0 py-1"
                            type="text"
                            placeholder="Search"
                            aria-label="Search"
                          /> */}
                      <Autocomplete 
                        onChange={(event, newValue) =>
                          ChangeSearchList(event,newValue)
                          
                        }
                          //  onInputChange={(event, value) => {
                          //     setsearchValue(value);
                          // }}
                        renderOption={(props, option) => (
                            
                                      <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                      {option.photo?<img
                                        loading="lazy"
                                        width="40"
                                        src={ImageUrl+option?.photo}
                                        alt=""
                                      />
                                      : <span style={{width:"40px"}}><i className="fa fa-search srch_btn"></i></span>}
                                      <span>{option?.name}</span>
                                    </Box>
                                 
                        )}
                      // getOptionLabel={(option) => option.name}
                      // filterOptions={filterOptions}
                      value={searchValue}
                      options={SearchList}
                      // disableClearable
                      // getOptionSelected={(option, value) => option.title === value.title}
                      getOptionLabel={(option) => option.name}
                     renderInput={(params) => (
                     <TextField {...params} size="Normal" InputLabelProps={{shrink:false}} InputProps={{...params.InputProps,type: 'search',
                       endAdornment: <InputAdornment>  <i className="fa fa-search search_icon"></i> </InputAdornment>,
                     }}
                    />
                      )}
                      />
                          <div className="input-group-prepend">
                           
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="btnShow">
                                            <button className="submitBtn" type="submit" >submit</button>
                                        </div> */}
                    {/* <div>
                                            <button className='searchBtnShow'>Search</button>
                                        </div>*/}
                  </div>

                  <ul className="header-action-link action-color--black action-hover-color--golden">
                    <li>
                      {WishListData?.length ? (
                        <a
                          href="#offcanvas-wishlish"
                          className="offcanvas-toggle"
                          onClick={handleWish}
                        >
                          <i className="fa fa-heart"></i>
                          <span className="item-count">{WishListData?.length}</span>
                        </a>
                      ) : (
                        <a
                          href="#offcanvas-wishlish"
                          className="offcanvas-toggle"
                        >
                          <i className="fa fa-heart"></i>
                          <span className="item-count">{WishListData?.length}</span>
                        </a>
                      )}
                    </li>
                    <li>
                      {ShoopingCarts?.length ? (
                        <a
                          href="#!"
                          className="offcanvas-toggle"
                          onClick={handleClick}
                        >
                          <i className="fa fa-shopping-bag"></i>
                          <span className="item-count">{ShoopingCarts?.length || 0}</span>
                        </a>
                      ) : (
                        <a href="#!" className="offcanvas-toggle">
                          <i className="fa fa-shopping-bag"></i>
                          <span className="item-count">{ShoopingCarts?.length || 0}</span>
                        </a>
                      )}
                    </li>

                    <li>
                      <a
                        href="#offcanvas-about"
                        className="offacnvas offside-about offcanvas-toggle"
                        onClick={handleabout}
                      >
                        <i className="fa fa-bars"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="header-wrappers">
                    <div className="header-bottom header-bottom-color--golden section-fluid sticky-header sticky-color--golden">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 d-flex align-items-center justify-content-between">

                                    <div className="main-menu menu-color--black menu-hover-color--golden d-none d-xl-block">
                                        <nav>
                                            <ul>
                                                {MenuData.map((item, index) => (
                                                    <NaveItems item={item} key={index} />
                                                ))}
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
      </header>
      {/* <header className="header-section d-none d-xl-block">
                <div className="header-wrapper">
                    <div className="header-bottom header-bottom-color--golden section-fluid sticky-header sticky-color--golden">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 d-flex align-items-center justify-content-between">

                                    <div className="main-menu menu-color--black menu-hover-color--golden d-none d-xl-block">
                                        <nav>
                                            <ul>
                                                {MenuData.map((item, index) => (
                                                    <NaveItems item={item} key={index} />
                                                ))}
                                            </ul>
                                        </nav>
                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </header> */}

      <div className="mobile-header sticky-header sticky-color--golden mobile-header-bg-color--golden section-fluid d-lg-block d-xl-none">
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex align-items-center justify-content-between">
              <div className="mobile-header-left  d-flex align-items-center">
                <ul className="mobile-menu-logo">
                  <li>
                    <a href="index.html">
                      <div className="logo footerlogoTitle">
                        <img src={logo} alt="logo" />
                        <div className='agamTitle'>Agam</div>
                                        <div className='organicTitle'>org</div>
                      </div>
                    </a>
                  </li>
                
                </ul>
              </div>

              <div className="mobile-right-side">
                <ul className="header-action-link action-color--black action-hover-color--golden">
                  <li>
                    <a
                      href="#!"
                      className="search_width"
                      onClick={handleSearch}
                    >
                      <img src={svgsearch} alt="img" />
                    </a>
                  </li>
                  <li>
                    {WishListData.length ? (
                      <a
                        href="#offcanvas-wishlish"
                        className="offcanvas-toggle"
                        onClick={handleWish}
                      >
                        <i className="fa fa-heart"></i>
                        <span className="item-count">{WishListData.length}</span>
                      </a>
                    ) : (
                      <a
                        href="#offcanvas-wishlish"
                        className="offcanvas-toggle"
                      >
                        <i className="fa fa-heart"></i>
                        <span className="item-count">{WishListData.length}</span>
                      </a>
                    )}
                  </li>
                  <li>
                    {ShoopingCarts?.length ? (
                      <a
                        href="#!"
                        className="offcanvas-toggle"
                        onClick={handleClick}
                      >
                        <i className="fa fa-shopping-bag"></i>
                        <span className="item-count">{ShoopingCarts?.length || 0}</span>
                      </a>
                    ) : (
                      <a href="#!" className="offcanvas-toggle">
                        <i className="fa fa-shopping-bag"></i>
                        <span className="item-count">{ShoopingCarts?.length || 0}</span>
                      </a>
                    )}
                  </li>
                  <li>
                    <a
                      href="#!"
                      className="offcanvas-toggle offside-menu"
                      onClick={handleabout}
                    >
                      <i className="fa fa-bars"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

   
      <div
        id="offcanvas-about"
        className="offcanvas offcanvas-rightside offcanvas-mobile-about-section"
      >
        <div className="mobile-menu-bottom">
          <div className="offcanvas-header text-right">
            <button className="offcanvas-close" onClick={handleabout}>
              <img src={svg} alt="icon" />
            </button>
          </div>
    
          <List
            sx={{ width: "100%", maxWidth: 360}}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton component={Link} to="/">
              <ListItemText primary="Home" />
              {/* <i class="fas fa-home"></i> */}
            </ListItemButton>
            <ListItemButton onClick={() => setOpen(!open)}>
              <ListItemText primary="Category" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto">
              <List component="div" disablePadding>
                {Category.map((data)=>{
                  return(
                <ListItemButton sx={{ pl: 4 }}  onClick={()=>OnChangeCategory(data.slug)}>
                  <ListItemText primary={data.name} />
                </ListItemButton>
                )})}
              </List>
            </Collapse>
            <ListItemButton component={Link} to="/shop">
              <ListItemText primary="Offer" />
            </ListItemButton>
            <ListItemButton component={Link} to="/blog-grid-three">
              <ListItemText primary="Post" />
            </ListItemButton>
            <ListItemButton onClick={() => setOpen2(!open2)}>
              <ListItemText primary="Contact Us" />
              {open2 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  component={Link}
                  to="/vendor-dashboard"
                >
                  <ListItemText primary="Vendar Dashboard" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </div>
      </div>

      <div
        id="offcanvas-add-cart"
        className="offcanvas offcanvas-rightside offcanvas-add-cart-section"
      >
        <div className="offcanvas-header text-right">
          <button className="offcanvas-close" onClick={handleClick}>
            <img src={svg} alt="icon" />
          </button>
        </div>
        <div className="offcanvas-add-cart-wrapper">
          <h4 className="offcanvas-title">Shopping Cart</h4>
          <ul className="offcanvas-cart">
            {ShoopingCarts&& ShoopingCarts?.map((data, index) => (
              <li className="offcanvas-wishlist-item-single" key={index}>
                <div className="offcanvas-wishlist-item-block">
                  <Link
                    to={`/product-details-one/${data.slug}`}
                    className="offcanvas-wishlist-item-image-link"
                  >
                    <img
                      src={ImageUrl+data.photo}
                      alt="img"
                      className="offcanvas-wishlist-image"
                    />
                  </Link>
                  <div className="offcanvas-wishlist-item-content">
                    <Link
                      to={`/product-details-one/${data.slug}`}
                      className="offcanvas-wishlist-item-link"
                    >
                      {data.name}
                    </Link>
                  
                    <div className="offcanvas-wishlist-item-details">
                      <span className="offcanvas-wishlist-item-details-quantity">
                        {data.quantity || 1} x
                      </span>
                      
                      <span className="offcanvas-wishlist-item-details-price">
                        {" "}
                        {data.pack || 1}
                      </span>
                    </div>
                    <div style={{color:"green"}}> ₹{data.discount_price*data.quantity}</div>
                  </div>
                </div>
                <div className="offcanvas-wishlist-item-delete text-right">
                  <a
                    href="#!"
                    className="offcanvas-wishlist-item-delete"
                    onClick={() => rmCartProduct(data.id)}
                  >
                    <i className="fa fa-trash"></i>
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <div className="offcanvas-cart-total-price">
            <span className="offcanvas-cart-total-price-text">Subtotal:</span>
            <span className="offcanvas-cart-total-price-value">
              ₹{cartTotal()}.00
            </span>
          </div>
          <ul className="offcanvas-cart-action-button">
            <li>
              <Link
                to="/cart"
                className="theme-btn-one btn-black-overlay btn_md"
              >
                View Cart
              </Link>
            </li>
            <li>
              <a
                onClick={()=>{
                  if(JSON.parse(localStorage.getItem("UserId"))){
                    setlogin(false)
                    history.push(`/checkout-one/${"no"}`)
                  }else{
                    setlogin(true)
                  }
                  
                }}
                className="theme-btn-one btn-black-overlay btn_md"
              >
                Checkout
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        id="offcanvas-wishlish"
        className="offcanvas offcanvas-rightside offcanvas-add-cart-section"
      >
        <div className="offcanvas-header text-right">
          <button className="offcanvas-close" onClick={handleWish}>
            <img src={svg} alt="icon" />
          </button>
        </div>
        <div className="offcanvas-wishlist-wrapper">
          <h4 className="offcanvas-title">Wishlist</h4>

          <ul className="offcanvas-wishlist">
            {WishListData.map((data, index) => {
              return(
              <li className="offcanvas-wishlist-item-single" key={index}>

                <div className="offcanvas-wishlist-item-block">
                  <Link
                    to={`/product-details-one/${data?.slug}`}
                    className="offcanvas-wishlist-item-image-link"
                  >
                    <img
                      src={ImageUrl+data?.photo}
                      alt="img"
                      className="offcanvas-wishlist-image"
                    />
                  </Link>
                  <div className="offcanvas-wishlist-item-content">
                    <Link
                      to={`/product-details-one/${data?.slug}`}
                      className="offcanvas-wishlist-item-link"
                    >
                      {data?.name}
                    </Link>
                    <div className="offcanvas-wishlist-item-details">
                      <span className="offcanvas-wishlist-item-details-quantity">
                        1 x
                      </span>
                      <span className="offcanvas-wishlist-item-details-price">
                        {data?.discount_price}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="offcanvas-wishlist-item-delete text-right">
                  <a
                    href="#!"
                    className="offcanvas-wishlist-item-delete"
                    onClick={() => rmFavProduct(data?.id)}
                  >
                    <i className="fa fa-trash"></i>
                  </a>
                </div>
              </li>
            )})}
          </ul>
          <ul className="offcanvas-wishlist-action-button">
            <li>
              <Link
                to="/wishlist"
                className="theme-btn-one btn-black-overlay btn_md"
              >
                View wishlist
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div id="search" className="search-modal">
        <button type="button" className="close" onClick={handleSearch}>
          <img src={svg} alt="icon" />
        </button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
            Swal.fire("Success", "Check out the Results", "success");
            history.push("/shop");
          }}
        >
          <input type="search" placeholder="type keyword(s) here" required />
          <button type="submit" className="btn btn-lg btn-main-search">
            Search
          </button>
        </form>
      </div>
      <LocationModal show={location} start={() => setLocation(false)} />
      <NewsletterModal show={login} stop={()=>setlogin(false)} start={()=>setlogin(false)} />
    </>
  );
};

const mapStateToProps = (state) =>
({
    Products: state.AllReducer.Wish_Fav_List || [],
    WishList: state.AllReducer.WishList || []
});
export default connect(mapStateToProps)(Header);