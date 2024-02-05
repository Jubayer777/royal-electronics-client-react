import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../Helper/ApiCall/ApiCall";
import { routes } from "../../Utils/Constant";
import { toast } from "react-toastify";

const Registration = () => {
    const history = useHistory();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const signUp = (data) => {
        axiosInstance
            .post(routes.signUp, data)
            .then((res) => {
                history.push(`/emailNotify`);
                toast.success(res.data.message);
            })
            .catch((err) => {
                toast.error(err?.response?.statusText);
            });
    };
    const onSubmit = (data) => {
        const registrationData = {
            name: data.name,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation,
        };
        signUp(registrationData);
    };
    return (
        <div className="auth-container">
            <form className="auth-card" onSubmit={handleSubmit(onSubmit)}>
                <h3>Registration</h3>
                <input
                    className="user-input"
                    placeholder="Name"
                    name="name"
                    {...register("name", {
                        required: "Name is Required",
                    })}
                />
                <p className="user-field-error">
                    {errors.name && errors.name.message}
                </p>
                <input
                    className="user-input"
                    type="email"
                    placeholder="Email"
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
                    type="password"
                    placeholder="Password"
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
                <input
                    className="user-input"
                    type="password"
                    placeholder="Confirm Your Password"
                    name="password_confirmation"
                    {...register("password_confirmation", {
                        required: "Password confirmation is Required",
                        validate: (value) =>
                            value === watch("password") ||
                            "Passwords do not match",
                    })}
                />
                <p className="user-field-error">
                    {errors.password_confirmation &&
                        errors.password_confirmation.message}
                </p>
                <button className="auth-submit-btn" type="submit">
                    SignUp
                </button>
                <p className="select-option">
                    Already have an account?
                    <Link to="/login" className="auth-link">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Registration;
