import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { apiurl, ImageUrl } from '../../../Redux/Utils/baseurl'
const Trending = () => {
    const [Banner,setBanner]=useState()
    useEffect(()=>{
        axios({
          method: "GET",
          url: apiurl+"homeBanner",
        }).then((response) => {
            console.log(response,"lllllllllllllllllllllllll")
            setBanner(response.data.image)
        });
    },[])
    return (
        <>
     <section id="special_offer_one" style={{backgroundImage:`url(${ImageUrl+Banner})`}}>
        <div className="container">
            <div className="row">
                <div className="col-lg-4 offset-lg-4 col-md-12 col-sm-12 col-12" >
                    <div className="offer_banner_one text-center" >
                        <div >

                        </div>
                        {/* <h5>TRENDING</h5>
                        <h2>New Fashion</h2>
                        <p>
                            Consectetur adipisicing elit. Dolores nisi distinctio magni, iure deserunt doloribus optio
                        </p>
                        <Link to="/shop" className="theme-btn-one bg-whites btn_md">Shop Now</Link> */}
                    </div>
                </div>
            </div>
        </div>
    </section>
        </>
    )
}

export default Trending
