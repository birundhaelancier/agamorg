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
  GET_ADDRESS_LIST,
  GET_POST_LIST,
  FARMER_POST_LIST,
  STOCK_LIST,
  FAQ_LIST,
  ORDER_LIST,
  RELATED_LIST,
  ADDITIONAL_CHARGES,
  AMC_PLANS
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
  Address_list:[],
  Post_list:[],
  Farmer_Posts:[],
  Stock_list:[],
  Faq_List:[],
  order_list:[],
  Related_list:[],
  AdditionalCharges:[],
  AMC_Plan:[]
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
    case GET_POST_LIST:
          return { ...state, Post_list: payload };  
    case FARMER_POST_LIST:
          return { ...state, Farmer_Posts: payload }; 
    case STOCK_LIST:
          return { ...state, Stock_list: payload }; 
    case FAQ_LIST:
          return { ...state, Faq_List: payload };
    case RELATED_LIST:
         return { ...state, Related_list: payload };  
    case ORDER_LIST:
        return { ...state, order_list: payload };  
    case ADDITIONAL_CHARGES:
        return { ...state, AdditionalCharges: payload };
    case AMC_PLANS:
        return { ...state, AMC_Plan: payload };                                     
    default:
      return state;
  }
}
