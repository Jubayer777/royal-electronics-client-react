import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import "./ProductDetails.css";
import ReactHtmlParser, {
    processNodes,
    convertNodeToElement,
    htmlparser2,
} from "react-html-parser";
import { UserContext, UserContext3 } from "../../../App";
import NavbarTop from "../../Home/NavbarTop/NavbarTop";
import Navbar from "../../Home/Navbar/Navbar";

const ProductDetails = () => {
    const { id } = useParams();
    const [isAdmin, setIsAdmin] = useContext(UserContext3);
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/p1/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data.data);
                setCategory(data.data.category);
                setBrand(data.data.brand);
                setLoad(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);
    const { product_name, description, price, image, product_quantity } =
        product;

    const [cart, setCart] = useContext(UserContext);
    const handleAddProduct = () => {
        console.log(product);
        const toBeAddedId = product.id;
        const sameProduct = cart.find((pd) => pd.id === toBeAddedId);
        let count = 1;
        let newCart;
        if (sameProduct) {
            if (sameProduct.quantity < product.product_quantity) {
                count = sameProduct.quantity + 1;
                sameProduct.quantity = count;
                const others = cart.filter((pd) => pd.id !== toBeAddedId);
                newCart = [...others, sameProduct];
            } else {
                sameProduct.quantity = product.product_quantity;
                const others = cart.filter((pd) => pd.id !== toBeAddedId);
                newCart = [...others, sameProduct];
            }
        } else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
    };

    return (
        <div>
            <NavbarTop></NavbarTop>
            <Navbar></Navbar>
            {!load ? (
                <div id="details-card">
                    <img
                        className="product-img"
                        src={`http://127.0.0.1:8000/upload/${image}`}
                        alt={image}
                    />
                    <div className="">
                        <h3 className="title">
                            <strong>Product Name: </strong>
                            {product_name}
                        </h3>
                        <p>
                            <strong>Category: </strong>
                            {category.category_name}
                        </p>
                        <p>
                            <strong>Brand: </strong>
                            {brand.brand_name}
                        </p>
                        <p>
                            <strong>Availability: </strong>{" "}
                            {product_quantity > 0 ? "In Stock" : "Stock Out"}
                        </p>
                        {product_quantity > 0 && (
                            <p>
                                <strong>Available Quantity: </strong>
                                {product_quantity}
                            </p>
                        )}
                        <p>
                            <strong>Description: </strong>
                            {ReactHtmlParser(description)}
                        </p>
                        <div className="body-top">
                            <h4 className="price-tag">
                                <strong className="bolder">
                                    Price: &#x9F3;
                                </strong>{" "}
                                {price}
                            </h4>
                            {!isAdmin && product_quantity > 0 && (
                                <button
                                    type="button"
                                    onClick={handleAddProduct}
                                    className="action-btn"
                                >
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <p className="loading">Loading...</p>
            )}
        </div>
    );
};

export default ProductDetails;
