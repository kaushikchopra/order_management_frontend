import axios from "../../api/axios";
import React, { useState } from "react";
import { UserAPI } from "../../api/global";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { token } = useParams();

  // Set new password to the User
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "new-password") {
      setNewPassword(value);
    } else if (name === "confirm-password") {
      setConfirmPassword(value);
    }
  };

  //
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${UserAPI}/reset-password/${token}`, {
        newPassword,
        confirmPassword,
      });

      // console.log(response.data);
      toast.success(response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        // Handle validation errors
        const validationErrors = error.response.data.errors;

        // display all validation errors to the user
        const errorMessages = validationErrors.map((error) => error.msg);

        toast.error(errorMessages.join("\n"));
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
              Reset Password
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="new-password" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="new-password"
                    id="new-password"
                    className="form-control"
                    value={newPassword}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirm-password" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="btn btn-primary"
                >
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

export default ResetPassword;
