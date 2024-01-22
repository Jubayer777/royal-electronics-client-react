import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Sidebar from "../SideBar/Sidebar";

const EditCategory = () => {
    const userName = sessionStorage.getItem("userName");
    const token = sessionStorage.getItem("token");
    const history = useHistory();
    const { id } = useParams();

    //load category data
    const [category, setCategory] = useState([]);
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/c1/categories/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setCategory(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);
    const { category_name } = category;

    //handle input value
    const [info, setInfo] = useState({});
    const handleBlur = (e) => {
        const newInfo = { ...info };
        newInfo[e.target.name] = e.target.value;
        setInfo(newInfo);
    };

    //handle updated data
    const handleUpload = (event) => {
        event.preventDefault();
        const categoryData = {
            category_name: info.category_name || category_name,
        };
        fetch(`http://127.0.0.1:8000/api/c1/categories/${id}`, {
            method: "PATCH",
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
                <h3 className="page-title">Update Category</h3>
                <p className="user-name">{userName}</p>
            </div>
            <div className="add_container">
                <form onSubmit={handleUpload}>
                    <label className="input-label">Category Name</label>
                    <br />
                    <input
                        className="input_field double_field"
                        onBlur={handleBlur}
                        defaultValue={category_name}
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

export default EditCategory;
