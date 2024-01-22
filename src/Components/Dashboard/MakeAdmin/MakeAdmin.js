import React, { useState } from "react";
import { useHistory } from "react-router";
import Sidebar from "../SideBar/Sidebar";

const MakeAdmin = () => {
    const userName = sessionStorage.getItem("userName");
    const token = sessionStorage.getItem("token");
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");
    const [errorsData, setErrorsData] = useState("");
    const [info, setInfo] = useState({});

    const handleBlur = (e) => {
        const newInfo = { ...info };
        newInfo[e.target.name] = e.target.value;
        setInfo(newInfo);
    };

    const handleUpload = (event) => {
        event.preventDefault();
        const adminData = {
            email: info.email,
        };
        console.log(adminData);

        fetch("http://127.0.0.1:8000/api/a1/admins", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(adminData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.success === true) {
                    alert(data.message);
                    history.push("/manageAdmin");
                } else if (data.success === false && data.errors) {
                    setErrorsData(data.errors);
                    setErrorMessage("");
                } else if (data.success === false && data.message) {
                    setErrorsData("");
                    setErrorMessage(data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div>
            <Sidebar></Sidebar>
            <div className="top-area">
                <h3 className="page-title">Make Admin</h3>
                <p className="user-name">{userName}</p>
            </div>
            <div className="add_container">
                <form onSubmit={handleUpload}>
                    <label className="input-label">Email</label>
                    <br />
                    <input
                        className="input_field double_field"
                        onBlur={handleBlur}
                        placeholder="example@gmail.com"
                        name="email"
                        type="email"
                        required
                    />
                    <br />
                    <button type="submit" className="submit-btn">
                        Submit
                    </button>
                </form>
                {errorsData.email &&
                    errorsData.email.map((e) => (
                        <p className="error-txt">{e}</p>
                    ))}
                {errorMessage && <p className="error-txt">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default MakeAdmin;
