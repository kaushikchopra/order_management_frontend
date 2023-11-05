import { Link, useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/slices/authSlice";
import { useLoginMutation } from "../../redux/slices/authApiSlice";
import usePersist from "../../hooks/usePersist";

import { ProgressBar } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const [persist, setPersist] = usePersist();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please enter an email"),
      password: Yup.string().required("Please enter a password"),
    }),
    validateOnBlur: true,
    onSubmit: async (values) => {
      const { username, password } = values;
      try {
        const response = await login({ username, password }).unwrap();

        // Access the data
        const { userId, accessToken } = response;

        dispatch(setCredentials({ userId, accessToken }));
        toast.success("Login successful");

        navigate("/");
      } catch (errors) {
        // console.log(errors)
        toast.error(errors.data.error);
      }
    },
  });

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    formik;

  const handleToggle = () => setPersist((prev) => !prev);

  if (isLoading) {
    return (
      <div className="container bg-light border border-dark rounded w-25 mt-5">
        <div className="d-flex flex-column align-items-center text-center">
          <span className="text-dark fs-4">Loading is in progress...</span>
          <ProgressBar
            width={100}
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="#777A7D"
            barColor="#167347"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid bg-dark">
      <div className="row justify-content-center align-items-center vh-100 ">
        <div className="col-sm-6 col-lg-4">
          <div className="card">
            <div className="card-header border-0 bg-white fs-2">Login</div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Email ID
                  </label>
                  <input
                    type="email"
                    name="username"
                    id="username"
                    value={values.username}
                    className="form-control"
                    aria-describedby="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.username && errors.username ? (
                    <p className="form-error text-danger">{errors.username}</p>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={values.password}
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.password && errors.password ? (
                    <p className="form-error text-danger">{errors.password}</p>
                  ) : null}
                </div>

                <button type="submit" className="btn btn-primary">
                  Login
                </button>
                <ToastContainer
                  position="top-right"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop
                  rtl={false}
                  draggable
                  pauseOnHover
                />
              </form>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="persist"
                  className="form-check-input"
                    onChange={handleToggle}
                    checked={persist}
                />
                <label htmlFor="persist" className="form-check-label">
                  {" "}
                  Trust this device
                </label>
              </div>
              <div className="row justify-content-center">
                <div className="col-auto">
                  <span>
                    Forgot Password?{" "}
                    <Link to="/forgot-password">Click here!</Link>
                  </span>
                </div>
                <div className="col-auto">
                  <span>
                    Not a User already? <Link to="/register">Signup</Link>
                  </span>
                </div>
              </div>
            </div>

            <div className="card-footer text-center">
              <Link to="/" className="btn btn-dark">
                Go back home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
