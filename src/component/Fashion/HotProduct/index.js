import React,{useEffect, useState} from 'react'
import ProductCard from '../../Common/Product/ProductCard';
import Heading from '../Heading';
import axios from 'axios'
import { useSelector } from "react-redux";
const HotProduct = () => { 
    const[DealList,setDealList]=useState([])
    const [FilterData,setFilterData]=useState([])
    const [TabIndex,setTabIndex]=useState("")
    // let products = useSelector((state) => state.products.products);
    useEffect(()=>{
        // dispatch(Get_HomeProduct_List("deal"))
        axios({
            method: 'post',
            url:"https://elancier.in/agam/api/homeProduct",
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
    console.log(DealList,"setDealList")
    return (
        <>
    <section id="hot_Product_area" className="ptb-100">
        <div className="container">
            <Heading heading="Hot Products" para="Lorem Ipsum is simply dummy text of the printing and typesetting industry" />
            <div className="row">
                <div className="col-lg-12">
                    <div className="tabs_center_button">
                  
                        <ul className="nav nav-tabs">  
                        {DealList&&DealList?.heading?.map((data,index)=>{
                          return( 
                              <>
                            <li><a data-toggle="tab" href={`#${data.is_type}`} onClick={()=>FilterDataFun(data.is_type)} className={index===0&&"active"}>{data.is_type}</a></li>
                            {/* <li><a data-toggle="tab" href="#trending">Trending</a></li>
                            <li><a data-toggle="tab" href="#best_sellers">Best Sellers</a></li> 
                            <li><a data-toggle="tab" href="#featured">Featured</a></li>
                            <li><a data-toggle="tab" href="#on_sall">On sall</a></li> */}
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
                          {/* <div id="trending" className="tab-pane fade">
                          <div className="row"> 
                                {products.slice(0, 5).map((data, index) =>(
                                     <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                     <ProductCard data={data} />
                             </div>
                                ))}
                              </div>
                          </div> */}
                          {/* <div id="best_sellers" className="tab-pane fade">
                          <div className="row">
                                {products.slice(3, 5).map((data, index) =>(
                                     <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                     <ProductCard data={data} />
                             </div>
                                ))}
                              </div>
                          </div> */}
                          {/* <div id="featured" className="tab-pane fade">
                          <div className="row">
                                {products.slice(5, 11).map((data, index) =>(
                                     <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                     <ProductCard data={data} />
                             </div>
                                ))}
                              </div>
                          </div> */}
                          {/* <div id="on_sall" className="tab-pane fade">
                          <div className="row">
                                {products.slice(6, 13).map((data, index) =>(
                                     <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                     <ProductCard data={data} />
                             </div>
                                ))}
                              </div>
                          </div> */}
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
