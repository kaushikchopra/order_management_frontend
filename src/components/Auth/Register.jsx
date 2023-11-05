import React from "react";
import { Link, useNavigate } from "react-router-dom";
// Axios
import axios from "../../api/axios";
import { UserAPI } from "../../api/global";
// Formik
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();
  const initialValues = {
    fullName: "",
    username: "",
    password: "",
    address: "",
    phoneNumber: "",
  };

  // Input validation
  const validationSchema = Yup.object({
    fullName: Yup.string().min(3).required("Please enter your First Name"),
    username: Yup.string().email().required("Please enter your email"),
    password: Yup.string()
      .min(6, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
        "Please use at least one upper, one lower case characters, one special character and one number"
      )
      .required("Please enter your password"),
    address: Yup.string().required("Please enter your address"),
    phoneNumber: Yup.string(),
  });

  // Handle Signup
  const onSubmit = async (values, action) => {
    try {
      const response = await axios.post(`${UserAPI}/register`, values, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      //   console.log(response);

      if (response && response.data) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }

      // Reset form values after submitting
      action.resetForm();
    } catch (errors) {
      //   console.error(errors);
      if (!errors?.response) {
        // Handle no server error (i.e.) server is not running or responding
        toast.error("No Server Response");
      } else if (errors.response && errors.response.data) {
        // Handle other errors
        toast.error(errors.response.data.error);
      }
    }
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched, isValid } =
    useFormik({
      initialValues,
      validateOnBlur: true,
      validationSchema,
      onSubmit,
    });

  // console.log(errors);

  return (
    <div className="container-fluid bg-dark">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-lg-4 col-sm-6">
          <div className="card shadow">
            <form onSubmit={handleSubmit}>
              <div className="card-header border-0 bg-white d-flex justify-content-between">
                <div className="signup fs-2">Signup</div>
              </div>

              <div className="card-body">
                <div className="mb-1">
                  <label htmlFor="fullName" className="form-label">
                    Full Name
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    autoComplete="off"
                    name="fullName"
                    id="fullName"
                    placeholder="Full Name"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.fullName && errors.fullName ? (
                    <p className="form-error text-danger">{errors.fullName}</p>
                  ) : null}
                </div>

                <div className="mb-1">
                  <label htmlFor="username" className="form-label">
                    Email
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    autoComplete="off"
                    name="username"
                    id="username"
                    placeholder="Email"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.username && touched.username ? (
                    <p className="form-error text-danger">{errors.username}</p>
                  ) : null}
                </div>

                <div className="mb-1">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    autoComplete="off"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password ? (
                    <p className="form-error text-danger">{errors.password}</p>
                  ) : null}
                </div>
                <div className="mb-1">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <textarea
                    className="form-control"
                    type="text"
                    autoComplete="off"
                    name="address"
                    id="address"
                    placeholder="Address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.address && touched.address ? (
                    <p className="form-error text-danger">{errors.address}</p>
                  ) : null}
                </div>
                <div className="mb-1">
                  <label htmlFor="phoneNumber" className="form-label">
                    Mobile
                  </label>
                  <input
                    className="form-control"
                    type="tel"
                    autoComplete="off"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Mobile Number"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.phoneNumber && touched.phoneNumber ? (
                    <p className="form-error text-danger">
                      {errors.phoneNumber}
                    </p>
                  ) : null}
                </div>

                <button type="submit" className="btn btn-primary" disabled={!isValid}>
                  Signup
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
            </form>

            <div className="row justify-content-center">
              <div className="col-8">
                <span style={{ fontSize: "0.8rem" }}>
                  Resend Activation Link?{" "}
                  <Link to="/resend-activation">Click here!</Link>
                </span>
              </div>
              <div className="col-8 mb-3">
                <span style={{ fontSize: "0.8rem" }}>
                  Already a user? <Link to="/login">Login</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
