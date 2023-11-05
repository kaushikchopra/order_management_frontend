import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../../../redux/slices/authApiSlice";
import useAuth from "../../../hooks/useAuth";

import { TbLogout } from "react-icons/tb";
import { AiOutlineHome } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";

const Navbar = () => {
  const navigate = useNavigate();
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  const { fullName } = useAuth();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  const handleHomeClick = () => {
    navigate("/");
  };

  if (isLoading) return <p>Logging Out...</p>;

  if (isError) return <p>Error: {error.data?.message}</p>;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        {/* Sidebar toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          <span
            className="navbar-toggler-icon"
            data-bs-target="#offcanvasExample"
          ></span>
        </button>
        {/* Sidebar toggle button end */}
        <Link className="navbar-brand text-uppercase me-auto mx-2 fs-6" to="#">
          Order Management
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
          <ul className="navbar-nav align-items-center ms-auto">
            <li className="nav-item mx-1 ">
              <button
                className="nav-link btn btn-success d-flex flex-row align-items-center"
                onClick={handleHomeClick}
              >
                <AiOutlineHome /> <span className="mx-1">Home</span>
              </button>
            </li>
            <li className="nav-item">
              <span className="nav-link d-flex flex-row align-items-center">
                <BiUserCircle /> <span className="mx-1">{fullName}</span>
              </span>
            </li>
            <li className="nav-item mx-1 ">
              <button
                className="nav-link btn btn-danger d-flex flex-row align-items-center"
                onClick={sendLogout}
              >
                <TbLogout /> <span className="mx-1">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
