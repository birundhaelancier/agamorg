import React from 'react'
// import Img
import user1 from '../../../assets/img/user/user1.png'
import user2 from '../../../assets/img/user/user2.png'
import user3 from '../../../assets/img/user/user3.png'
const ProductInfo = ({Details}) => {
    const Speci_Name= Details?.specification_description?.split(',').map((data, index)=>{
            if(index === 0){
                return data?.replace('[\"', '')
            }else if((Details?.specification_description?.split(',').length - 1) === index){
                return data?.replace('\"]', '')
            }
            else{
                return data.replace('"','')
            }
        })

   const Specification= Details?.specification_name?.split(',').map((data, index)=>{
        if(index === 0){
            return data?.replace('[\"', '')
        }else if(((Number(Details?.specification_name.split(',').length - 1)) === index)){
            return data?.replace('\"]', '')
        }
        else{
            return data.replace('"', '')
        }
    })

    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="product_details_tabs">
                        <ul className="nav nav-tabs">
                            <li><a data-toggle="tab" href="#description" className="active">Description</a></li>
                            <li><a data-toggle="tab" href="#additional">Additional Information</a></li>
                            {/* <li><a data-toggle="tab" href="#review">Review</a></li> */}
                        </ul>
                        <div className="tab-content">
                            <div id="description" className="tab-pane fade in show active">
                                <div className="product_description" dangerouslySetInnerHTML={{__html:Details?.details}}>
                                    
                                </div>
                            </div>
                            <div id="additional" className="tab-pane fade">
                                <div className="product_additional">
                                   {Specification && Specification[0]!=="[null]" && <ul>
                                    {Specification && Specification.map((data,index)=>
                                        <li>{data.replace('"', '')}<span>{Speci_Name[index].replace('"','')}</span></li>
                                        )}
                                    </ul>
                                    }
                                </div>
                            </div>
                            <div id="review" className="tab-pane fade">
                                <div className="product_reviews">
                                    <ul>
                                        {/* {ReviewData.map((data, index) => (
                                            <li className="media" key={index}>
                                                <div className="media-img">
                                                    <img src={data.img} alt="img" />
                                                </div>
                                                <div className="media-body">
                                                    <div className="media-header">
                                                        <div className="media-name">
                                                            <h4>{data.name}</h4>
                                                            <p>{data.date}</p>
                                                        </div>
                                                        <div className="post-share">
                                                            <a href="#!" className="replay">{data.replay}</a>
                                                            <a href="#!" className="">{data.report}</a>
                                                        </div>
                                                    </div>
                                                    <div className="media-pragraph">
                                                        <div className="product_review_strat">
                                                            <span><a href="#!"><i className="fa fa-star"></i></a></span>
                                                            <span><a href="#!"><i className="fa fa-star"></i></a></span>
                                                            <span><a href="#!"><i className="fa fa-star"></i></a></span>
                                                            <span><a href="#!"><i className="fa fa-star"></i></a></span>
                                                            <span><a href="#!"><i className="fa fa-star"></i></a></span>
                                                        </div>
                                                        <p>{data.para}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))} */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductInfo