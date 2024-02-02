import React, { useState } from "react";
import { useHistory } from "react-router";
import ProcessPayment from "../ProcessPayment/ProcessPayment";
import Sidebar from "../SideBar/Sidebar";
import "./Checkout.css";
import { useGlobalContext } from "../../../Context/GlobalContext";

const Checkout = () => {
    const history = useHistory();
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");
    const userEmail = sessionStorage.getItem("userEmail");
    const userName = sessionStorage.getItem("userName");
    const { cart, setCart } = useGlobalContext();

    const [info, setInfo] = useState({});
    const handleBlur = (e) => {
        const newInfo = { ...info };
        newInfo[e.target.name] = e.target.value;
        setInfo(newInfo);
    };

    const formateNumber = (num) => {
        const precision = num.toFixed(2);
        return Number(precision);
    };

    const [paymentError, setPaymentError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(null);
    const handlePaymentSuccess = (paymentResponse) => {
        const address = info.address;
        if (paymentResponse.startsWith("pm_")) {
            const products = [];

            if (cart.total !== 0) {
                cart.map((ct) => {
                    const productData = {
                        product_id: ct.id,
                        quantity: ct.quantity,
                    };
                    products.push(productData);
                    let id = ct.id;
                    let quantity = ct.product_quantity - ct.quantity;
                    const formData = new FormData();
                    formData.append("product_name", ct.product_name);
                    formData.append("category_id", ct.category_id);
                    formData.append("brand_id", ct.brand_id);
                    formData.append("description", ct.description);
                    formData.append("price", ct.price);
                    formData.append("product_quantity", quantity);
                    formData.append("image", ct.image);
                    formData.append("_method", "PATCH");
                    fetch(
                        `https://reapi.pabnafoods.com/api/p1/products/${id}`,
                        {
                            method: "POST",
                            headers: {
                                authorization: `Bearer ${token}`,
                            },
                            body: formData,
                        }
                    )
                        .then((res) => res.json())
                        .then((data) => {})
                        .catch((err) => {
                            console.log(err);
                        });
                });
                const newOrder = {
                    user_id: userId,
                    address: address,
                    payment_id: paymentResponse,
                    products: products,
                    total: cart.total,
                    status: "Pending",
                };
                fetch("https://reapi.pabnafoods.com/api/o1/orders", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(newOrder),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        alert(data.message);
                        document.getElementById("myForm").reset();
                        setPaymentSuccess(paymentResponse);
                        setPaymentError(null);
                        setCart([]);
                        history.push("/dashboard");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                alert("Your Cart is empty! please select some product first.");
            }
        } else {
            setPaymentError(paymentResponse);
            setPaymentSuccess(null);
        }
    };

    return (
        <div>
            <Sidebar></Sidebar>
            <div className="top-area">
                <h3 className="page-title">Checkout</h3>
                <p className="user-name">{userName}</p>
            </div>
            <div className="book_form">
                <form id="myForm">
                    <div className="name_email">
                        <div className="book_half">
                            <label className="input-label ">Name</label>
                            <br />
                            <input
                                className="input_field double_field"
                                onBlur={handleBlur}
                                value={userName}
                                name="name"
                                readOnly
                            />
                        </div>
                        <div className="book_half">
                            <label className="input-label">Email</label>
                            <br />
                            <input
                                className="input_field double_field"
                                onBlur={handleBlur}
                                value={userEmail}
                                name="email"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="address">
                        <label className="input-label">Address</label>
                        <br />
                        <textarea
                            className="input_field single_field"
                            onBlur={handleBlur}
                            placeholder="house#, road#, area#, district#"
                            name="address"
                            required
                        />
                    </div>
                </form>
                <div className="payment">
                    <ProcessPayment
                        handlePayment={handlePaymentSuccess}
                    ></ProcessPayment>
                    <br />
                    <p className="pay_cost">
                        Total Cost:<span className="cost_amount">&#x9F3;</span>
                        {cart.total}
                    </p>
                    {paymentError && (
                        <p style={{ color: "red" }}>{paymentError}</p>
                    )}
                    {paymentSuccess && (
                        <p style={{ color: "green" }}>
                            Your payment is successful
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Checkout;
