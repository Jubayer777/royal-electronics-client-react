import React, { useState } from "react";
import { useHistory } from "react-router";
import Sidebar from "../SideBar/Sidebar";

const AddCategory = () => {
    const userName = sessionStorage.getItem("userName");
    const token = sessionStorage.getItem("token");
    const history = useHistory();
    const [info, setInfo] = useState({});
    const handleBlur = (e) => {
        const newInfo = { ...info };
        newInfo[e.target.name] = e.target.value;
        setInfo(newInfo);
    };

    const handleUpload = (event) => {
        event.preventDefault();
        const categoryData = {
            category_name: info.category_name,
        };
        fetch("http://127.0.0.1:8000/api/c1/categories", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(categoryData),
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                history.push("/manageCategory");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <Sidebar></Sidebar>
            <div className="top-area">
                <h3 className="page-title">Add Category</h3>
                <p className="user-name">{userName}</p>
            </div>
            <div className="add_container">
                <form onSubmit={handleUpload}>
                    <label className="input-label">Category Name</label>
                    <br />
                    <input
                        className="input_field double_field"
                        onBlur={handleBlur}
                        placeholder="Enter Category Name"
                        name="category_name"
                        required
                    />
                    <br />
                    <button type="submit" className="submit-btn">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;
