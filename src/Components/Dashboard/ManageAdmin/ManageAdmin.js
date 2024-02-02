import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../SideBar/Sidebar";
import { useHistory } from "react-router";
import Pagination from "../../Shop/Pagination/Pagination";

const ManageAdmin = () => {
    const userId = sessionStorage.getItem("userId");
    const userEmail = sessionStorage.getItem("userEmail");
    const userName = sessionStorage.getItem("userName");
    const token = sessionStorage.getItem("token");
    const [admins, setAdmins] = useState([]);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        fetch("https://reapi.pabnafoods.com/api/a1/admins", {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setAdmins(data.data);
                setLoad(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [admins]);

    const handleDeleteAdmin = (id, user_id) => {
        if (parseInt(userId) !== user_id) {
            fetch(`https://reapi.pabnafoods.com/api/a1/admins/${id}`, {
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
        } else {
            alert("You can't lose your own admin authority!!");
        }
    };

    const history = useHistory();
    const handleAdd = () => {
        history.push("/makeAdmin");
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    // Get current posts
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = admins.slice(indexOfFirstItem, indexOfLastItem);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const handleIncrement = () => {
        if (currentPage < Math.ceil(admins.length / itemsPerPage)) {
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
                <h3 className="page-title">Manage Admin</h3>
                <p className="user-name">{userName}</p>
            </div>
            <div className="btn-area">
                <button className="add-new-btn" onClick={handleAdd}>
                    add new
                </button>
            </div>
            {!load ? (
                <div>
                    <table className="table-area">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((ad) => (
                                <tr key={ad._id}>
                                    <td data-label="Name">{ad.user.name}</td>
                                    <td data-label="Email">{ad.user.email}</td>

                                    <td data-label="Action">
                                        <p>
                                            <span
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                    handleDeleteAdmin(
                                                        ad.id,
                                                        ad.user.id
                                                    )
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrashAlt}
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
                        totalItems={admins.length}
                        paginate={paginate}
                        pageIncrement={handleIncrement}
                        pageDecrement={handleDecrement}
                    />
                </div>
            ) : (
                <p className="loading">Loading...</p>
            )}
        </div>
    );
};

export default ManageAdmin;
