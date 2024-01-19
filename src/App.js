import "./App.css";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";

import Home from "./Components/Home/Home/Home";
import AddProduct from "./Components/Dashboard/AddProduct/AddProduct";
import AddCategory from "./Components/Dashboard/AddCategory/AddCategory";
import AddBrand from "./Components/Dashboard/AddBrand/AddBrand";
import Shop from "./Components/Shop/Shop/Shop";
import Brand from "./Components/Shop/Brand/Brand";
import Category from "./Components/Shop/Category/Category";
import ProductDetails from "./Components/Shop/ProductDetails/ProductDetails";
import LatestProduct from "./Components/Home/LatestProduct/LatestProduct";
import ManageProduct from "./Components/Dashboard/ManageProduct/ManageProduct";
import ManageCategory from "./Components/Dashboard/ManageCategory/ManageCategory";
import ManageBrand from "./Components/Dashboard/ManageBrand/ManageBrand";
import React, { createContext, useEffect, useState } from "react";
import Cart from "./Components/Dashboard/Cart/Cart";
import Checkout from "./Components/Dashboard/Checkout/Checkout";
import Login from "./Components/Login/Login";
import PrivateRoute from "./Components/PrivateRoute/ProivateRoute";
import Orders from "./Components/Dashboard/Orders/Orders";
import ManageOrders from "./Components/Dashboard/ManageOrders/ManageOrders";
import MakeAdmin from "./Components/Dashboard/MakeAdmin/MakeAdmin";
import ManageAdmin from "./Components/Dashboard/ManageAdmin/ManageAdmin";
import EditBrand from "./Components/Dashboard/EditBrand/EditBrand";
import EditCategory from "./Components/Dashboard/EditCategory/EditCategory";
import EditProduct from "./Components/Dashboard/EditProduct/EditProduct";
import Search from "./Components/Shop/Search/Search";
import EmailNotify from "./Components/Emails/EmailNotify/EmailNotify";
import VerifyUser from "./Components/Emails/VerifyUser/VerifyUser";
import ForgotPassword from "./Components/Emails/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/Emails/ResetPassword/ResetPassword";
import Invalid from "./Components/Invalid/Invalid";

export const UserContext = createContext();
export const UserContext2 = createContext();
export const UserContext3 = createContext();
function App() {
    const [cart, setCart] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState({});
    let { id } = loggedInUser;

    const userId = sessionStorage.getItem("userId");
    if (userId !== null) {
        id = userId;
    }
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/a1/adminCheck", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ user_id: id }),
        })
            .then((res) => res.json())
            .then((data) => {
                setIsAdmin(data.success);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    return (
        <div id="h-body" className="background">
            <UserContext.Provider value={[cart, setCart]}>
                <UserContext2.Provider value={[loggedInUser, setLoggedInUser]}>
                    <UserContext3.Provider value={[isAdmin, setIsAdmin]}>
                        <Router>
                            <Switch>
                                <Route path="/home">
                                    <Home></Home>
                                </Route>
                                <Route exact path="/">
                                    <Home />
                                </Route>
                                <Route path="/emailNotify">
                                    <EmailNotify></EmailNotify>
                                </Route>
                                <Route path="/verify-:email-:token">
                                    <VerifyUser />
                                </Route>
                                <Route path="/forgotPassword">
                                    <ForgotPassword />
                                </Route>
                                <Route
                                    path="/reset-password/:email/:token"
                                    exact
                                >
                                    <ResetPassword />
                                </Route>
                                <Route path="/invalid/:message">
                                    <Invalid />
                                </Route>
                                <Route path="/login">
                                    <Login></Login>
                                </Route>
                                <Route path="/shop">
                                    <Shop></Shop>
                                </Route>
                                <Route path="/search/:searchData">
                                    <Search></Search>
                                </Route>
                                <Route path="/brand/:id">
                                    <Brand></Brand>
                                </Route>
                                <Route path="/category/:id">
                                    <Category></Category>
                                </Route>
                                <Route path="/latestProduct">
                                    <LatestProduct></LatestProduct>
                                </Route>
                                <Route path="/productDetails/:id">
                                    <ProductDetails></ProductDetails>
                                </Route>

                                {!isAdmin ? (
                                    <React.Fragment>
                                        <PrivateRoute path="/dashboard">
                                            <Orders></Orders>
                                        </PrivateRoute>
                                        <PrivateRoute path="/cart">
                                            <Cart></Cart>
                                        </PrivateRoute>
                                        <PrivateRoute path="/checkout">
                                            <Checkout></Checkout>
                                        </PrivateRoute>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <PrivateRoute path="/dashboard">
                                            <ManageProduct></ManageProduct>
                                        </PrivateRoute>
                                        <PrivateRoute path="/addProduct">
                                            <AddProduct></AddProduct>
                                        </PrivateRoute>
                                        <PrivateRoute path="/editProduct/:id">
                                            <EditProduct></EditProduct>
                                        </PrivateRoute>
                                        <PrivateRoute path="/addCategory">
                                            <AddCategory></AddCategory>
                                        </PrivateRoute>
                                        <PrivateRoute path="/manageCategory">
                                            <ManageCategory></ManageCategory>
                                        </PrivateRoute>
                                        <PrivateRoute path="/editCategory/:id">
                                            <EditCategory></EditCategory>
                                        </PrivateRoute>
                                        <PrivateRoute path="/addBrand">
                                            <AddBrand></AddBrand>
                                        </PrivateRoute>
                                        <PrivateRoute path="/manageBrand">
                                            <ManageBrand></ManageBrand>
                                        </PrivateRoute>
                                        <PrivateRoute path="/editBrand/:id">
                                            <EditBrand></EditBrand>
                                        </PrivateRoute>
                                        <PrivateRoute path="/manageOrder">
                                            <ManageOrders></ManageOrders>
                                        </PrivateRoute>
                                        <PrivateRoute path="/makeAdmin">
                                            <MakeAdmin></MakeAdmin>
                                        </PrivateRoute>
                                        <PrivateRoute path="/manageAdmin">
                                            <ManageAdmin></ManageAdmin>
                                        </PrivateRoute>
                                    </React.Fragment>
                                )}
                            </Switch>
                        </Router>
                    </UserContext3.Provider>
                </UserContext2.Provider>
            </UserContext.Provider>
        </div>
    );
}

export default App;
