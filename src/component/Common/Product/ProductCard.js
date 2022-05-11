import React, { useState, useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineExpand } from "react-icons/ai";
import { FaExchangeAlt } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import MyVerticallyCenteredModal from "../../Common/Modal";
import logo from "../../../assets/img/agamlogo.png";
import { AddWishlist } from "../../../Redux/Action/CreateActions";
import Swal from "sweetalert2";
import { ImageUrl } from "../../../Redux/Utils/baseurl";
import { notification } from "antd";
const ProductCard = (props) => {
  let history = useHistory();
  const [storeDetail, setstoreDeatil] = useState([]);
  const [cartChange, setcartChange] = useState(false);
  const [qtyValue, setqtyValue] = useState(1);
  const [getqty, setgetqty] = useState();
  const [selectpack, setselectpack] = useState(props.data?.attribute[0]?.name);
  const [filterPack, setfilterPack] = useState(props.data?.attribute[0]);
  const [modalShow, setModalShow] = useState(false);
  const [CountData, setCountData] = useState([]);
  const [CartsDetails, setCartsDetails] = useState(
    JSON.parse(localStorage.getItem("carts")) || []
  );
  let dispatch = useDispatch();
  // Add to cart
  const addToCart = (product) => {
    var Id =
      CartsDetails &&
      CartsDetails.find((cart) => {
        return cart?.id === product?.id;
      });
    if (product?.id === Id?.id || Id !== undefined) {
      history.push("/cart");
    } else {
      let items = [...CartsDetails];
      items.push({
        id: product.id,
        discount_price: filterPack?.selling || product.discount_price,
        previous_price: filterPack?.price || product.previous_price,
        name: product.name,
        photo: product.photo,
        quantity: qtyValue,
        pack: selectpack,
        slug: product.slug,
        attributeId: filterPack?.id,
        stock: product.stock,
        flag:props.farmer==="yes"?1:0
      });
      setCartsDetails(items);
      PageReload();
      notification.success({message:"Successfully added to your Cart"})
    }
  };
  const PageReload = () => {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  // Add to Favorite
  const addToFav = async (id) => {
    var Data = props?.WishList?.filter((item) => {
      return item?.id === id;
    });
    if (JSON.parse(localStorage.getItem("UserId"))) {
      if (Data[0]?.id === id) {
        notification.error({message:"Already Added in Wishlist"})
      } else {
        dispatch(AddWishlist(id));
      }
    } else {
      notification.warning({message:"Please Login then Added in Your Wishlist"})
    }
  };

  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(CartsDetails));
  }, [CartsDetails]);

  useEffect(() => {
    var Id =
      CartsDetails &&
      CartsDetails.find((cart) => {
        return cart?.id === props.data?.id;
      });
    if (Id != null || Id != undefined || props.data?.id === Id?.id) {
      setcartChange(true);
    } else {
      setcartChange(false);
    }
  }, [CartsDetails]);
  const ChangeAttribute = (data) => {
    setselectpack(data);
    FilterData(data);
  };
  const FilterData = (value) => {
    var Data = props.data.attribute.filter((data) => {
      return data.name === value;
    });
    setfilterPack(Data[0]);
  };
  const OnChangeQty = (data, id) => {
    setqtyValue(data);
  };
  const [count, setCount] = useState(0);

  useEffect(() => {
    let dynObj = [];
    CartsDetails?.forEach((data) => {
      dynObj.push({
        id: data.id,
        quantity: Number(data.quantity),
      });
    });
    setCountData(dynObj);
  }, [CartsDetails]);

  const incNum = (id, stock) => {
    var Countdec =
      Number(
        CountData.find((val) => {
          return val.id === id;
        })?.quantity
      ) + count;
    console.log(Countdec >= stock, Countdec, stock);

    if (Countdec <= stock) {
      UpdateQty(id);
      setCount(count + 1);
    } else {
      notification.warning({message:"Stock Exceeded"});
    }
  };
  const decNum = (id) => {
    var Countdec =
      Number(
        CountData.find((val) => {
          return val.id === id;
        })?.quantity
      ) + count;
    if (Countdec > 1) {
      setCount(count - 1);
      UpdateQty(id);
    } else {
      notification.warning({message:"Limit Reached"});
      setCount(0);
      UpdateQty(id);
    }
  };
  const UpdateQty = (id) => {
    var Countdata =
      Number(
        CountData.find((val) => {
          return val.id === id;
        })?.quantity
      ) + count;
    for (var i = 0; i < CartsDetails.length; i++) {
      if (id === CartsDetails[i].id) {
        CartsDetails[i].quantity = Countdata;
        break;
      }
      localStorage.setItem("carts", JSON.stringify(CartsDetails));
    }
  };
  useEffect(() => {
    UpdateQty();
  }, [count, CartsDetails]);
  useEffect(() => {
    var Countdec =
      Number(
        CountData.find((val) => {
          return Number(val.id) === Number(props.data?.id)
        })?.quantity
      ) + Number(count)
    setgetqty(Countdec)
  }, [props,count,CountData]);
  return (
    <>
      <div className="product_wrappers_one">
        <div className="thumb">
          <Link
            to={`/product-details-one/${props.data.slug}/${props.data.id}`}
            className="image"
          >
            <img src={ImageUrl + props.data.photo} alt="Product" />
            <img
              className="hover-image"
              src={ImageUrl + props.data.photo}
              alt="Product"
            />
          </Link>
          {/* <span className="badges">
            <span
              className={["hot", "new", "sale"][Math.round(Math.random() * 2)]}
            >
              {props.data.slug}
            </span>
          </span> */}
          <div className="actions">
            <a
              className="action wishlist"
              title="Wishlist"
              onClick={() => addToFav(props.data.id)}
            >
              <AiOutlineHeart />
            </a>
            <a
              className="action quickview"
              title="Quick view"
              onClick={() => setModalShow(true)}
            >
              <AiOutlineExpand />
            </a>
            {/* <a href="#!" className="action compare" title="Compare" onClick={() => addToComp(props.data.id)}><FaExchangeAlt /></a> */}
          </div>
          {/* {cartChange&& props.data.id &&<button type="button" className="add-to-cart offcanvas-toggle" onClick={() => addToCart(props.data.id)}>Go To Cart</button>} */}
        </div>
        <div className="content">
          <h5 className="title">
            <Link
              to={`/product-details-one/${props.data.slug}/${props.data.id}`}
            >
              {props.data.name}
            </Link>
          </h5>
          <span className="price">
          <del style={{ paddingLeft: "5px", color: "green" }}>
          <i class="fa fa-inr"></i> {filterPack ? filterPack.price : props.data.previous_price}.00
            </del>
            <span className="new">
            <i class="fa fa-inr"></i> {filterPack ? filterPack.selling : props.data.discount_price}.00
            </span>
       
          </span>
          {props.data.stock !== 0 ? (
            <div className="add_cart_qty" style={{ justifyContent: "center" }}>
              {!cartChange ? (
                <input
                  min="1"
                  max="100"
                  type="number"
                  style={{
                    width: "30%",
                    minHeight: "30px",
                    padding: "0px 0px 0px 10px",
                    
                    
                  }}
                  onChange={(e) => OnChangeQty(e.target.value)}
                  value={qtyValue}
                />
              ) : (
                <form
                  id="product_count_form_two"
                  className="custom_mar"
                  style={{ paddingTop: "0px" }}
                >
                  <div className="product_count_one">
                    <div
                      className="plus-minus-input"
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <div className="input-group-button">
                        <button
                          type="button"
                          className="button"
                          onClick={() => decNum(props.data.id)}
                        >
                          <i className="fa fa-minus"></i>
                        </button>
                      </div>
                      <input
                        className="form-control"
                        type="number"
                        value={
                          CountData.length > 0
                            ? Number(
                                CountData.find((val) => {
                                  return val.id === props.data.id;
                                }).quantity
                              ) + count
                            : count
                        }
                        readOnly
                      />
                      <div className="input-group-button">
                        <button
                          type="button"
                          className="button"
                          onClick={() =>
                            incNum(props.data.id, props.data.stock)
                          }
                        >
                          <i className="fa fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
              {props.data.attribute.length > 0 && !cartChange ? (
                <div
                  className="customs_selects"
                  style={{ padding: "0px 0px 0px 8px", width: "65%" }}
                >
                  <select
                    name="product"
                    className="customs_sel_box product_card_select"
                    style={{ minHeight: "30px" }}
                    onChange={(e) => ChangeAttribute(e.target.value)}
                    value={selectpack}
                  >
                    {props.data.attribute.map((data) => {
                      return (
                        <option value={data.name}>
                          {data.name} - ₹{data.price}
                        </option>
                      );
                    })}
                  </select>
                </div>
              ) : null}
            </div>
          ) : (
            <div
              style={{height:props.farmer==="yes"&&"auto"}}
              className={`text-center ${
                props.data.stock === 0 && "product_btn"
              }`}
            >
              {/* <span
                class="badge badge-warning stock_n"
                style={{
                  fontSize: "16px",
                  color: "#fff",
                  padding: "6px 30px",
                  width: "75%",
                }}
              >
                Out of Stock
              </span> */}
              <button
                type="button"
                style={{marginTop:props.farmer==="yes"?"0px":"40px",marginBottom:!cartChange && "0px" }}
                className="add-to-cart offcanvas-toggle custom_btn qty_btn"
              >
                Out of Stock
              </button>
            </div>
          )}

          {props.data.stock !== 0 && (
              <div className={`text-center`}>
            <button
              type="button"
              className="add-to-cart offcanvas-toggle custom_btn qty_btn"
              onClick={() => addToCart(props.data)}
            >
              {!cartChange ? "Add to cart" : "Go to cart"}
            </button>
            </div>
          )}
        </div>
      </div>

      <MyVerticallyCenteredModal
        data={props.data}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  WishList: state.AllReducer.WishList || [],
});
export default connect(mapStateToProps)(ProductCard);
