import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Sidebar from '../SideBar/Sidebar';

const AddBrand = () => {
    const userName= sessionStorage.getItem('userName');
    const token= sessionStorage.getItem('token');
    const history = useHistory();
    const [info, setInfo]=useState({});
    const handleBlur=e=>{
        const newInfo = {...info};
        newInfo[e.target.name]=e.target.value;
        setInfo(newInfo);
    }

    const handleUpload= event=> {
        event.preventDefault();
        const brandData={
            brand_name:info.brand_name
        }
        fetch('http://127.0.0.1:8000/api/b1/brands',{
        
            method: "POST",
            headers:{
                'content-type':'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(brandData)
        })
        .then(res => res.json())
        .then(data => {
             alert(data.message)
             history.push("/manageBrand");
        })
    }

    return (
        <div>
            <Sidebar></Sidebar>
            <div className='top-area'>
               <h3 className="page-title">Add Brand</h3>
                <p className="user-name">{userName}</p>
            </div>
            <div className='add_container'>
                <div className="">
                    <form onSubmit={handleUpload}>
                        <label className="input-label">Brand Name</label>
                        <br />
                        <input className="input_field double_field" onBlur={handleBlur} placeholder='Enter Brand Name' name="brand_name"  required />
                        <br />
                        <button type="submit" className="submit-btn">Submit</button>
                    </form>
                </div>              
            </div>
        </div>
    );
};

export default AddBrand;