import React, { useContext, useEffect, useState } from "react";
import Product from "../Product/Product";
import "./Shop.css";
import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";
import { UserContext } from "../../../App";
import NavbarTop from "../../Home/NavbarTop/NavbarTop";
import Navbar from "../../Home/Navbar/Navbar";
import Footer from "../../Home/Footer/Footer";
import Pagination from "../Pagination/Pagination";

// spinner css
const override = css`
    display: block;
    margin: 0 auto;
    margin-top: 15%;
    margin-bottom: 15%;
    border-color: red;
`;

const Shop = () => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("orange");

    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/p1/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [products]);

    const [cart, setCart] = useContext(UserContext);
    const handleAddProduct = (product) => {
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

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    // Get current posts
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const handleIncrement = () => {
        if (currentPage < Math.ceil(products.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };
    const handleDecrement = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <NavbarTop></NavbarTop>
            <Navbar></Navbar>
            {products.length !== 0 && (
                <div className="product-container">
                    <div className="products">
                        {currentItems.map((pd) => (
                            <Product
                                key={pd.id}
                                product={pd}
                                brand={pd.brand}
                                category={pd.category}
                                handleAddProduct={handleAddProduct}
                            ></Product>
                        ))}
                    </div>
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={products.length}
                        paginate={paginate}
                        pageIncrement={handleIncrement}
                        pageDecrement={handleDecrement}
                    />
                </div>
            )}

            <CircleLoader
                color={color}
                loading={loading}
                css={override}
                size={60}
            />
            {products.length === 0 && !loading && (
                <h4 className="no-match"> No match found!</h4>
            )}
            <Footer></Footer>
        </div>
    );
};

export default Shop;
