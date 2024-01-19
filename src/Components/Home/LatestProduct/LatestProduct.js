import React, { useEffect, useState } from "react";
import Product from "../../Shop/Product/Product";
import "./LatestProduct.css";
import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// spinner css
const override = css`
    display: block;
    margin: 0 auto;
    margin-top: 15%;
    margin-bottom: 15%;
    border-color: red;
`;

const LatestProduct = () => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("orange");

    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/p1/products/latest`)
            .then((res) => res.json())
            .then((data) => {
                //console.log(data.data)
                setProducts(data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [products]);

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

            <Link id="see-all-link" to="/shop">
                See all
            </Link>
        </div>
    );
};

export default LatestProduct;
