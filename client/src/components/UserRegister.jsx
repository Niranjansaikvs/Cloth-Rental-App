import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axios_config/axiosInstance";
import { useDispatch } from "react-redux";
import {onNavbar, offNavbar} from '../redux/navbarSlice'


function UserRegister() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(offNavbar())
  })

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    //   dispatch(onLoader());
      const response = await axiosInstance.post(`/user/register`, formData);
    //   dispatch(offLoader());
      if (!response.data.status) {
        alert(response.data.msg);
        navigate("/register");
      } else {
        console.log(response.data)
        alert(response.data.msg);
        localStorage.setItem("userToken", response.data.token);
        localStorage.setItem("userEmail", response.data.newUser.email);
        localStorage.setItem("userID", response.data.newUser._id);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div class=" w-100 d-flex" style={{ height: "695px" }}>
        <main class=" login-page form-signin w-50 d-flex justify-content-center align-items-center">
          <form class="w-50 bg-light-subtle bg-opacity-75 px-4 py-3 rounded-2" onSubmit={handleSubmit}>
            <h1 class="h3 mb-3 fw-normal">Register</h1>
            <div class="form-floating mb-3">
              <input
                type="userName"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                name="userName"
                onChange={handleChange}
              />
              <label for="floatingInput">Username</label>
            </div>

            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                name="email"
                onChange={handleChange}
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="password"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
              <label for="floatingPassword">Password</label>
            </div>
            <button class="btn btn-primary w-100 py-2" type="submit">
              Sign Up
            </button>
            <Link to="/login">Already Registered?</Link>
            <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2024</p>
          </form>
        </main>
        <div class=" w-50 banner">
        </div>
      </div>
    </>
  );
}

export default UserRegister;
