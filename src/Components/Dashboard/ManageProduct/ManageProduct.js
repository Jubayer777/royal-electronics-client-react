import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import "./ManageProduct.css";
import Sidebar from "../SideBar/Sidebar";
import { useHistory } from "react-router";
import Pagination from "../../Shop/Pagination/Pagination";

const ManageProduct = () => {
    const userName = localStorage.getItem("userName");
    const token = localStorage.getItem("token");
    const [load, setLoad] = useState(true);
    // load all products
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch("https://reapi.pabnafoods.com/api/p1/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.data);
                setLoad(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [products]);

    // delete product
    const handleDeleteProduct = (id) => {
        fetch(`https://reapi.pabnafoods.com/api/p1/products/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //redirect to edit product page
    const history1 = useHistory();
    const handleEditProduct = (id) => {
        history1.push(`/editProduct/${id}`);
    };

    //redirect to add product page
    const history2 = useHistory();
    const handleAdd = () => {
        history2.push("/addProduct");
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    // Get current posts
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const handleIncrement = () => {
        if (currentPage < Math.ceil(products.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };
    const handleDecrement = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <Sidebar></Sidebar>
            <div className="top-area">
                <h3 className="page-title">Manage Product</h3>
                <p className="user-name">{userName}</p>
            </div>
            <div className="btn-area">
                <button className="add-new-btn" onClick={handleAdd}>
                    add new
                </button>
            </div>
            {!load ? (
                products.length !== 0 ? (
                    <div>
                        <table className="table-area">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Brand</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((pd) => (
                                    <tr key={pd.id}>
                                        <td data-label="Name">
                                            {pd.product_name}
                                        </td>
                                        <td data-label="Category">
                                            {pd.category.category_name}
                                        </td>
                                        <td data-label="Brand">
                                            {pd.brand.brand_name}
                                        </td>
                                        <td data-label="Quantity">
                                            {pd.product_quantity}
                                        </td>
                                        <td data-label="Price">
                                            &#x9F3;{pd.price}
                                        </td>
                                        <td data-label="Image">
                                            <img
                                                className="table-img"
                                                src={`https://reapi.pabnafoods.com/upload/${pd.image}`}
                                                alt={pd.image}
                                            />
                                        </td>
                                        <td data-label="Action">
                                            <p>
                                                <span
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() =>
                                                        handleDeleteProduct(
                                                            pd.id
                                                        )
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faTrashAlt}
                                                    />
                                                </span>{" "}
                                                <span
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() =>
                                                        handleEditProduct(pd.id)
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faEdit}
                                                    />
                                                </span>
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination
                            itemsPerPage={itemsPerPage}
                            totalItems={products.length}
                            paginate={paginate}
                            pageIncrement={handleIncrement}
                            pageDecrement={handleDecrement}
                        />
                    </div>
                ) : (
                    <div className="notify-items">
                        <h1>There is no products available</h1>
                    </div>
                )
            ) : (
                <p className="loading">Loading...</p>
            )}
        </div>
    );
};

export default ManageProduct;
