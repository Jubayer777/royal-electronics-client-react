import React from 'react';
import './Services.css';

const Services = () => {
    return (
        <div>
            <h2 className="services-title">Services We Provide</h2>
            <div className="services-container">
                <div  className="service">
                    <h2>Quality Product</h2>
                    <p className="service-body">We ensure the quality of our product.Our products are 100% Authentic branded and user friendly.</p>
                </div>
                    <div className="service">
                        <h2>Quick Delivery</h2>
                        <p className="service-body">We deliver your product within 3-4 days all over Bangladesh. we granted your product until you received it.</p>
                </div>
                <div  className="service">
                    <h2 >Easy Payment</h2>
                    <p className="service-body">We are offering you an easy payment through card. Our product cost includes 5% VAT, 100tk shipping and free shipping for more than 5000tk</p> 
                </div>
            </div>
        </div>
        
    );
};

export default Services;