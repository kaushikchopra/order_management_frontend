import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { cartLength } from "../../../redux/slices/cartSlice";
import { selectAccessToken } from "../../../redux/slices/authSlice";
import { useSendLogoutMutation } from "../../../redux/slices/authApiSlice";
import useAuth from "../../../hooks/useAuth";

import { BsFillCartFill } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { BiUserCircle } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";

const Navbar = () => {
  const cartCount = useSelector(cartLength);
  const navigate = useNavigate();

  const token = useSelector(selectAccessToken);
  const { fullName, isAdmin } = useAuth();
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  if (isLoading) return <p>Logging Out...</p>;

  if (isError) return <p>Error: {error.data?.message}</p>;

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Product Store
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link
                to="/cart"
                className="nav-link d-flex flex-row align-items-center"
              >
                <BsFillCartFill className="mx-1" />
                Cart ({cartCount})
              </Link>
            </li>
            {token ? (
              isAdmin ? (
                <>
                  <li className="nav-item">
                    <button
                      onClick={() => navigate("/dashboard")}
                      className="nav-link btn btn-success d-flex flex-row align-items-center"
                    >
                      <MdDashboard />
                      <span className="mx-1">Dashboard</span>
                    </button>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link d-flex flex-row align-items-center">
                      <BiUserCircle /> <span className="mx-1">{fullName}</span>
                    </span>
                  </li>
                  <li className="nav-item">
                    <button
                      onClick={sendLogout}
                      className="nav-link btn btn-danger d-flex flex-row align-items-center"
                    >
                      <TbLogout /> <span className="mx-1">Logout</span>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <span className="nav-link d-flex flex-row align-items-center">
                      <BiUserCircle /> <span className="mx-1">{fullName}</span>
                    </span>
                  </li>
                  <li className="nav-item">
                    <button
                      onClick={sendLogout}
                      className="nav-link btn btn-danger d-flex flex-row align-items-center"
                    >
                      <TbLogout /> <span className="mx-1">Logout</span>
                    </button>
                  </li>
                </>
              )
            ) : (
              <li className="nav-item">
                <button
                  onClick={handleLoginClick}
                  className="nav-link btn btn-success"
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
