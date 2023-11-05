import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  updateCartItemQuantity,
  productsInCart,
} from "../../../redux/slices/cartSlice";
import {
  selectAccessToken,
  selectUserId,
} from "../../../redux/slices/authSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "../../../api/axios";

const CartPage = () => {
  const userId = useSelector(selectUserId);
  // Redux dispatch and selector
  const cart = useSelector(productsInCart); // Get Cart Products
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();

  // useStates
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("Credit Card");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const breakPoint = 980;
  // Handling window resize event to adjust the styling of Total Amount and Product details
  useEffect(() => {
    const handleWindowResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  // Handling the payment method
  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  // Calculating the total bill amount
  const totalAmount = cart.reduce(
    (total, item) => total + (item.totalPrice || item.price),
    0
  );

  // Calculating the total amount of each product
  const handleQuantityChange = (productId, newQuantity) => {
    // Calculate the new total price based on the new quantity
    const item = cart.find((product) => product._id === productId);
    const newTotalPrice = item.price * newQuantity;

    // Dispatch the action to update the cart item quantity and total price
    dispatch(updateCartItemQuantity({ productId, newQuantity, newTotalPrice }));
  };

  // Handling the order placement
  const handlePlaceOrder = async () => {
    const orderData = {
      user: userId,
      products: cart.map((product) => product._id),
      quantities: cart.map((product) => product.quantity),
      totalAmount,
      billingInformation: selectedPaymentMethod,
    };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      };
      const response = await axios.post("/api/orders", orderData, config);

      if (response.status === 201) {
        // console.log("Order places successfully");
        toast("Order placed successfully");

        localStorage.removeItem("cart");

        setTimeout(() => (window.location.href = "/"), 2000);
      } else {
        // console.error("Failed to place the order");
        toast("Failed to place the order");

        localStorage.removeItem("cart");
      }
    } catch (error) {
      console.error("Error while placing the order:", error);

      localStorage.removeItem("cart");
    }
  };

  const handleRemoveItem = (productId) => {
    // Dispatch the removeItem action to remove the item from the cart
    dispatch(removeItem({ id: productId }));
  };

  return (
    <>
      <main className="container p-4">
        <h1 className="display-6 mb-4">Shopping Cart</h1>
        {cart.length > 0 ? (
          <>
            {/* Cart Items */}
            <div className="bg-white p-4 shadow rounded mb-5">
              {cart.map((product, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between align-items-center mb-4"
                >
                  <div className="d-flex flex-column flex-lg-row">
                    <div className="text-center text-lg-start">
                      <img
                        src={product.image}
                        alt={product.name}
                        className={
                          screenWidth > 1024
                            ? "float-start ms-auto object-fit-scale"
                            : "float-start mr-5 object-fit-scale"
                        }
                        style={{ width: "200px", height: "200px" }}
                      />
                    </div>
                    <div
                      className="flex-grow-1"
                      style={screenWidth > 1024 ? { width: "820px" } : {}}
                    >
                      <h3 className="fw-light">{product.name}</h3>
                      <p className="text-muted">Price: ₹{product.price}</p>
                      <p className="text-muted">
                        Description: {product.description}
                      </p>
                      <p className="text-muted">
                        Manufacturer: {product.manufacturer}
                      </p>
                      <p className="text-muted">Category: {product.category}</p>
                      <div className="form-group">
                        <label className="text-muted">Quantity:</label>
                        <select
                          className="form-control mt-2 w-25"
                          value={product.quantity}
                          onChange={(e) => {
                            handleQuantityChange(
                              product._id,
                              parseInt(e.target.value)
                            );
                          }}
                        >
                          {[1, 2, 3, 4, 5].map((quantity) => (
                            <option key={quantity} value={quantity}>
                              {quantity}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(product._id)}
                        className="btn btn-danger mt-3"
                      >
                        Remove
                      </button>
                      {screenWidth < breakPoint ? (
                        <p className="text-muted mt-3">
                          Total Amount: ₹
                          {!product.totalPrice
                            ? product.price
                            : product.totalPrice}
                        </p>
                      ) : null}
                    </div>
                    {screenWidth > breakPoint ? (
                      <div className="ms-5">
                        <p className="text-muted">
                          Total Amount: ₹
                          {!product.totalPrice
                            ? product.price
                            : product.totalPrice}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Section */}
            <div className="bg-white p-4 shadow rounded mb-5">
              <h4 className="mb-4">Payment</h4>
              <div className="d-flex align-items-center mb-4">
                <label className="me-2">Select Payment Method:</label>
                <select
                  className="form-control"
                  value={selectedPaymentMethod}
                  onChange={handlePaymentMethodChange}
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Net Banking">Net Banking</option>
                  <option value="UPI">UPI</option>
                  <option value="Pay on Delivery">Pay on Delivery</option>
                </select>
              </div>
              <div>
                <p className="mb-0 text-muted">Shipment: Free</p>
                <p>Total Amount to Pay: ₹{totalAmount}</p>
              </div>
              {/* Buy Now Button */}
              <div>
                <button className="btn btn-primary" onClick={handlePlaceOrder}>
                  Buy Now
                </button>
                <ToastContainer
                  position="top-right"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
              </div>
            </div>
          </>
        ) : (
          <div
            className="alert alert-info"
            role="alert"
            style={{ height: "90vh" }}
          >
            Cart is empty.
          </div>
        )}
      </main>
    </>
  );
};

export default CartPage;
