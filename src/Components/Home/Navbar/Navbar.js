import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShoppingCart,
    faUser,
    faPhoneAlt,
    faSignInAlt,
    faSignOutAlt,
    faCaretDown,
    faBars,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext, UserContext2 } from "../../../App";

const Navbar = () => {
    const token = sessionStorage.getItem("token");
    const userEmail = sessionStorage.getItem("userEmail");
    const userName = sessionStorage.getItem("userName");
    const [loggedInUser, setLoggedInUser] = useContext(UserContext2);
    const [cart, setCart] = useContext(UserContext);

    const handleLogOut = () => {
        const url = "http://127.0.0.1:8000/api/auth/logout";
        fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                sessionStorage.clear();
                cart.length = 0;
                setLoggedInUser({});
            });
    };

    const [brands, setBrands] = useState([]);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/b1/brands")
            .then((res) => res.json())
            .then((data) => {
                setBrands(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [brands]);

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/c1/categories")
            .then((res) => res.json())
            .then((data) => {
                setCategories(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [categories]);

    const myFunction = () => {
        const x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    };

    const time = sessionStorage?.getItem("time");
    if (time) {
        const today = new Date();
        const diff = new Date(today) - new Date(time);
        const min = Math.floor(diff / 1000 / 60);
        if (min > 29) {
            sessionStorage.clear();
            cart.length = 0;
            setLoggedInUser({});
        }
    }
    return (
        <div className="topnav" id="myTopnav">
            <div>
                <Link to="/home" className="active home">
                    Home
                </Link>
                <Link to="/shop">Shop</Link>
                <Link to="/dashboard">Dashboard</Link>
                <div className="dropdown">
                    <button className="dropbtn">
                        Category
                        <FontAwesomeIcon id="caret-btn" icon={faCaretDown} />
                    </button>
                    <div className="dropdown-content">
                        <Link to={"/shop"}>All</Link>
                        {categories?.map((ct) => (
                            <Link to={"/category/" + ct.id}>
                                {ct.category_name}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="dropdown">
                    <button className="dropbtn">
                        Brand
                        <FontAwesomeIcon id="caret-btn" icon={faCaretDown} />
                    </button>
                    <div className="dropdown-content">
                        <Link to={"/shop"}>All</Link>
                        {brands?.map((bd) => (
                            <Link to={"/brand/" + bd.id}>{bd.brand_name}</Link>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                {userName && (
                    <Link to="#">
                        <FontAwesomeIcon icon={faUser} /> {userName}
                    </Link>
                )}
                {!token ? (
                    <Link to="/login" className="log-btn">
                        <FontAwesomeIcon icon={faSignInAlt} /> Login
                    </Link>
                ) : (
                    <Link onClick={handleLogOut} to="/home" className="log-btn">
                        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                    </Link>
                )}
                <Link
                    to="#"
                    style={{ fontSize: "15px" }}
                    className="icon"
                    onClick={myFunction}
                >
                    <FontAwesomeIcon id="caret-btn" icon={faBars} />
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
