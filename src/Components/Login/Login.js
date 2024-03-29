import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./Login.css";
import { useGlobalContext } from "../../Context/GlobalContext";
import { axiosInstance } from "../../Helper/ApiCall/ApiCall";
import { routes } from "../../Utils/Constant";
import { toast } from "react-toastify";

const Login = () => {
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const { setLoggedInUser, checkAdmin } = useGlobalContext();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const login = (data) => {
        axiosInstance
            .post(routes.login, data)
            .then(async (res) => {
                await checkAdmin(res.data.user.id);
                const today = new Date();
                localStorage.setItem("time", today);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userId", res.data.user.id);
                localStorage.setItem("userName", res.data.user.name);
                localStorage.setItem("userEmail", res.data.user.email);
                setLoggedInUser(res.data.user);
                history.replace(from);
                toast.success(res.data.message);
                reset();
            })
            .catch((err) => {
                toast.error(err?.response?.statusText);
            });
    };

    const onSubmit = (data) => {
        const loginData = {
            email: data.email,
            password: data.password,
        };
        login(loginData);
    };
    return (
        <div className="auth-container">
            <form className="auth-card" onSubmit={handleSubmit(onSubmit)}>
                <h3>Login</h3>
                <input
                    className="user-input"
                    placeholder="Email"
                    type="email"
                    name="email"
                    {...register("email", {
                        required: "Email is Required",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Provide a valid Email",
                        },
                    })}
                />
                <p className="user-field-error">
                    {errors.email && errors.email.message}
                </p>
                <input
                    className="user-input"
                    placeholder="Password"
                    type="password"
                    name="password"
                    {...register("password", {
                        required: "Password is Required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                        maxLength: {
                            value: 30,
                            message: "Password must be at most 30 characters",
                        },
                    })}
                />
                <p className="user-field-error">
                    {errors.password && errors.password.message}
                </p>
                <button className="auth-submit-btn" type="submit">
                    Login
                </button>
                <p className="select-option">
                    Don't have an account?
                    <Link to="/registration" className="auth-link">
                        Registration
                    </Link>
                </p>
                <Link className="forgot-btn" to="/forgotPassword">
                    Forgot Password
                </Link>
            </form>
        </div>
    );
};

export default Login;
