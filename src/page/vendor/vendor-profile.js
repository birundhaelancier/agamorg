import React from 'react'
import Header from '../../component/Common/Header'
import Layout from '../../component/VendorDashboard/Layout'
import Profile from '../../component/VendorDashboard/Profile'
import Banner from '../../component/Fashion/Banner'
import Footer from '../../component/Common/Footer'

const VendorProfile = () => {
    return (
        <>
            <Header />
            {/* <Banner  /> */}
            <Layout>
                <Profile />
            </Layout>
            <Footer />
        </>
    )
}

export default VendorProfile
