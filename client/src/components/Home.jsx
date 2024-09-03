// import React, { useEffect, useState } from "react";
// import axiosInstance from "../axios_config/axiosInstance";

// function Home() {
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const userID = localStorage.getItem("userID");

//   const handleAddToCart = async (id) => {
//     try {
//       const response = await axiosInstance.post("/user/add-cart", {
//         productID: id,
//         userID,
//       });
//       alert(response.data.msg);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const response = await axiosInstance.get("/user/get-products");
//       const finalProduct = response?.data?.products;
//       setProducts(finalProduct);
//       console.log(finalProduct);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//   };

//   const filteredProducts = selectedCategory === "all"
//     ? products
//     : products.filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase());

//   return (
//     <div className="bg-white">
//       <div>
//         <p onClick={() => handleCategoryClick("men")}>men</p>
//         <p onClick={() => handleCategoryClick("women")}>women</p>
//         <p onClick={() => handleCategoryClick("kids")}>kids</p>
//         <p onClick={() => handleCategoryClick("all")}>all</p>
//       </div>
//       <div className="container py-5">

//         <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
//           {filteredProducts.map((product) => (
//             <div key={product?._id} className="col text-center">
//               <div className="card h-100">
//                 <img
//                   src={`http://localhost:8001/${product?.image}`}
//                   alt={product?.productName}
//                   style={{ height: "350px" }}
//                   className="card-img-top"
//                 />
//                 <div className="card-body d-flex flex-column">
//                   <h5 className="card-title underline fw-bold text-primary ">
//                     {product?.productName}
//                   </h5>
//                   <p className="card-text text-muted">{product?.color}</p>
//                   <div className="mt-auto d-flex justify-content-around px-0 py-0">
//                     <p className="card-text fw-bold">{product?.price}</p>
//                     <p className="card-text fw-bold">{product?.category}</p>
//                     <p className="card-text fw-bold">{product?.size}</p>
//                   </div>
//                   <div className="mt-auto d-flex justify-content-around">
//                     <p className="card-text ">Price</p>
//                     <p className="card-text ">Category</p>
//                     <p className="card-text ">Size</p>
//                   </div>
//                   <div className="mt-auto d-flex justify-content-center">
//                     <button
//                       type="button"
//                       className="btn btn-primary"
//                       onClick={() => handleAddToCart(product._id)}
//                     >
//                       Add To Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;

import React, { useEffect, useState } from "react";
import axiosInstance from "../axios_config/axiosInstance";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/navbar.css"

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const userID = localStorage.getItem("userID");

  const handleAddToCart = async (id) => {
    try {
      const response = await axiosInstance.post("/user/add-cart", {
        productID: id,
        userID,
      });
      alert(response.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/user/get-products");
      const finalProduct = response?.data?.products;
      setProducts(finalProduct);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setActiveButton(category);

  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (product) =>
            product.category.toLowerCase() === selectedCategory.toLowerCase()
        );


  return (
    <div className="bg-white">
      <div className="container py-3">
        <nav className="navbar navbar-expand-md navbar-light sub-menu mt-0 mb-5">
          <div className="container">
            <div className="collapse navbar-collapse" id="navbar">
              <ul className="navbar-nav mx-auto">
                <li
                  className={`nav-item ${
                    selectedCategory === "all" ? "active" : ""
                  }`}
                >
                  <a
                    className="nav-link"
                    href="#"
                    onClick={() =>handleCategoryClick("all")}
                  >
                    All
                  </a>
                </li>

                <li
                  className={`nav-item ${
                    selectedCategory === "MEN" ? "active" : ""
                  }`}
                >
                  <a
                    className="nav-link"
                    href="#"
                    onClick={() => handleCategoryClick("MEN")}
                  >
                    MENS
                  </a>
                </li>
                <li
                  className={`nav-item ${
                    selectedCategory === "WOMEN" ? "active" : ""
                  }`}
                >
                  <a
                    className="nav-link"
                    href="#"
                    onClick={() => handleCategoryClick("WOMEN")}
                  >
                    WOMENS
                  </a>
                </li>
                <li
                  className={`nav-item ${
                    selectedCategory === "KID" ? "active" : ""
                  }`}
                >
                  <a
                    className="nav-link"
                    href="#"
                    onClick={() => handleCategoryClick("KID")}
                  >
                    KIDS
                  </a>
                </li>
                <li
                  className={`nav-item ${
                    selectedCategory === "Contact" ? "active" : ""
                  }`}
                >
                  <a
                    className="nav-link"
                    href="#"
                    onClick={() => handleCategoryClick("Contact")}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 mb-4">
          {filteredProducts.map((product) => (
            <div key={product?._id} className="col text-center">
              <div className="card h-100">
                <img
                  src={`http://localhost:8001/${product?.image}`}
                  alt={product?.productName}
                  style={{ height: "350px" }}
                  className="card-img-top"
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title underline fw-bold text-primary ">
                    {product?.productName}
                  </h5>
                  <p className="card-text text-muted">{product?.color}</p>
                  <div className="mt-auto d-flex justify-content-around px-0 py-0">
                    <p className="card-text fw-bold">{product?.price}</p>
                    <p className="card-text fw-bold">{product?.category}</p>
                    <p className="card-text fw-bold">{product?.size}</p>
                  </div>
                  <div className="mt-auto d-flex justify-content-around">
                    <p className="card-text ">Price</p>
                    <p className="card-text ">Category</p>
                    <p className="card-text ">Size</p>
                  </div>
                  <div className="mt-auto d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(product._id)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
