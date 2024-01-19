import React, { useEffect, useState } from 'react';
import Sidebar from '../SideBar/Sidebar';
import Pagination from '../../Shop/Pagination/Pagination';

const Orders = () => {
    const userId= sessionStorage.getItem('userId');
    const userEmail= sessionStorage.getItem('userEmail');
    const userName= sessionStorage.getItem('userName');
    const token= sessionStorage.getItem('token');
    const [load, setLoad]=useState(true);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/o1/orders/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            
            setOrders(data.data)
            setLoad(false)
        })
    }, [userId])

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    // Get current posts
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem- itemsPerPage;
    const currentItems= orders.slice(indexOfFirstItem, indexOfLastItem);
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const handleIncrement=()=>{
        if(currentPage< Math.ceil(orders.length / itemsPerPage)){
          setCurrentPage(currentPage +1);
        }
    }
    const handleDecrement=()=>{
       if(currentPage >1){
           setCurrentPage(currentPage-1);
       }
    }

    return (
        <div>
            <Sidebar></Sidebar>
            <div className='top-area'>
               <h3 className="page-title">Orders</h3>
                <p className="user-name">{userName}</p>
            </div>  
            {
             !load ? ((orders.length !==0)?<div>
                 <div>
                        <h4 className='user-email'>Email: {userEmail}</h4>
                        <h5 className='user-orders'>You have: {orders.length} orders</h5>
                </div> 
                <table className="table-area">
                    <thead>
                        <tr>
                            <th scope="col">Product Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Address</th>
                            <th scope="col">Date</th>
                            <th scope="col">Cost</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentItems.map(od =>
                            <tr key={od.id}>
                                <td data-label="Product Name">
                                    {
                                        od.products.map(pd=><p>{pd.product_name}</p>)
                                    }
                                </td>
                                <td data-label="Quantity">
                                    {
                                        od.products.map(pt=><p>{pt.pivot.quantity}</p>)
                                    }
                                </td>
                                <td data-label="Address" >{od.address}</td>
                                <td data-label="Date" >{(new Date(od.created_at).toDateString('dd/MM/yyyy'))}</td>
                                <td  data-label="Cost" ><span className="h4">&#x9F3;</span>{od.total}</td>
                                <td data-label="Status"> {od.status}</td>
                            </tr>
                            )
                        }
                    </tbody>
                </table> 
                <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={orders.length}
                        paginate={paginate}
                        pageIncrement={handleIncrement}
                        pageDecrement={handleDecrement}
                    />
              </div>
              :<div className='no_order'>
                        <h4 className='user-email'>Email: {userEmail}</h4>
                        <h3 className='user-orders'>You have No orders</h3>
                </div>)
               :<p className="loading">Loading...</p>
            }
        </div>
    );
};

export default Orders;