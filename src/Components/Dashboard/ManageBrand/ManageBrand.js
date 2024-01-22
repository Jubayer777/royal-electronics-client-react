import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../SideBar/Sidebar";
import { useHistory } from "react-router";
import Pagination from "../../Shop/Pagination/Pagination";

const ManageBrand = () => {
    const userName = sessionStorage.getItem("userName");
    const token = sessionStorage.getItem("token");
    const [load, setLoad] = useState(true);

    //load all brands
    const [brands, setBrands] = useState([]);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/b1/brands")
            .then((res) => res.json())
            .then((data) => {
                setBrands(data.data);
                setLoad(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [brands]);

    //delete brand
    const handleDeleteBrand = (id) => {
        fetch(`http://127.0.0.1:8000/api/b1/brands/${id}`, {
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

    //redirect to edit brand page
    const history1 = useHistory();
    const handleEditBrand = (id) => {
        history1.push(`/editBrand/${id}`);
    };

    //redirect to add brand page
    const history2 = useHistory();
    const handleAdd = () => {
        history2.push("/addBrand");
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    // Get current posts
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = brands.slice(indexOfFirstItem, indexOfLastItem);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const handleIncrement = () => {
        if (currentPage < Math.ceil(brands.length / itemsPerPage)) {
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
                <h3 className="page-title">Manage Brand</h3>
                <p className="user-name">{userName}</p>
            </div>
            <div className="btn-area">
                <button className="add-new-btn" onClick={handleAdd}>
                    add new
                </button>
            </div>
            {!load ? (
                brands.length !== 0 ? (
                    <div>
                        <table className="table-area">
                            <thead>
                                <tr>
                                    <th scope="col">Brand Name</th>
                                    <th scope="col">
                                        No Of Products Available
                                    </th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((bd) => (
                                    <tr key={bd.id}>
                                        <td data-label="Brand Name">
                                            {bd.brand_name}
                                        </td>
                                        <td data-label="No Of Products Available">
                                            {bd.product.length}
                                        </td>
                                        <td data-label="Action">
                                            <p>
                                                <span
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() =>
                                                        handleDeleteBrand(bd.id)
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
                                                        handleEditBrand(bd.id)
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
                            totalItems={brands.length}
                            paginate={paginate}
                            pageIncrement={handleIncrement}
                            pageDecrement={handleDecrement}
                        />
                    </div>
                ) : (
                    <div className="notify-items">
                        <h1>There is no brands available</h1>
                    </div>
                )
            ) : (
                <p className="loading">Loading...</p>
            )}
        </div>
    );
};

export default ManageBrand;
