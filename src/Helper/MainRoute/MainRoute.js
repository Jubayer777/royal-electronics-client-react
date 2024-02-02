import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../../Components/Home/Home/Home";
import EmailNotify from "../../Components/Emails/EmailNotify/EmailNotify";
import VerifyUser from "../../Components/Emails/VerifyUser/VerifyUser";
import ForgotPassword from "../../Components/Emails/ForgotPassword/ForgotPassword";
import ResetPassword from "../../Components/Emails/ResetPassword/ResetPassword";
import Invalid from "../../Components/Invalid/Invalid";
import Login from "../../Components/Login/Login";
import Shop from "../../Components/Shop/Shop/Shop";
import Search from "../../Components/Shop/Search/Search";
import Brand from "../../Components/Shop/Brand/Brand";
import Category from "../../Components/Shop/Category/Category";
import LatestProduct from "../../Components/Home/LatestProduct/LatestProduct";
import ProductDetails from "../../Components/Shop/ProductDetails/ProductDetails";
import PrivateRoute from "../PrivateRoute/ProivateRoute";
import Orders from "../../Components/Dashboard/Orders/Orders";
import Cart from "../../Components/Dashboard/Cart/Cart";
import Checkout from "../../Components/Dashboard/Checkout/Checkout";
import ManageProduct from "../../Components/Dashboard/ManageProduct/ManageProduct";
import AddProduct from "../../Components/Dashboard/AddProduct/AddProduct";
import EditProduct from "../../Components/Dashboard/EditProduct/EditProduct";
import AddCategory from "../../Components/Dashboard/AddCategory/AddCategory";
import ManageCategory from "../../Components/Dashboard/ManageCategory/ManageCategory";
import EditCategory from "../../Components/Dashboard/EditCategory/EditCategory";
import AddBrand from "../../Components/Dashboard/AddBrand/AddBrand";
import ManageBrand from "../../Components/Dashboard/ManageBrand/ManageBrand";
import EditBrand from "../../Components/Dashboard/EditBrand/EditBrand";
import ManageOrders from "../../Components/Dashboard/ManageOrders/ManageOrders";
import MakeAdmin from "../../Components/Dashboard/MakeAdmin/MakeAdmin";
import ManageAdmin from "../../Components/Dashboard/ManageAdmin/ManageAdmin";
import { useGlobalContext } from "../../Context/GlobalContext";

const MainRoute = () => {
    const { isAdmin } = useGlobalContext();
    return (
        <Router>
            <Switch>
                <Route path="/home">
                    <Home />
                </Route>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/emailNotify">
                    <EmailNotify />
                </Route>
                <Route path="/verify-:email-:token">
                    <VerifyUser />
                </Route>
                <Route path="/forgotPassword">
                    <ForgotPassword />
                </Route>
                <Route path="/reset-password/:email/:token" exact>
                    <ResetPassword />
                </Route>
                <Route path="/invalid/:message">
                    <Invalid />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/shop">
                    <Shop />
                </Route>
                <Route path="/search/:searchData">
                    <Search />
                </Route>
                <Route path="/brand/:id">
                    <Brand />
                </Route>
                <Route path="/category/:id">
                    <Category />
                </Route>
                <Route path="/latestProduct">
                    <LatestProduct />
                </Route>
                <Route path="/productDetails/:id">
                    <ProductDetails />
                </Route>

                {!isAdmin ? (
                    <React.Fragment>
                        <PrivateRoute path="/dashboard">
                            <Orders />
                        </PrivateRoute>
                        <PrivateRoute path="/cart">
                            <Cart />
                        </PrivateRoute>
                        <PrivateRoute path="/checkout">
                            <Checkout />
                        </PrivateRoute>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <PrivateRoute path="/dashboard">
                            <ManageProduct />
                        </PrivateRoute>
                        <PrivateRoute path="/addProduct">
                            <AddProduct />
                        </PrivateRoute>
                        <PrivateRoute path="/editProduct/:id">
                            <EditProduct />
                        </PrivateRoute>
                        <PrivateRoute path="/addCategory">
                            <AddCategory />
                        </PrivateRoute>
                        <PrivateRoute path="/manageCategory">
                            <ManageCategory />
                        </PrivateRoute>
                        <PrivateRoute path="/editCategory/:id">
                            <EditCategory />
                        </PrivateRoute>
                        <PrivateRoute path="/addBrand">
                            <AddBrand />
                        </PrivateRoute>
                        <PrivateRoute path="/manageBrand">
                            <ManageBrand />
                        </PrivateRoute>
                        <PrivateRoute path="/editBrand/:id">
                            <EditBrand />
                        </PrivateRoute>
                        <PrivateRoute path="/manageOrder">
                            <ManageOrders />
                        </PrivateRoute>
                        <PrivateRoute path="/makeAdmin">
                            <MakeAdmin />
                        </PrivateRoute>
                        <PrivateRoute path="/manageAdmin">
                            <ManageAdmin />
                        </PrivateRoute>
                    </React.Fragment>
                )}
            </Switch>
        </Router>
    );
};

export default MainRoute;
