import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axios_config/axiosInstance";
import "../styles/Admin.css";

function Admin() {
  const [users, setUsers] = useState()
  const [products, setProducts] = useState()
  const [bookings, setBookings] = useState()
  
 const allDetails = async() => {
    try {
      const response = await axiosInstance.get("/admin/get-count")
      const users = response.data.users
      const products = response.data.products
      const bookings = response.data.bookings
      setUsers(users)
      setProducts(products)
      setBookings(bookings)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    allDetails()
  },[])
  return (
    <>

      <div className="admin-page-cards mt-5">
        <div className="card admin-card users-card">
          <h4>Users</h4>
          <p> {users?.length} </p>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/all-users")}
          >
            View all
          </button>
        </div>

        <div className="card admin-card transactions-card">
          <h4>Bookings</h4>
          <p> {bookings?.length} </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/all-bookings")}
          >
            View all
          </button>
        </div>

        <div className="card admin-card deposits-card">
          <h4>Products</h4>
          <p> {products?.length} </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/all-flights")}
          >
            View all
          </button>
        </div>
        <Link to={"/addProducts"} class="text-decoration-none">
          <div className="card admin-card users-card">
            <h4>Add Product</h4>
            
          </div>
        </Link>
      </div>
    </>
  );
}

export default Admin;
