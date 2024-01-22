import React, { useContext, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import "./Sidebar.css";
import { IconContext } from "react-icons";
import { AdminSidebarData } from "./AdminSidebarData";
import { UserSidebarData } from "./UserSidebarData";
import { UserContext, UserContext2, UserContext3 } from "../../../App";

const Sidebar = () => {
    const history = useHistory();
    const [cart, setCart] = useContext(UserContext);
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext2);
    const [isAdmin, setIsAdmin] = useContext(UserContext3);

    let Role = "";
    if (isAdmin) {
        Role = "Admin";
    } else {
        Role = "User";
    }
    const token = sessionStorage.getItem("token");
    const handleSignOut = () => {
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
                history.push("/home");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const time = sessionStorage.getItem("time");
    if (time) {
        const today = new Date();
        const diff = new Date(today) - new Date(time);
        const min = Math.floor(diff / 1000 / 60);
        if (min > 29) {
            sessionStorage.clear();
            cart.length = 0;
            setLoggedInUser({});
            history.push("/home");
        }
    }
    return (
        <div>
            <IconContext.Provider value={{ color: "#fff" }}>
                <div className="navbar-top">
                    <Link to="#" className="menu-bars px-3">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    <p className="role-tag">
                        {Role}
                        <span className="signOut" onClick={handleSignOut}>
                            <span>
                                <FaIcons.FaSignOutAlt />
                            </span>{" "}
                            SignOut
                        </span>
                    </p>
                </div>

                <nav
                    className={sidebar ? "nav-menu active" : "nav-menu"}
                    style={{ position: "fixed" }}
                >
                    <ul className="nav-menu-items" onClick={showSidebar}>
                        <li className="navbar-top-toggle">
                            <Link to="#" className="menu-bars">
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {Role === "Admin"
                            ? AdminSidebarData.map((item, index) => {
                                  return (
                                      <li key={index} className={item.cName}>
                                          <Link to={item.path}>
                                              {item.icon}
                                              <span>{item.title}</span>
                                          </Link>
                                      </li>
                                  );
                              })
                            : UserSidebarData.map((item, index) => {
                                  return (
                                      <li key={index} className={item.cName}>
                                          <Link to={item.path}>
                                              {item.icon}
                                              <span>{item.title}</span>
                                          </Link>
                                      </li>
                                  );
                              })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </div>
    );
};

export default Sidebar;
