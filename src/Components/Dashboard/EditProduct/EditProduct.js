import React, { useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router";
import Sidebar from "../SideBar/Sidebar";
import ReactHtmlParser, {
    processNodes,
    convertNodeToElement,
    htmlparser2,
} from "react-html-parser";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import camera from "../../../images/camera.png";

const EditProduct = () => {
    const userName = sessionStorage.getItem("userName");
    const token = sessionStorage.getItem("token");
    const history = useHistory();
    const { id } = useParams();
    console.log(id);

    //load product data
    const [product, setProduct] = useState([]);
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/p1/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);
    const {
        product_name,
        description,
        price,
        image,
        category_id,
        brand_id,
        product_quantity,
    } = product;

    //load categories
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/c1/categories")
            .then((res) => res.json())
            .then((data) => {
                setCategories(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [categories]);

    //load brands
    const [brands, setBrands] = useState([]);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/b1/brands")
            .then((res) => res.json())
            .then((data) => {
                setBrands(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [brands]);

    //select image
    const [info, setInfo] = useState({});
    const imageRef = useRef(null);
    const handleImageInput = () => {
        imageRef.current?.click();
    };
    const [photo, setPhoto] = useState("");
    const handleImage = (e) => {
        setPhoto(e.target.files[0]);
    };

    //handle input value
    const handleBlur = (e) => {
        const newInfo = { ...info };
        newInfo[e.target.name] = e.target.value;
        setInfo(newInfo);
    };

    //manage ckeditor
    const [ckData, setCkData] = useState("");
    const handleChange = (e, editor) => {
        const data = editor.getData();
        setCkData(data);
    };

    //handle updated data
    const handleUpload = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("product_name", info.product_name || product_name);
        formData.append("category_id", info.category_id || category_id);
        formData.append("brand_id", info.brand_id || brand_id);
        formData.append("description", ckData || description);
        formData.append("price", info.price || price);
        formData.append("product_quantity", info.quantity || product_quantity);
        formData.append("image", photo || image);
        formData.append("_method", "PATCH");

        fetch(`http://127.0.0.1:8000/api/p1/products/${id}`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`,
            },
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                history.push("/dashboard");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <Sidebar></Sidebar>
            <div className="top-area">
                <h3 className="page-title">Update Product</h3>
                <p className="user-name">{userName}</p>
            </div>
            <div>
                <form onSubmit={handleUpload}>
                    <div className="product_section">
                        <div className="book_half">
                            <label className="input-label">Product Name</label>
                            <br />
                            <input
                                className="input_field half_field"
                                onBlur={handleBlur}
                                placeholder="Enter Name"
                                defaultValue={product_name}
                                name="product_name"
                                required
                            />
                        </div>
                        <div className="book_half">
                            <label className="input-label">Price</label>
                            <br />
                            <input
                                className="input_field half_field"
                                onBlur={handleBlur}
                                defaultValue={price}
                                placeholder="Enter Price"
                                name="price"
                                required
                            />
                        </div>
                    </div>
                    <div className="description_section">
                        <div>
                            <label className="input-label">Description</label>
                            <br />
                            <CKEditor
                                data={description}
                                editor={ClassicEditor}
                                onChange={(e, editor) => {
                                    handleChange(e, editor);
                                }}
                            ></CKEditor>
                            <br />
                        </div>
                    </div>
                    <div className="product_section">
                        <div className="card_left">
                            <label className="input-label">
                                Category Name:
                            </label>
                            <br />
                            <select
                                name="category_id"
                                className="input_field dropdown-field"
                                defaultValue={category_id}
                                onBlur={handleBlur}
                            >
                                {categories.map((ct) => (
                                    <option
                                        selected={category_id === ct.id}
                                        value={ct.id}
                                    >
                                        {ct.category_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="card_mid">
                            <label className="input-label">Brand Name:</label>
                            <br />
                            <select
                                name="brand_id"
                                className="input_field dropdown-field"
                                required
                                defaultValue={brand_id}
                                onBlur={handleBlur}
                            >
                                {brands.map((bd) => (
                                    <option
                                        selected={brand_id === bd.id}
                                        value={bd.id}
                                    >
                                        {bd.brand_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="card_right">
                            <label className="input-label">Quantity</label>
                            <br />
                            <input
                                className="input_field number_input"
                                type="number"
                                required
                                onBlur={handleBlur}
                                defaultValue={product_quantity}
                                min="0"
                                name="quantity"
                            />
                        </div>
                    </div>
                    <div className="image_div">
                        <div>
                            <label className="input-label">Photo</label>
                            {image && (
                                <div className="img-review">
                                    {photo === "" ? (
                                        <img
                                            className="img-div"
                                            src={`http://127.0.0.1:8000/upload/${image}`}
                                            alt={image}
                                        />
                                    ) : (
                                        <img
                                            className="img-div"
                                            src={URL.createObjectURL(photo)}
                                            alt={photo.name}
                                        />
                                    )}
                                    <div
                                        className="input-camera"
                                        onClick={handleImageInput}
                                    >
                                        <img src={camera} alt="camera" />
                                    </div>
                                </div>
                            )}
                            <input
                                className="img-input"
                                type="file"
                                name="photo"
                                ref={imageRef}
                                onChange={handleImage}
                                required
                            />
                        </div>
                    </div>
                    <div className="submit_div">
                        <button type="submit" className="submit-btn">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
