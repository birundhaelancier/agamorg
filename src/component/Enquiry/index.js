import React,{useEffect, useState} from 'react'
import { useDispatch,connect } from 'react-redux'
// import Map from './Map'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { FarmerRegister_Enquiry } from '../../Redux/Action/LoginActions'
import { Package_List,City_List } from '../../Redux/Action/allActions'
import Footer from '../Common/Footer'
import Header from '../../page/FarmerDashboard/Header'
import { Checkbox, notification, Radio } from 'antd'
import ProductCard from '../Common/Product/ProductCard';
// import Heading from './Heading';
import axios from 'axios'
import { useSelector } from "react-redux";
import { apiurl } from '../../Redux/Utils/baseurl'
import Banner from '../../assets/img/far_banner.jpg'
const EnquiryArea = (props) => {
    let dispatch=useDispatch()
    let history=useHistory()
    const [Package,setPackage]=useState([])
    const [CityList,setCityList]=useState([])
    const [AmcPlan,setAmcPlan]=useState([])
    const [CartsDetails,setCartsDetails]=useState([])
    const [ShoopingCarts,setShoopingCarts]=useState(JSON.parse(localStorage.getItem("carts")))
    const [pincodeList,setpincodeList]=useState([])
    const[DealList,setDealList]=useState([])
    const [FilterData,setFilterData]=useState([])
    const [TabIndex,setTabIndex]=useState(0)
    const [Pack_List,setPack_List]=useState("")
    const [planname,setplanname]=useState("")
  
    useEffect(()=>{
        axios({
            method: 'get',
            url:apiurl+"farmerCategory",
        })
        .then((response) => {
            setDealList(response.data)
        })

        axios({
            method: 'get',
            url:apiurl+"amcPlans",
        })
        .then((response) => {
            setAmcPlan(response.data)
        })
        
        },[]) 
        const FilterDataFun=()=>{
            setTabIndex(TabIndex+1)
        }   
        useEffect(()=>{
            var Data=DealList?.filter((data,index)=>{
                return index===TabIndex
            })
            setFilterData(Data)
        },[TabIndex,DealList])
        const AddCartDetails=()=>{
            let Data=ShoopingCarts?.find((data)=>{
                return data.id===0
            })
            if(Data?.id===0){
            history.push(`/cart/${"advisor"}`)
            }else{
            let items = [...ShoopingCarts]
            items.push({
              id:0,
              discount_price:250,
              previous_price:0,
              name: "Advisor Visit",
              photo: "no_image",
              quantity: 1,
              slug: 0,
              flag:2
            });
            setShoopingCarts(items)
            localStorage.setItem("carts",JSON.stringify(items))
            history.push(`/cart/${"advisor"}`)
           }
        }
     
        const PackChange=(index,name,id)=>{
            setPack_List(id)
            setplanname("")
            localStorage.setItem("plan",id)
        }
        const PackNameChange=(value)=>{
            localStorage.setItem("packname",value)
            setplanname(value)
        }
        const PlanProceed=()=>{
            console.log("")
            if(Pack_List===""){
                notification.warning({
                    message:"Please Choose Your Plan"
                })
            }else if(planname===""){
                notification.warning({
                    message:"Please Choose Your Pack"
                })
            } else{
                history.push("/cart")
            }
        }
    return (
        <>
            {/* banner start */}

          <div className="furniture_slider background_bg bg_1"  style={{backgroundImage:`url(${Banner})`}}>
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-8 col-sm-12 col-12" style={{padding:"20px"}}>
                    <a><h1 className='' style={{fontSize:"50px",color:"#333"}}> Need a Advisor visit</h1></a>
                    <p className='pt-4 pb-4 h6'>You must pay ₹ 250.Our goal here at Agam Organics is to make organic produce easily accessible and affordable at all levels</p>
                    <a className="theme-btn-one btn-black-overlay btn_sm" onClick={AddCartDetails}>Add to cart</a>
                </div>
              </div>
            </div>
          </div>
          {/* banner end */}
            <section id="contact_area" className="ptb-100">
                <div className="container">
                    <div className="row">
              
                        <div className="col-lg-12">
                            <div className="contact_form_one contact_info_wrapper">
                                <div className="text-center h2">Plan for a Garden</div>
                                {/* <a className='d-flex justify-content-end align-items-center w-100 h5'><u>Need a Advisor visit</u></a> */}
                                <div className="d-flex justify-content-end align-items-center w-100 mt-4 farmer_btn_div">
                                   {DealList.length>0 && TabIndex>0 && <a className="theme-btn-one bg-black btn_sm pl-50" onClick={()=>setTabIndex(TabIndex-1)}>Back</a>}
                                   {FilterData.length>0?
                                   <a className="theme-btn-one btn-black-overlay btn_sm" onClick={()=>FilterDataFun()}>{FilterData.length>0?"Next":"Submit"}</a>:
                                   <a className="theme-btn-one btn-black-overlay btn_sm" onClick={PlanProceed}>{"Submit"}</a>}
                                </div>
                              
                    <div className="row">
                    <div className="col-lg-12">
                    <div className="tabs_center_button">
                     {FilterData.length===0 && <div className='text-center h5'>AMC PLANS</div>}
                        <ul className="nav nav-tabs">  
                        {FilterData&&FilterData?.map((data,index)=>{
                          return( 
                            <>
                            <li>
                                <a data-toggle="tab" href={`#${data?.categoryDetail?.name}`} className={index===0&&"active"}>{data.categoryDetail.name}</a></li>
                            </>
                            )})}

                          </ul>

                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="tabs_el_wrapper">
                        <div className="tab-content">
                       
                          <div id={TabIndex} className="tab-pane fade show in active">
                              <div className="row">
                              {FilterData&&FilterData.map((data,index)=>{
                               return( 
                                    <>
                                    {data.products?.map((val,index)=>{
                                    return(
                                    <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={val.id}>
                                            <ProductCard data={val} farmer="yes"/>
                                    </div>
                                    )})}
                                    </>
                                )})}

                              </div>
                          </div>
                        
                        </div>
                    </div>  
          
                </div>
            {/* column end */}
            {FilterData.length===0 &&
            <div className="col-lg-12 col-xs-12 mt-4">
                            <div className="faqs_area_wrapper">
                                <div className="accordion md-accordion" id="accordionEx" role="tablist" aria-multiselectable="true">
                                    {AmcPlan.map((data, index) => (
                                        <div className="card_items_area" key={index}>
                                            <div className="card-header" role="tab" id="headingOne1">
                                                <a data-toggle="collapse" data-parent="#accordionEx" href={"#collapse" + index} aria-expanded="true" onClick={()=>PackChange(index,data.name,data.id)}>
                                                    <h5 className="mb-0">
                                                       <Radio value={Pack_List} checked={Pack_List===data.id?true:false} onChange={()=>PackChange(index,data.name,data.id)}><strong>{data.name}</strong></Radio> <i className="fa fa-angle-down rotate-icon"></i>
                                                    </h5>
                                                </a>
                                            </div>
                                            <div id={"collapse" + index} className={index === 0 ? "collapse show active" : "collapse"}
                                                role="tabpanel" data-parent="#accordionEx">
                                                <div className="card-body">
                                                    <div className='chec_inner_items'>
                                                    <div><Radio onChange={()=>PackNameChange("yearly")} checked={Pack_List===data.id && planname=="yearly"?true:false}><strong>Yearly</strong></Radio><div>{data.y_normal}</div><div>Premium {""}<strong>₹{data.y_pre}</strong></div></div>
                                                    <div> <Radio onChange={()=>PackNameChange("half")}  checked={Pack_List===data.id && planname=="half"?true:false}><strong>Half Yearly</strong></Radio> <div>{data.h_normal}</div><div>Premium <strong>₹{data.h_pre}</strong></div></div>
                                                    <div><Radio onChange={()=>PackNameChange("quarter")}  checked={Pack_List===data.id && planname=="quarter"?true:false}><strong>Quarterly</strong></Radio>  <div>{data.q_normal}</div><div>Premium <strong>₹{data.q_pre}</strong></div></div>
                                                    <div><Radio onChange={()=>PackNameChange("monthly")}  checked={Pack_List===data.id && planname=="monthly"?true:false}><strong>Monthly</strong></Radio><div>{data.m_normal}</div><div>Premium <strong>₹{data.m_pre}</strong></div></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>}
                        {/* end */}
                               <div className="d-flex justify-content-end align-items-center w-100 mt-4 farmer_btn_div">
                                   {DealList.length>0 && TabIndex>0 && <a className="theme-btn-one bg-black btn_sm pl-50" onClick={()=>setTabIndex(TabIndex-1)}>Back</a>}
                                   {FilterData.length>0?
                                   <a className="theme-btn-one btn-black-overlay btn_sm" onClick={()=>FilterDataFun()}>{FilterData.length>0?"Next":"Submit"}</a>:
                                   <a className="theme-btn-one btn-black-overlay btn_sm" onClick={PlanProceed}>{"Submit"}</a>}
                                </div>
                                
                           </div>

          
                            </div>
                        </div>
                     
                    </div>
                </div>
            </section>
        </>
    )
}


const mapStateToProps = (state) =>
({
    Package_list: state.AllReducer.Package_list || [],
    City_List: state.AllReducer.City_List || [],
});
export default connect(mapStateToProps)(EnquiryArea);