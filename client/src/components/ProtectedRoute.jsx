import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios_config/axiosInstance";
import { useDispatch } from "react-redux";
import { onNavbar, offNavbar } from "../redux/navbarSlice";
import { notAdmin } from "../redux/isAdminSlice";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        dispatch(offNavbar());
        // dispatch(onLoader());
        const token = localStorage.getItem("userToken");
        const email = localStorage.getItem("userEmail");

        const response = await axiosInstance.post(`/user/auth`, {
          token,
          email,
        });
        // dispatch(offLoader());
        if (!response.data.status) {
          localStorage.clear();
          dispatch(offNavbar());
          dispatch(notAdmin())
          navigate("/login");
        }
        dispatch(onNavbar());
      } catch (error) {
        console.log(error);
      }
    };
    checkAuth();
  }, []);

  return children;
}

export default ProtectedRoute;
