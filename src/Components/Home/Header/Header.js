import React from 'react';
import Banner from '../Banner/Banner';
import Navbar from '../Navbar/Navbar';
import NavbarTop from '../NavbarTop/NavbarTop';

const Header = () => {
    return (
        <div>
            <NavbarTop></NavbarTop>
            <Navbar></Navbar>
            <Banner></Banner>
        </div>
    );
};

export default Header;