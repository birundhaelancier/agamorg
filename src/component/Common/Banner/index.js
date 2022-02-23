import React from 'react'
import { Link } from 'react-router-dom';
import { ImageUrl } from '../../../Redux/Utils/baseurl'
import BanImg from "../../../assets/img/bgimage2.jpg"
const Banner = (props) => {
    const Products=props?.ProductsData?.categoryDetail
    return (
        <div>
            <section id="common_banner_one" style={{backgroundImage:`url(${Products?.photo!=undefined?"https://elancier.in/agam/assets/images/"+Products?.photo:BanImg})`}}>
                <div className="container "  >
                    <div className="row">
                        <div className="col-lg-12">
                            {/* <img src={}/> */}
                            <div className="common_banner_text">
                                <h2>{Products?.name}</h2>
                                <ul>
                                    {/* <li><Link to="/">Home</Link></li>
                                    <li className="slash">/</li> */}
                                    <li className="active">{Products?.meta_descriptions}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Banner