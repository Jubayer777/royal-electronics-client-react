import React, { useContext } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../../App";
import "./Product.css";
import { useGlobalContext } from "../../../Context/GlobalContext";

const Product = (props) => {
    const { isAdmin } = useGlobalContext();
    const { id, product_name, price, image, product_quantity } = props.product;

    const history = useHistory();
    const handleProductDetails = (id) => {
        history.push(`/productDetails/${id}`);
    };
    return (
        <div className="single-product">
            <div className="card-style">
                <img
                    className="card-img"
                    src={`https://reapi.pabnafoods.com/upload/${image}`}
                    alt={image}
                />
                <div className="product-body">
                    <h3 className="product-name">{product_name}</h3>
                    <div className="body-top">
                        <p className="price-tag">
                            {" "}
                            <strong>&#x09F3;</strong> {price}
                        </p>
                        <h4 className="">
                            {product_quantity > 0 ? "In Stock" : "Stock Out"}
                        </h4>
                    </div>
                    <div className="body-top">
                        <button
                            type="button"
                            onClick={() => handleProductDetails(id)}
                            className=" action-btn"
                        >
                            Details
                        </button>

                        {!isAdmin && product_quantity > 0 && (
                            <button
                                type="button"
                                onClick={() =>
                                    props.handleAddProduct(props.product)
                                }
                                className="action-btn "
                            >
                                Add to Cart
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
