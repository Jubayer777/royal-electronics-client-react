import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import LatestProduct from "../LatestProduct/LatestProduct";
import Services from "../Services/Services";

const Home = () => {
    return (
        <div>
            <Header></Header>
            <Services></Services>
            <LatestProduct></LatestProduct>
            <Footer></Footer>
        </div>
    );
};

export default Home;
