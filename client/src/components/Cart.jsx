import React, { useEffect, useState } from "react";
import axiosInstance from "../axios_config/axiosInstance";

function Cart() {
  const [products, setProducts] = useState();
  const [cartTotal, setCartTotal] = useState(0);
  const userID = localStorage.getItem("userID");

  const handleRemoveItem = async (id) => {
    try {
      const response = await axiosInstance.post("/user/delete-cart", {
        userID,
        productID: id,
      });
      alert(response.data.msg);
      window.location.assign("/cart");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await axiosInstance.get(`/user/get-cart/${userID}`);
      const product = response.data.cartProducts;
      const total = response.data.cartTotal;
      setProducts(product);
      setCartTotal(total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);
  console.log(cartTotal);

  return (
    <div className="bg-white">
      <div className="container py-5">
        <h2 className="text-center mb-4">Cart</h2>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
          {products?.map((product) => (
            <div key={product._id} className="col text-center">
              <div className="card h-100">
                <img
                  src={`http://localhost:8001/${product.image}`}
                  alt={product.productName}
                  style={{ height: "350px" }}
                  className="card-img-top"
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title underline fw-bold text-primary ">
                    {product.productName}
                  </h5>
                  <p className="card-text text-muted">{product.color}</p>
                  <div className="mt-auto d-flex justify-content-around px-0 py-0">
                    <p className="card-text fw-bold">{product.price}</p>
                    <p className="card-text fw-bold">{product.category}</p>
                    <p className="card-text fw-bold">{product.size}</p>
                  </div>
                  <div className="mt-auto d-flex justify-content-around">
                    <p className="card-text ">Price</p>
                    <p className="card-text ">Category</p>
                    <p className="card-text ">Size</p>
                  </div>
                  <div className="mt-auto d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        handleRemoveItem(product._id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div class="d-flex w-100 justify-content-center mt-5">
          <h3 className="text-center mt-auto mb-auto mx-3">Total : {cartTotal}</h3>
          <button type="button" className="btn btn-primary">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
