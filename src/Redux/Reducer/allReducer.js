import {
  GET_SLIDER_LIST,
  GET_HOMEPRODUCT_LIST,
  WISHLIST_FAVORITES,
  GET_CATEGORY_LISTITEM,
  GET_PACKAGE,
  GET_CITY_LIST,
  GET_PROFILE_DATA,GET_WISH_LIST,
  GET_SINGLEPRODUCT_LIST,
  GET_SHIPPING_LIST,
  GET_COUPONCODE,
  USER_ORDERS,
  GET_ADDRESS_LIST
} from "../Utils/constant";
const initialState = {
  Slider_list: [],
  Products: [],
  Wish_Fav_List: [],
  Category_List: [],
  City_List: [],
  Package_list: [],
  ProfileData:[],
  WishList:[],
  SingleProduct:[],
  Shipping:[],
  coupon_code:[],
  Orders:[],
  Address_list:[]
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_SLIDER_LIST:
      return { ...state, Slider_list: payload };
    case GET_HOMEPRODUCT_LIST:
      return { ...state, Products: payload };
    case WISHLIST_FAVORITES:
      return { ...state, Wish_Fav_List: payload };
    case GET_CATEGORY_LISTITEM:
      return { ...state, Category_List: payload };
    case GET_PACKAGE:
      return { ...state, Package_list: payload };
    case GET_CITY_LIST:
      return { ...state, City_List: payload };
    case GET_PROFILE_DATA:
      return { ...state, ProfileData: payload };
    case GET_WISH_LIST:
        return { ...state, WishList: payload };
    case GET_SINGLEPRODUCT_LIST:
        return { ...state, SingleProduct: payload }; 
    case GET_SHIPPING_LIST:
        return { ...state, Shipping: payload }; 
    case GET_COUPONCODE:
        return { ...state, coupon_code: payload };  
    case USER_ORDERS:
         return { ...state, Orders: payload };
    case GET_ADDRESS_LIST:
          return { ...state, Address_list: payload };         
                     
    default:
      return state;
  }
}
