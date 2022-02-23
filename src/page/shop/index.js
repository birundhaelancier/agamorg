import React,{useEffect,useState} from 'react'
import Header from '../../component/Common/Header'
import Banner from '../../component/Common/Banner'
import Shop from '../../component/Shop/Shop'
import InstgramSlider from '../../component/Common/Instagram'
import Footer from '../../component/Common/Footer'
import { CategoryList_api } from '../../Redux/Action/allActions'
import { connect,useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
const ShopGrid = (props) => {
    let { slug } =useParams()
    let dispatch=useDispatch()
    const [Products,setProducts]=useState([])
    useEffect(()=>{
        dispatch(CategoryList_api(slug))
    },[slug])    
    useEffect(()=>{
     setProducts(props.Category_List)
    },[props.Category_List])
    return (
        <>
            <Header ProductsData={Products}/>
            <Banner title="Shop" ProductsData={Products}/>
            <Shop ProductsData={Products}/>
            <InstgramSlider />
            <Footer />
        </>
    )
}

const mapStateToProps = (state) =>
({
    Category_List: state.AllReducer.Category_List || [],
});
export default connect(mapStateToProps)(ShopGrid);