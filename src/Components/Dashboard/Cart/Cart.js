import React from "react";
import "./Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import Sidebar from "../SideBar/Sidebar";
import { useGlobalContext } from "../../../Context/GlobalContext";

const Cart = () => {
    const userName = sessionStorage.getItem("userName");
    const { cart, setCart } = useGlobalContext();
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity || 1;
    }
    let shipping = 0;
    if (total > 5000) {
        shipping = 0;
    } else if (total > 0) {
        shipping = 150;
    }

    const formateNumber = (num) => {
        const precision = num.toFixed(2);
        return Number(precision);
    };
    const tax = (total * 5) / 100;
    const grandTotal = total + shipping + formateNumber(tax);

    const handleQuantity = (item, isIncrease) => {
        let itemQuantity = item.quantity;
        if (isIncrease && itemQuantity < item.product_quantity) {
            //Increase product quantity
            itemQuantity = itemQuantity + 1;
        }
        if (!isIncrease && itemQuantity > 0) {
            //Decrease product quantity
            itemQuantity = itemQuantity - 1;
        }
        const index = cart.findIndex((ct) => ct === item);
        const newCart = [...cart];
        newCart[index].quantity = itemQuantity;
        if (itemQuantity === 0) {
            newCart.splice(index, 1);
        }

        setCart(newCart);
    };

    const history = useHistory();
    const handleOrder = () => {
        if (cart.length === 0) {
            alert("Your cart is empty, to proceed please select some item");
        } else {
            const newCart = [...cart];
            newCart.total = grandTotal;
            setCart(newCart);
            history.push(`/checkout`);
        }
    };

    return (
        <div>
            <Sidebar></Sidebar>
            <div className="top-area">
                <h3 className="page-title">Shopping Cart</h3>
                <p className="user-name">{userName}</p>
            </div>
            {cart.length !== 0 ? (
                <div>
                    <table className="table-area">
                        <thead>
                            <tr>
                                <th scope="col">Product Name</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Action</th>
                                <th scope="col">Price</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item._id}>
                                    <td data-label="Product Name">
                                        {item.product_name}
                                    </td>
                                    <td data-label="Quantity">
                                        {item.quantity}
                                    </td>
                                    <td data-label="Action">
                                        <button
                                            onClick={() =>
                                                handleQuantity(item, true)
                                            }
                                            className="quantity-btn"
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>{" "}
                                        <button
                                            onClick={() =>
                                                handleQuantity(item, false)
                                            }
                                            className="quantity-btn"
                                        >
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                    </td>
                                    <td data-label="Price">
                                        <span className="h4">&#x9F3;</span>{" "}
                                        {item.price}
                                    </td>
                                    <td data-label="Total">
                                        <span className="h4">&#x9F3;</span>{" "}
                                        {item.quantity * item.price}
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td className="cart-head optional-td">
                                    Shipping Cost
                                </td>
                                <td className="optional-td"></td>
                                <td className="optional-td"></td>
                                <td className="optional-td"></td>
                                <td data-label="Shipping Cost">
                                    <span className="h4">&#x9F3;</span>{" "}
                                    {shipping}
                                </td>
                            </tr>
                            <tr>
                                <td className="cart-head optional-td">
                                    Tax (5%)
                                </td>
                                <td className="optional-td"></td>
                                <td className="optional-td"></td>
                                <td className="optional-td"></td>
                                <td data-label="Tax (5%)">
                                    <span className="h4">&#x9F3;</span>{" "}
                                    {formateNumber(tax)}
                                </td>
                            </tr>
                            <tr>
                                <td className="cart-head optional-td">
                                    Sub-Total
                                </td>
                                <td className="optional-td"></td>
                                <td className="optional-td"></td>
                                <td className="optional-td"></td>
                                <td
                                    data-label="Sub-Total"
                                    className="font-weight-bold"
                                >
                                    <strong>&#x9F3;</strong>{" "}
                                    {formateNumber(grandTotal)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button
                        type="button"
                        onClick={handleOrder}
                        className="order-btn"
                    >
                        Place Order
                    </button>
                </div>
            ) : (
                <div className="no_order">
                    <h3 className="user-orders">Your cart is empty</h3>
                </div>
            )}
        </div>
    );
};

export default Cart;
