import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import "./NavbarTop.css";
import { useGlobalContext } from "../../../Context/GlobalContext";

const NavbarTop = () => {
    const { cart, isAdmin } = useGlobalContext();

    const [info, setInfo] = useState({});
    const handleBlur = (e) => {
        const newInfo = { ...info };
        newInfo[e.target.name] = e.target.value;
        setInfo(newInfo);
    };

    const history = useHistory();
    const handleSearch = () => {
        if (info.searchData !== "") {
            const searchData = info.searchData;
            history.push(`/search/${searchData}`);
        } else {
            alert("You should put some product name");
        }
    };
    return (
        <div className="top-div">
            <div className="logo-div">
                <img src={logo} alt="not found" />
            </div>

            <div class="search-div">
                <input
                    type="text"
                    class=""
                    id="search-bar"
                    name="searchData"
                    onBlur={handleBlur}
                    placeholder="Product Name"
                />
                <button class="" onClick={handleSearch} id="search-btn">
                    Search
                </button>
            </div>

            <div className=" cart-div">
                {!isAdmin ? (
                    <div>
                        <Link className="link-style cart-style" to="/cart">
                            <FontAwesomeIcon
                                id="cart-icon"
                                icon={faShoppingCart}
                            />
                            <span
                                className="badge badge-warning"
                                id="lblCartCount"
                            >
                                {cart.length}
                            </span>
                        </Link>
                        <h5 id="cart-title">Shopping Cart</h5>
                    </div>
                ) : (
                    <div>
                        <Link className="px-3 pt-2 link-style cart-style">
                            <FontAwesomeIcon id="cart-icon" icon={faUser} />
                        </Link>
                        <h5 id="admin-title">Admin</h5>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavbarTop;
