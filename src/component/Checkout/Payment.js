import React from 'react'
const Payment = () => {
    return (
        <>
            <div className="order_review bg-white">
                <div className="check-heading">
                    <h3>Payment</h3>
                </div>
                <div className="payment_method">
                    <form>
                        <div className="accordion" id="accordionExample">
                            <div className="payment_area_wrappers">
                                <div className="heading_payment" id="headingOne">
                                    <div className="" data-toggle="collapse" data-target="#collapseOne" >
                                        <input type="radio" name="payment" id="html" value="HTML" defaultChecked />
                                        <label htmlFor="html">Online </label>
                                    </div>
                                </div>
                                <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div className="payment_body">
                                        <p>Online </p>
                                    </div>
                                </div>
                            </div>
                            <div className="payment_area_wrappers">
                                <div className="heading_payment" id="headingTwo">
                                    <div className="collapsed" data-toggle="collapse" data-target="#collapseTwo">
                                        <input type="radio" name="payment" id="javascript" value="JavaScript" />
                                        <label htmlFor="javascript">Cash on delivery </label>
                                    </div>
                                </div>
                                <div id="collapseTwo" className="collapse" data-parent="#accordionExample">
                                    <div className="payment_body">
                                        <p> Cash on delivery</p>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="payment_area_wrappers">
                                <div className="heading_payment" id="headingThree">
                                    <div className="collapsed" data-toggle="collapse" data-target="#collapseThree">
                                        <input type="radio" name="payment" id="css" value="JavaScript" />
                                        <label htmlFor="css">Paypal</label>
                                    </div>
                                </div>
                                <div id="collapseThree" className="collapse" data-parent="#accordionExample">
                                    <div className="payment_body">
                                        <p>Some placeholder content for the second accordion panel. This panel is hidden by default.</p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </form>
                </div>
                <button className="theme-btn-one btn-black-overlay btn_sm">Place Order</button>
            </div>
        </>
    )
}

export default Payment