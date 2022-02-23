import React from 'react';
import SliderComp from './Slider'
import Details from './Details'
// import Header from '../../component/Common/Header'
import Layout from '../../component/VendorDashboard/Layout'
import Banner from '../../component/Common/Banner'
import Createpost from './Createpost'
import Footer from '../../component/Common/Footer'
import Header from './Header'
 const FarmerDashboard=()=> {
  return(
      <div>
          <Header title="Dashboard"/>
          <div className='container'>
          <Details/>
          <SliderComp/>
          </div>
          <Footer />
      </div>
  );
}
export default FarmerDashboard;