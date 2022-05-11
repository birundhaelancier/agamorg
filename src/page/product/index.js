import React,{useEffect, useState} from 'react'
import Header from '../../component/Common/Header'
import Banner from '../../component/Fashion/Banner'
import ProductDetailsOne from '../../component/Common/ProductDetails/ProductDetails'
import InstgramSlider from '../../component/Common/Instagram'
import Footer from '../../component/Common/Footer'
import { connect, useDispatch } from 'react-redux'
import { Related_Products } from '../../Redux/Action/allActions'
import { useParams } from 'react-router-dom'
const ProductDetails = (props) => {
    let dispatch=useDispatch()
    let { productid } =useParams()
    const [RelatedProduct,setRelatedProduct]=useState([])
    useEffect(()=>{
        dispatch(Related_Products(productid))
       },[productid])
       useEffect(()=>{
         setRelatedProduct(props.Related_list)
       },[props.Related_list])
    return (
        <>
            <Header/>
            <Banner title="Product Details" />
            <ProductDetailsOne />
            <InstgramSlider title="Related Produts" RelatedProduct={RelatedProduct}/>
            <Footer />
        </>
    )
}

const mapStateToProps = (state) =>
({
  Related_list: state.AllReducer.Related_list || [],
});
export default connect(mapStateToProps)(ProductDetails);