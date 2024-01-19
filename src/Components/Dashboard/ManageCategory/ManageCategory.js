import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../SideBar/Sidebar';
import { useHistory } from 'react-router';
import Pagination from '../../Shop/Pagination/Pagination';

const ManageCategory = () => {
    const userName= sessionStorage.getItem('userName');
    const token= sessionStorage.getItem('token');
    const [load, setLoad]=useState(true);
    //load all categories
    const [categories, setCategories]=useState([]);
    useEffect(()=>{
        fetch('http://127.0.0.1:8000/api/c1/categories')
        .then(res=>res.json())
        .then(data=>{
            // console.log(data.data);
            setCategories(data.data);
            setLoad(false)
        })

    },[categories]);
    
    //delete category
    const handleDeleteCategory = id => {
        fetch(`http://127.0.0.1:8000/api/c1/categories/${id}`, {
            method: 'DELETE',
            headers:{
                'content-type':'application/json',
                authorization: `Bearer ${token}`
            },
        })
        .then(res => res.json())
        .then(data=>{
            alert(data.message);
          })
    }

    //redirect to edit category page
    const history1=useHistory();
    const handleEditCategory=id=>{
        history1.push(`/editCategory/${id}`)
    }
  

  //redirect to add category page
    const history2 = useHistory();
    const handleAdd=()=>{
        history2.push("/addCategory");
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    // Get current posts
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem- itemsPerPage;
    const currentItems= categories.slice(indexOfFirstItem, indexOfLastItem);
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const handleIncrement=()=>{
        if(currentPage< Math.ceil(categories.length / itemsPerPage)){
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
               <h3 className="page-title">Manage Category</h3>
                <p className="user-name">{userName}</p>
            </div>  
            <div className="btn-area">
               <button className="add-new-btn" onClick={handleAdd}>add new</button>
            </div>
                {
                   !load ? ( (categories.length !==0)? <div>
                        <table className="table-area">
                            <thead>
                                <tr>
                                    <th scope="col">Category Name</th>
                                    <th scope="col">No Of Products Available</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {
                                        currentItems.map(ct=>
                                            <tr key={ct.id}>
                                                <td data-label="Category Name">{ct.category_name}</td>
                                                <td data-label="No Of Products Available" >{ct.product.length}</td>
                                                <td data-label="Action"><p ><span style={{ cursor: 'pointer' }} onClick={() => handleDeleteCategory( ct.id)}><FontAwesomeIcon icon={faTrashAlt} /></span>   <span style={{ cursor: 'pointer' }} onClick={() => handleEditCategory( ct.id)}><FontAwesomeIcon icon={faEdit} /></span></p></td>
                                            </tr>
                                        )
                                    }
                            </tbody>
                        </table>
                        <Pagination
                                itemsPerPage={itemsPerPage}
                                totalItems={categories.length}
                                paginate={paginate}
                                pageIncrement={handleIncrement}
                                pageDecrement={handleDecrement}
                            /> 
                    </div>
                    :<div className="notify-items">        
                            <h1>There is no category available</h1>
                    </div>)
                    :<p className="loading">Loading...</p>
                }  
       </div>
        
    );
};

export default ManageCategory;