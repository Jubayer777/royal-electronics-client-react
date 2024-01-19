import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faGooglePlusG, faSkype } from '@fortawesome/free-brands-svg-icons';
import "./Footer.css";



const Footer = () => {
    return (
        <div>
            <div className="bg">
                <div className="footer-container">
                    <div className="footer-row">
                        <div className="">
                            <h3 className="footer-heading">Royal Electronics</h3>
                            <div className="icon">
                                <a className="style" rel="noopener noreferrer" target="_blank" href="https://www.facebook.com/jubayer.allmhamud/"><FontAwesomeIcon icon={faFacebook} /></a>
                                <a className="style" rel="noopener noreferrer" target="_blank" href="https://twitter.com/jubayer_i"><FontAwesomeIcon icon={faTwitter} /></a>
                                <a className="style"  href="#"><FontAwesomeIcon icon={faGooglePlusG} /></a>
                                <a className="style"  href="#"><FontAwesomeIcon icon={faSkype} /></a>
                            </div>
                        </div>
                        <div className="address_footer">
                            <h3 className=" footer-heading">OUR ADDRESS</h3>
                            <p className="text-header">_____</p>
                            <h4>45/F/8 Rongon Tower <br />
                            West Panthapath<br/>
                            Dhaka, 1215</h4>
                            <h4 className="padding-top wrap-text">royalelectronics@gmail.com</h4>
                            <h4 className="padding-top">+8801720009768</h4>
                        </div>
                        <div className=" ourServices">
                            <h3 className="footer-heading">OUR SERVICES</h3>
                            <p className="text-header">_____</p>
                                <h5>Quality Product</h5>
                                <h5>Quick Delivery</h5>
                                <h5>Easy Payment</h5>
                                <h5 className="">10 Days Exchange Facility</h5>
                                <h5>Appliance Repair</h5>
                        </div>
                        <div className="">
                            <h3 className="footer-heading">QUICK LINKS</h3>
                            <p className="text-header">_____</p>
                            <ul className="footer-list">
                                <li><a href="/home">Home</a></li>
                                <li><a href="#">About</a></li>
                                <li><a href="#">Contact US</a></li>
                                <li><a href="/login">Login</a></li>
                                <li><a href="/dashboard">Dashboard</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-bottom">
                <p className="fb-1">© {(new Date().getFullYear())} - Royal Electronics. Created by<span className="fb-2">Jubayer Al Alam </span>All rights reserved.</p>
            </div>
    </div>
    );
};

export default Footer;