import React, { useState } from "react";
import { UserAPI } from "../../api/global";
import axios from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  // Get Email ID from the User
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    }
  };

  // On submit send an email for Password reset if a valid Email ID is provided
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${UserAPI}/forgot-password`, {
        email,
      });

      if (response && response.data) {
        toast.success(response.data.message); // Success Message of Password reset email
      }

      setTimeout(() => {
        navigate("/login");
      }, 2000)
    } catch (error) {
      if (error.response && error.response.data.errors) {
        // Handle validation errors
        const validationErrors = error.response.data.errors;

        // display all validation errors to the user
        const errorMessages = validationErrors.map((error) => error.msg);

        toast.error(errorMessages.toString());
      } else {
        // Handle other error scenarios
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <div className="container-fluid bg-dark">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-sm-6 col-lg-4">
          <div className="card">
            <div className="card-header border-0 bg-white fs-2">
              Forgot Password
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email ID
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    className="form-control"
                    aria-describedby="emailId"
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
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
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
