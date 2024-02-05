import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../SideBar/Sidebar";
import Pagination from "../../Shop/Pagination/Pagination";

const ManageOrders = () => {
    const userId = localStorage.getItem("userId");
    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");
    const token = localStorage.getItem("token");
    const [load, setLoad] = useState(true);
    //load all orders
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch("https://reapi.pabnafoods.com/api/o1/orders", {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setOrders(data.data);
                setLoad(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [orders]);

    //handle delete order
    const handleDeleteOrder = (id) => {
        fetch(`https://reapi.pabnafoods.com/api/o1/orders/${id}`, {
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

    //update order status
    const handleStatus = (order, e) => {
        const orderStatus = e.target.value;
        const orderData = {
            user_id: order.user.id,
            total: order.total,
            status: orderStatus,
            payment_id: order.payment_id,
            address: order.address,
        };
        const id = order.id;
        fetch(`https://reapi.pabnafoods.com/api/o1/orders/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(orderData),
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    // Get current posts
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const handleIncrement = () => {
        if (currentPage < Math.ceil(orders.length / itemsPerPage)) {
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
                <h3 className="page-title">Manage Orders</h3>
                <p className="user-name">{userName}</p>
            </div>

            {!load ? (
                orders.length !== 0 ? (
                    <diV>
                        <table className="table-area">
                            <thead>
                                <tr>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Customer Name</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Cost</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((od) => (
                                    <tr key={od.id}>
                                        <td data-label="Product Name">
                                            {od.products.map((pd) => (
                                                <p>{pd.product_name}</p>
                                            ))}
                                        </td>
                                        <td data-label="Quantity">
                                            {od.products.map((pt) => (
                                                <p>{pt.pivot.quantity}</p>
                                            ))}
                                        </td>
                                        <td data-label="Customer Name">
                                            {od.user.name}
                                        </td>
                                        <td data-label="Address">
                                            {od.address}
                                        </td>
                                        <td data-label="Date">
                                            {new Date(
                                                od.created_at
                                            ).toDateString("dd/MM/yyyy")}
                                        </td>
                                        <td data-label="Cost">
                                            <span className="h4">&#x9F3;</span>
                                            {od.total}
                                        </td>

                                        <td data-label="Status">
                                            <select
                                                className="order-status"
                                                name="status"
                                                onChange={(e) =>
                                                    handleStatus(od, e)
                                                }
                                                defaultValue={od.status}
                                            >
                                                <option value="Pending">
                                                    Pending
                                                </option>
                                                <option value="On going">
                                                    On Going
                                                </option>
                                                <option value="Delivered">
                                                    Delivered
                                                </option>
                                            </select>
                                        </td>
                                        <td data-label="Action">
                                            <span
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                    handleDeleteOrder(od.id)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrashAlt}
                                                />
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination
                            itemsPerPage={itemsPerPage}
                            totalItems={orders.length}
                            paginate={paginate}
                            pageIncrement={handleIncrement}
                            pageDecrement={handleDecrement}
                        />
                    </diV>
                ) : (
                    <div className="notify-items">
                        <h1>No order found</h1>
                    </div>
                )
            ) : (
                <p className="loading">Loading...</p>
            )}
        </div>
    );
};

export default ManageOrders;
