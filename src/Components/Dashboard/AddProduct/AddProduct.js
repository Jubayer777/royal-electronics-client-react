import React, { useEffect, useState, useRef } from "react";
import "./AddProduct.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Sidebar from "../SideBar/Sidebar";
import { useHistory } from "react-router";
import gallary from "../../../images/gallery.png";
import camera from "../../../images/camera.png";

const AddProduct = () => {
  const userName = sessionStorage.getItem("userName");
  const token = sessionStorage.getItem("token");
  const history = useHistory();
  const [ckData, setCkData] = useState("");
  const [info, setInfo] = useState({});
  const imageRef = useRef(null);
  const [image, setImage] = useState("");
  const handleImageInput = () => {
    imageRef.current?.click();
  };
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };
  const handleBlur = (e) => {
    const newInfo = { ...info };
    newInfo[e.target.name] = e.target.value;
    setInfo(newInfo);
  };

  const handleUpload = (event) => {
    event.preventDefault();
    const category = document.getElementById("category").value;
    const brand = document.getElementById("brand").value;
    const quantity = document.getElementById("quantity").value;
    const formData = new FormData();
    formData.append("product_name", info.productName);
    formData.append("category_id", category);
    formData.append("brand_id", brand);
    formData.append("description", ckData);
    formData.append("price", info.price);
    formData.append("product_quantity", quantity);
    formData.append("image", image);
    console.log(formData);
    fetch("http://127.0.0.1:8000/api/p1/products", {
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
      });
  };

  const handleChange = (e, editor) => {
    const data = editor.getData();
    setCkData(data);
  };

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/c1/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
      });
  }, [categories]);

  const [brands, setBrands] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/b1/brands")
      .then((res) => res.json())
      .then((data) => {
        setBrands(data.data);
      });
  }, [brands]);

  return (
    <div>
      <Sidebar></Sidebar>
      <div className="top-area">
        <h3 className="page-title">Add Product</h3>
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
                name="productName"
                required
              />
            </div>
            <div className="book_half">
              <label className="input-label">Price</label>
              <br />
              <input
                className="input_field half_field"
                onBlur={handleBlur}
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
                    editor={ClassicEditor}
                    onChange={(e, editor) => {
                        handleChange(e, editor);
                    }}
                    ></CKEditor>
                    <br/>
               </div>
          </div>
          <div className="product_section">
            <div className="card_left">
              <label className="input-label">Category Name:</label>
              <br />
              <select
                name="category_id"
                className="input_field dropdown-field"
                id="category"
                required
              >
                {categories.map((ct) => (
                  <option value={ct.id}>{ct.category_name}</option>
                ))}
              </select>
            </div>
            <div className="card_mid">
              <label className="input-label">Brand Name:</label>
              <br />
              <select
                name="brand_id"
                className="input_field dropdown-field"
                id="brand"
                required
              >
                {brands.map((bd) => (
                  <option value={bd.id}>{bd.brand_name}</option>
                ))}
              </select>
            </div>
            <div className="card_right">
              <label className="input-label">Quantity</label>
              <br />
              <input
                className="input_field number_input"
                type="number"
                id="quantity"
                required
                defaultValue="0"
                min="0"
                name="quantity"
              />
            </div>
          </div>
          <div className="image_div">
            <div>
              <label className="input-label">Photo</label>
              {!image && (
                <div className="img-area" onClick={handleImageInput}>
                  <div className="img-items">
                    <img className="img-gallary" src={gallary} alt="gallary" />
                    <p className="img-text">Select picture</p>
                  </div>
                </div>
              )}
              {image && (
                <div className="img-review">
                  <img
                    className="img-div"
                    src={URL.createObjectURL(image)}
                    alt={image.name}
                  />
                  <div className="input-camera" onClick={handleImageInput}>
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

export default AddProduct;
