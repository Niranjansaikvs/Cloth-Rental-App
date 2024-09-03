import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/1234.png";
import "../styles/navbar.css";
import { CiSearch, CiLogout } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import { offNavbar } from "../redux/navbarSlice";
import { isAdmin, notAdmin } from "../redux/isAdminSlice";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navbar = useSelector((state) => state.navbar.value);
  const admin = useSelector((state) => state.isAdmin.value);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(offNavbar());
    dispatch(notAdmin());
    navigate("/login");
  };

  return (
    <>
      {navbar ? (
        admin ? (
          <>
            <div className="overlay"></div>

            <nav
              class="navbar main-menu mb-0 py-2 px-4"
              style={{ backgroundColor: "#e3f2fd" }}
            >
              <Link className="navbar-brand" to={"/admin"}>
                <img src={logo} style={{ height: "50px", width: "50px" }} />
              </Link>
              <ul className="navbar-nav">
                <li className="nav-item ml-md-3 my-auto">
                  <a
                    className="btn btn-primary px-3 py-2"
                    href="#"
                    onClick={handleLogout}
                  >
                    <CiLogout className="me-2" />
                    Log Out
                  </a>
                </li>
              </ul>
            </nav>
          </>
        ) : (
          <>
            <div className="overlay"></div>

            <div className="utility-nav d-none d-md-block">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <p className="small">
                      <i className="bx bx-envelope"></i> logo@example.com
                      <i className="bx bx-phone"></i> +91-9876543210
                    </p>
                  </div>

                  <div className="col-12 col-md-6 text-right">
                    <p className="small">
                      Free shipping on total of $99 of all products
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <nav
              className="navbar navbar-expand-md navbar-light bg-light main-menu mb-0 py-0"
              style={{ boxShadow: "none" }}
            >
              <div className="container">
                <button
                  type="button"
                  id="sidebarCollapse"
                  className="btn btn-link d-block d-md-none"
                >
                  <i className="bx bx-menu icon-single"></i>
                </button>
                <Link className="navbar-brand" to="/">
                  <img src={logo} style={{ height: "80px", width: "80px" }} />
                </Link>

                <ul className="navbar-nav ml-auto d-block d-md-none">
                  <li className="nav-item">
                    <a className="btn btn-link" href="#">
                      <span className="badge badge-danger">3</span>
                    </a>
                  </li>
                </ul>

                <div className="collapse navbar-collapse ">
                  <form className="form-inline my-2 my-lg-0 mx-auto d-inline-flex">
                    <input
                      className="form-control"
                      type="search"
                      placeholder="Search for products..."
                      aria-label="Search"
                    />

                    <button
                      className="btn btn-success my-2 my-sm-0"
                      type="submit"
                    >
                      <CiSearch />
                    </button>
                  </form>

                  <ul className="navbar-nav">
                    <Dropdown>
                      <Dropdown.Toggle
                        as="div"
                        id="dropdown-basic-button"
                        className="custom-dropdown mt-3"
                        style={{ color: "white" }}
                      >
                        <CgProfile size={24} color="black" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Orders</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Profile</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    <Link to={"/cart"}>
                      <li
                        className="nav-item me-2"
                        onClick={() => handleButtonClick("")}
                      >
                        <a className="btn d-inline-flex" href="#">
                          <FaCartShopping
                            className="my-auto"
                            style={{ fontSize: "25px" }}
                          />
                          <p
                            className="text-white px-2 py-1 mb-4  bg-danger"
                            style={{ fontSize: "11px", borderRadius: "25px" }}
                          >
                            <strong>3</strong>
                          </p>
                        </a>
                      </li>
                    </Link>
                    <li className="nav-item ml-md-3 my-auto">
                      <a
                        className="btn btn-primary px-3 py-2"
                        href="#"
                        onClick={handleLogout}
                      >
                        <CiLogout className="me-2" />
                        Log Out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </>
        )
      ) : (
        ""
      )}
    </>
  );
}

export default Navbar;
