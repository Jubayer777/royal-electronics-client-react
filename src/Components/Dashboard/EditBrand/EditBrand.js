import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Sidebar from "../SideBar/Sidebar";

const EditBrand = () => {
    const userName = sessionStorage.getItem("userName");
    const token = sessionStorage.getItem("token");
    const history = useHistory();
    const { id } = useParams();

    //load brand data
    const [brand, setBrand] = useState([]);
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/b1/brands/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setBrand(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);
    const { brand_name } = brand;

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
        const brandData = {
            brand_name: info.brand_name || brand_name,
        };
        fetch(`http://127.0.0.1:8000/api/b1/brands/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(brandData),
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                history.push("/manageBrand");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <Sidebar></Sidebar>
            <div className="top-area">
                <h3 className="page-title">Update Brand</h3>
                <p className="user-name">{userName}</p>
            </div>
            <div className="add_container">
                <form onSubmit={handleUpload}>
                    <label className="input-label">Brand Name</label>
                    <br />
                    <input
                        className="input_field double_field"
                        onBlur={handleBlur}
                        defaultValue={brand_name}
                        name="brand_name"
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

export default EditBrand;
