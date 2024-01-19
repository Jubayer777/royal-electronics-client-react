import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { UserContext2 } from "../../App";
import "./Login.css";

const Login = () => {
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [loggedInUser, setLoggedInUser] = useContext(UserContext2);
    const [error, setError] = useState("");
    const [errorsData, setErrorsData] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        if (newUser) {
            const registrationData = {
                name: data.name,
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation,
            };
            console.log("check", registrationData);
            const url = "http://127.0.0.1:8000/api/auth/register";
            fetch(url, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(registrationData),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success === true) {
                        console.log(data, "kk");
                        history.push(`/emailNotify`);
                    } else if (data.success === false && data.errors) {
                        setErrorsData(data.errors);
                        setError("");
                    } else {
                        alert(data.message);
                        setErrorsData("");
                        setError("");
                        reset();
                    }
                });
        } else {
            const loginData = {
                email: data.email,
                password: data.password,
            };
            console.log(loginData);
            const url = "http://127.0.0.1:8000/api/auth/login";
            fetch(url, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(loginData),
            })
                .then((res) => res.json())
                .then((data) => {
                    const today = new Date();

                    if (data.success === true) {
                        alert(data.message);
                        sessionStorage.setItem("time", today);
                        sessionStorage.setItem("token", data.token);
                        sessionStorage.setItem("userId", data.user.id);
                        sessionStorage.setItem("userName", data.user.name);
                        sessionStorage.setItem("userEmail", data.user.email);
                        setLoggedInUser(data.user);
                        history.replace(from);
                        reset();
                    } else if (data.error) {
                        setError(data.error);
                        setErrorsData("");
                    } else if (data.success === false && data.errors) {
                        setErrorsData(data.errors);
                        setError("");
                    } else {
                        alert(data.message);
                        setError("");
                        setErrorsData("");
                        reset();
                    }
                });
        }
    };

    const [newUser, setNewUser] = useState(false);
    const handleUserType = () => {
        setError("");
        setErrorsData("");
        setNewUser(!newUser);
        reset();
    };
    return (
        <div className="login-card">
            {newUser ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3>Registration</h3>
                    <input
                        className="user-input"
                        placeholder="Name"
                        name="name"
                        {...register("name")}
                        required
                    />
                    <br />
                    <input
                        className="user-input"
                        type="email"
                        placeholder="Email"
                        name="email"
                        {...register("email")}
                        required
                    />
                    <br />
                    <input
                        className="user-input"
                        type="password"
                        placeholder="Password"
                        name="password"
                        {...register("password")}
                        required
                    />
                    <br />
                    <input
                        className="user-input"
                        type="password"
                        placeholder="Confirm Your Password"
                        name="password_confirmation"
                        {...register("password_confirmation")}
                        required
                    />
                    <br />
                    <button className="user-submit" type="submit">
                        Registration
                    </button>
                </form>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3>Login</h3>
                    <input
                        className="user-input"
                        placeholder="Email"
                        type="email"
                        name="email"
                        {...register("email")}
                        required
                    />
                    <br />
                    <input
                        className="user-input"
                        placeholder="Password"
                        type="password"
                        name="password"
                        {...register("password")}
                        required
                    />
                    <br />

                    <button className="user-submit" type="submit">
                        Login
                    </button>
                </form>
            )}
            <p className="select-option">
                {newUser
                    ? "Already have an account?"
                    : "Don't have an account?"}
                <span>
                    <input
                        type="submit"
                        onClick={handleUserType}
                        className="user-manage-btn"
                        value={newUser ? "Login" : "Registration"}
                    />
                </span>
            </p>
            {!newUser && (
                <Link className="forgot-btn" to="/forgotPassword">
                    Forgot Password
                </Link>
            )}
            {errorsData.email &&
                errorsData.email.map((e) => <p className="errors">{e}</p>)}
            {errorsData.password &&
                errorsData.password.map((p) => <p className="errors">{p}</p>)}
            {error && <p className="errors">{error}</p>}
        </div>
    );
};

export default Login;
