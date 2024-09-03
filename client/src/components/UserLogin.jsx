import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axios_config/axiosInstance";
import { useDispatch } from "react-redux";
import { onNavbar, offNavbar } from "../redux/navbarSlice";
import { isAdmin } from "../redux/isAdminSlice";
import "../styles/login.css";

function UserLogin() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(offNavbar());
  });
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // dispatch(onLoader());
      const response = await axiosInstance.post(`/user/login`, formData);
      // dispatch(offLoader());
      if (!response.data.status) {
        // toast.error(response.data.msg, { duration: 3000 });
        alert(response.data.msg);
        navigate("/login");
      } else {
        localStorage.setItem("userToken", response.data.token);
        localStorage.setItem("userEmail", response.data.emailCheck.email);
        localStorage.setItem("userID", response.data.emailCheck._id);
        response.data.emailCheck.isAdmin
          ? (navigate("/admin"), dispatch(isAdmin()))
          : navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div class="w-100 d-flex" style={{ height: "695px" }}>
        <main class="login-page form-signin w-50 d-flex justify-content-center align-items-center">
          <form
            class="w-50 px-4 py-3 rounded-2 bg-light bg-opacity-50"
            onSubmit={handleSubmit}
          >
            <h1 class="h3 mb-3 fw-normal">Login</h1>

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
              Sign in
            </button>
            <Link class="text-center mt-2" to="/register">
              not registered ?
            </Link>

            <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2024</p>
          </form>
        </main>
        <div class=" w-50 banner"></div>
      </div>
    </>
  );
}

export default UserLogin;
