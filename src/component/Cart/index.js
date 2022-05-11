import React, { useState, useEffect } from "react";
import Coupon from "./Coupon";
import TotalCart from "./TotalCart";
import { Link, useParams } from "react-router-dom";
import img from "../../assets/img/common/empty-cart.png";
import { useDispatch, connect } from "react-redux";
import { ImageUrl } from "../../Redux/Utils/baseurl";
import { Advisor_Charges, Amc_Plans } from "../../Redux/Action/allActions";
import no_image from "../../assets/img/no_image.jpg";
import Swal from "sweetalert2";
import { notification, Radio } from "antd";
const CartArea = (props) => {
  let dispatch = useDispatch();
  let { visit } = useParams();
  const [Total, setTotal] = useState();
  const [Premium, setPremium] = useState(2);
  const [flag, setflag] = useState(0);
  const [TotalCarts, setTotalCarts] = useState();
  const [ShoopingCarts, setShoopingCarts] = useState(
    JSON.parse(localStorage.getItem("carts"))
  );
  const [Advisor, setAdvisor] = useState([]);
  const [plan, setplan] = useState(0);
  const [QuantityValues, setQuantityValues] = useState({});
  // Remove from Cart
  const PageReload = () => {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  const cartTotal = () => {
    return JSON.parse(localStorage.getItem("carts"))?.reduce(function (
      total,
      item
    ) {
      return total + (Number(item.quantity) || 1) * item.discount_price;
    },
    0);
  };
  const rmProduct = (id) => {
    notification.success({
      message: "Product Deleted Successfully",
    });
    let arr = ShoopingCarts.filter((item) => item.id !== id);
    localStorage.setItem("carts", JSON.stringify(arr));
    PageReload();
    dispatch({ type: "products/removeCart", payload: { id } });
  };
  const FliterProduct = () => {
    ShoopingCarts?.filter((data) => {
      if (data.flag === 0) {
        setflag(0)
      } else if(data.flag===1){
        setflag(1)
      }else{
        setflag(2)
      }
    });
  };
  // Clear
  const RemoveItems = () => {
    localStorage.removeItem("carts");
    localStorage.removeItem("plan");
    localStorage.removeItem("packname");
    localStorage.removeItem("Plan");
    localStorage.removeItem("Total");
  };
  const clearCarts = () => {
    notification.success({
      message: "All Products Deleted Successfully",
    });
    RemoveItems();
    PageReload();
  };
  // Value Update
  const cartValUpdate = (val, index, id, stock) => {
    if (val > stock) {
      notification.warning({
        message: "Stock Exceeded",
      });
    } else {
      for (var i = 0; i < ShoopingCarts.length; i++) {
        if (id === ShoopingCarts[i].id) {
          ShoopingCarts[i].quantity = val;
          break;
        }
      }
      localStorage.setItem("carts", JSON.stringify(ShoopingCarts));
      setQuantityValues((prevState) => ({
        ...prevState,
        ["test" + index]: val,
      }));
    }
  };
  useEffect(() => {
    dispatch(Advisor_Charges());
    dispatch(Amc_Plans());
    FliterProduct();
  }, []);
  useEffect(() => {
    if(visit==="advisor"){
    let arr = ShoopingCarts?.filter((item) => item.flag === 2);
    localStorage.setItem("carts", JSON.stringify(arr))
    }
  }, [visit, ShoopingCarts]);
  useEffect(() => {
    if(visit==="advisor"){
    setShoopingCarts(JSON.parse(localStorage.getItem("carts")))
    }
  },[visit])
  useEffect(() => {
    let Data = [];
    // props?.Advisor && props?.Advisor.map((data)=>{
    if (Premium === 2) {
      Data.push({
        instal_charge: props?.Advisor.instal_normal,
        advisor_charge: props?.Advisor.advisor_visit,
        award_program: props.Advisor.award_normal,
        yearly_premium: 0,
      });
    } else {
      Data.push({
        instal_charge: props?.Advisor.instal_pre,
        advisor_charge: props?.Advisor.advisor_visit,
        award_program: props.Advisor.award_pre,
        yearly_premium: props.Advisor.premium,
      });
    }
    // })
    let Memember_plan = props.AMC_Plans.filter((data) => {
      return data.id === Number(localStorage.getItem("plan"));
    });
    if (Premium === 2) {
      if (localStorage.getItem("packname") === "yearly") {
        setplan(Memember_plan[0]?.y_normal);
      } else if (localStorage.getItem("packname") === "half") {
        setplan(Memember_plan[0]?.h_normal);
      } else if (localStorage.getItem("packname") === "monthly") {
        setplan(Memember_plan[0]?.m_normal);
      } else {
        setplan(Memember_plan[0]?.q_normal);
      }
    } else setplan(Memember_plan[0]?.y_pre);

    setAdvisor(Data);
  }, [props.Advisor, props.AMC_Plans, Premium]);

  useEffect(() => {
    let Total_value =
      Number(Advisor[0]?.instal_charge) +
      Number(plan || 0) +
      Number(cartTotal()) +
      Number(Advisor[0]?.award_program) +
      Number(Advisor[0]?.yearly_premium);
    setTotal(Total_value);
    let Data = {
      amc: Number(plan) || 0,
      delivery_charge: Number(Advisor[0]?.advisor_charge) || 0,
      installation: Number(Advisor[0]?.instal_charge) || 0,
      award: Number(Advisor[0]?.award_program),
      premium: Premium === 1 ? 1 : 0,
      premium_amt: Advisor[0]?.yearly_premium,
      visit: visit,
    };
    localStorage.setItem("Total", Total_value || 0);
    flag === 1 && localStorage.setItem("Plan", JSON.stringify(Data));
  }, [Advisor, plan, cartTotal(), visit, flag, Premium]);
console.log("dddd",flag)
  return (
    <>
      {ShoopingCarts?.length ? (
        <section id="cart_area_one" className="ptb-100">
          <div className="container ">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12 desktop_view_cart">
                <div className="table_desc ">
                  <div className="table_page table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th className="product_remove">Remove</th>
                          <th className="product_thumb">Image</th>
                          <th className="product_name">Product</th>
                          <th className="product-price">Price</th>
                          <th className="product_quantity">Quantity</th>
                          <th className="product_total">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ShoopingCarts?.length>0 &&
                          ShoopingCarts?.map((data, index) => (
                            <tr key={index}>
                              <td className="product_remove">
                                <i
                                  className="fa fa-trash text-danger"
                                  onClick={() => rmProduct(data.id)}
                                  style={{ cursor: "pointer" }}
                                ></i>
                              </td>
                              <td className="product_thumb">
                                <Link
                                  to={`/product-details-one/${data.slug}/${data.id}`}
                                >
                                  <img
                                    src={
                                      data.flag != 2
                                        ? ImageUrl + data.photo
                                        : no_image
                                    }
                                    alt="img"
                                  />
                                </Link>
                              </td>
                              <td className="product_name">
                                <Link
                                  to={`/product-details-one/${data.slug}/${data.id}`}
                                >
                                  {data.name}
                                </Link>
                              </td>
                              <td className="product-price">
                                <i class="fa fa-inr"></i> {data.discount_price}
                                .00
                              </td>
                              <td className="product_quantity">
                                {data.flag != 2 ? (
                                  <input
                                    min="1"
                                    max="100"
                                    type="number"
                                    onChange={(e) =>
                                      cartValUpdate(
                                        e.target.value,
                                        index,
                                        data.id,
                                        data.stock
                                      )
                                    }
                                    value={
                                      QuantityValues["test" + index] ||
                                      data.quantity
                                    }
                                  />
                                ) : (
                                  "-"
                                )}
                              </td>
                              <td className="product_total">
                                <i class="fa fa-inr"></i>{" "}
                                {Number(data.discount_price) *
                                  Number(
                                    QuantityValues["test" + index] ||
                                      data.quantity
                                  )}
                                .00
                              </td>
                            </tr>
                          ))}
                      </tbody>

                      <tfoot>
                        {plan && flag == 1 && (
                          <tr>
                            <td colSpan="4"></td>
                            <td
                              className="font-bold text-dark text-right"
                              colSpan="1"
                            >
                              AMC Plans
                            </td>
                            <td className="font-bold text-theme text-center">
                              <i class="fa fa-inr"></i> {plan || 0}.00
                            </td>
                          </tr>
                        )}
                        {flag == 1 && (
                          <tr>
                            <td colSpan="4"></td>
                            <td
                              className="font-bold text-dark text-right"
                              colSpan="1"
                            >
                              Installation Charges
                            </td>
                            <td className="font-bold text-theme text-center">
                              <i class="fa fa-inr"></i>{" "}
                              {Advisor[0]?.instal_charge}.00
                            </td>
                          </tr>
                        )}

                        {flag == 1 && (
                          <tr>
                            <td colSpan="4"></td>
                            <td
                              className="font-bold text-dark text-right"
                              colSpan="1"
                            >
                              Award Program
                            </td>
                            <td className="font-bold text-theme text-center">
                              <i class="fa fa-inr"></i>{" "}
                              {Advisor[0]?.award_program}.00
                            </td>
                          </tr>
                        )}
                        {flag == 1 && (
                          <>
                            <tr>
                              <td colSpan="4"></td>
                              <td
                                className="font-bold text-dark text-right"
                                colSpan="1"
                              >
                                Yearly Premium
                                <div>
                                  <Radio.Group
                                    onChange={(e) => setPremium(e.target.value)}
                                    value={Premium}
                                  >
                                    <Radio value={1}>Yes</Radio>
                                    <Radio value={2}>No</Radio>
                                  </Radio.Group>
                                </div>
                              </td>
                              <td className="font-bold text-theme text-center">
                                <i class="fa fa-inr"></i>{" "}
                                {Advisor[0]?.yearly_premium}.00
                              </td>
                            </tr>
                            <tr>
                              <td colSpan="4"></td>
                              <td
                                className="font-bold text-dark text-right"
                                colSpan="1"
                              >
                                GRAND TOTAL
                              </td>
                              <td className="font-bold text-theme text-center">
                                <i class="fa fa-inr"></i> {Total}.00
                              </td>
                            </tr>
                          </>
                        )}
                      </tfoot>
                    </table>
                  </div>
                  <div className="cart_submit">
                    {ShoopingCarts?.length ? (
                      <button
                        className="theme-btn-one btn-black-overlay btn_sm"
                        type="button"
                        onClick={() => clearCarts()}
                      >
                        Clear cart
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="offcanvas-add-cart-wrapper mobile_view_cart">
                {/* <h4 className="offcanvas-title">Shopping Cart</h4> */}
                <ul className="offcanvas-cart">
                  {ShoopingCarts &&
                    ShoopingCarts?.map((data, index) => (
                      <li
                        className="offcanvas-wishlist-item-single"
                        key={index}
                      >
                        <div className="offcanvas-wishlist-item-block">
                          <Link
                            to={`/product-details-one/${data.slug}/${data.id}`}
                            className="offcanvas-wishlist-item-image-link"
                          >
                            <img
                              src={ImageUrl + data.photo}
                              alt="img"
                              className="offcanvas-wishlist-image"
                            />
                          </Link>
                          <div className="offcanvas-wishlist-item-content">
                            <Link
                              to={`/product-details-one/${data.slug}/${data.id}`}
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
                            <div style={{ color: "green" }}>
                              {" "}
                              <i class="fa fa-inr"></i>{" "}
                              {data.discount_price * data.quantity}
                            </div>
                          </div>
                        </div>
                        <div className="offcanvas-wishlist-item-delete text-right">
                          <a
                            className="offcanvas-wishlist-item-delete"
                            onClick={() => rmProduct(data.id)}
                          >
                            <i className="fa fa-trash"></i>
                          </a>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
              <Coupon />
              <TotalCart QuantityValues={QuantityValues} Premium={Premium} />
            </div>
          </div>
        </section>
      ) : (
        <section id="empty_cart_area" className="ptb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                <div className="empaty_cart_area">
                  <img src={img} alt="img" />
                  <h2>YOUR CART IS EMPTY</h2>
                  <h3>Sorry Mate... No Item Found Inside Your Cart!</h3>
                  <Link to="/" className="btn btn-black-overlay btn_sm">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  ShippingDetails: state.AllReducer.Shipping || [],
  Advisor: state.AllReducer.AdditionalCharges || [],
  AMC_Plans: state.AllReducer.AMC_Plan || [],
});
export default connect(mapStateToProps)(CartArea);
