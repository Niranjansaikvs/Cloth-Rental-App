import React, { useState } from "react";
import axiosInstance from "../axios_config/axiosInstance";

function AddProducts() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/admin/add-product", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.status) {
        alert("Image uploaded");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5 mb-3 w-50 d-flex justify-content-center">
      <form className="w-75 px-4 py-3" onSubmit={handleSubmit} >
        <h1 className="h3 mb-3 fw-normal w-100 text-center">Add Product</h1>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Product Name"
            name="productName"
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Product Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Category"
            name="category"
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Category</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Color"
            name="color"
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Color</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Size"
            name="size"
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Size</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="floatingInput"
            placeholder="Price"
            name="price"
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Price</label>
        </div>
        <div className="">
          <label htmlFor="formFile" className="form-label">
            Image
          </label>
          <input
            className="form-control"k
            type="file"
            accept=".jpg, .jpeg"
            id="formFile"
            name="image"
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">
          ADD
        </button>
      </form>
    </div>
  );
}

export default AddProducts;

