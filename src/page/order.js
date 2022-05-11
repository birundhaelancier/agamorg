import React from 'react'
import Header from '../component/Common/Header'
import Layout from '../component/VendorDashboard/Layout'
import Orders from '../component/VendorDashboard/OrderDetail'
import Footer from '../component/Common/Footer'

const OrderDetails = () => {
    return (
        <>
            <Header />
            {/* <Banner  /> */}
            <Layout>
                <Orders />
            </Layout>
            <Footer />
        </>
    )
}

export default OrderDetails
