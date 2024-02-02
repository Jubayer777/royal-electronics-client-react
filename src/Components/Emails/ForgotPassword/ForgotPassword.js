import React from "react";
import { useHistory } from "react-router";
import { useState } from "react/cjs/react.development";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const history = useHistory();
    const emailHandler = (e) => {
        setEmail(e.target.value);
    };

    const forgotPasswordHandler = (event) => {
        event.preventDefault();
        const forgotPassword = async () => {
            const response = await fetch(
                "https://reapi.pabnafoods.com/api/forgot-password",
                {
                    method: "POST",
                    body: JSON.stringify({
                        email: email,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );
            const data = await response.json();
            setMessage(data.message);
            document.getElementById("forgot-form").reset();
        };
        forgotPassword();
    };

    return (
        <div className="add_container forgot_pass">
            <form id="forgot-form" onSubmit={forgotPasswordHandler}>
                <label className="input-label">Enter Email</label>
                <br />
                <input
                    className="input_field double_field"
                    type="email"
                    onChange={emailHandler}
                    placeholder="Enter your Email"
                    name="email"
                    required
                />
                <br />
                <button type="submit" className="submit-btn">
                    Submit
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPassword;
