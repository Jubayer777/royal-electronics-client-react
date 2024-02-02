import React, { useEffect, useState } from "react";
import Product from "../../Shop/Product/Product";
import "./LatestProduct.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { axiosInstance } from "../../../Helper/ApiCall/ApiCall";
import { routes } from "../../../Utils/Constant";
import Loader from "../../Shop/Loader/Loader";

const LatestProduct = () => {
    const [products, setProducts] = useState([]);
    let [loading, setLoading] = useState(true);
    const getProducts = () => {
        axiosInstance
            .get(routes.latestProducts)
            .then((res) => {
                setProducts(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setProducts([]);
            });
    };

    useEffect(() => {
        getProducts();
    }, []);

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: false,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="banner-bg">
            <h2 className="latest-header">Our Latest Products</h2>

            {products.length > 0 && (
                <Slider {...settings}>
                    {products.map((pd) => (
                        <Product
                            key={pd.id}
                            product={pd}
                            brand={pd.brand}
                            category={pd.category}
                        ></Product>
                    ))}
                </Slider>
            )}
            {loading && (
                <div className="loader-div">
                    <Loader loading={loading} />
                </div>
            )}
            {products.length === 0 && !loading && (
                <h4 className="no-match"> No match found!</h4>
            )}

            {products.length > 0 && (
                <Link id="see-all-link" to="/shop">
                    See all
                </Link>
            )}
        </div>
    );
};

export default LatestProduct;
