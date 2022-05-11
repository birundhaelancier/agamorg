import React,{useEffect, useState} from 'react'
import ProductCard from '../../Common/Product/ProductCard';
import Heading from '../Heading';
import axios from 'axios'
import { useSelector } from "react-redux";
import { apiurl } from '../../../Redux/Utils/baseurl'
const HotProduct = () => { 
    const[DealList,setDealList]=useState([])
    const [FilterData,setFilterData]=useState([])
    const [TabIndex,setTabIndex]=useState("")
    // let products = useSelector((state) => state.products.products);
    useEffect(()=>{
        // dispatch(Get_HomeProduct_List("deal"))
        axios({
            method: 'post',
            url:apiurl+"homeProduct",
            data:{"type":"hot"}
        })
        .then((response) => {
            setDealList(response.data)
            setTabIndex(response?.data?.heading[0]?.is_type)
            var Data=response?.data?.products?.filter((data,index)=>{
                return data?.is_type===response?.data?.heading[0]?.is_type

            })
            setFilterData(Data)
        })
        },[]) 
        const FilterDataFun=(value)=>{
            setTabIndex(value)
            var Data=DealList?.products.filter((data,index)=>{
                return data.is_type===value
            })
            setFilterData(Data)
        }
    return (
        <>
    <section id="hot_Product_area" className="ptb-1 sort_list">
        <div className="container">
            <Heading heading="Hot Products" para="Farm-Fresh organic vegetables develivered to your door step" />
            <div className="row">
                <div className="col-lg-12">
                    <div className="tabs_center_button">
                  
                        <ul className="nav nav-tabs">  
                        {DealList&&DealList?.heading?.map((data,index)=>{

                          return( 
                              <>
                            <li><a data-toggle="tab" href={`#${data.is_type}`} onClick={()=>FilterDataFun(data.is_type)} className={index===0&&"active"}>{data.is_type==="best"?"best products":data.is_type==="feature"?"featured Products":data.is_type==="flash_deal"?"flash deals":data.is_type==="new"?"new arrival":""}</a></li>
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
                              {FilterData&&FilterData?.map((data,index)=>{
                               return( 
                                    <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={data.id}>
                                            <ProductCard data={data} />
                                    </div>
                                )})}

                              </div>
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

export default HotProduct
