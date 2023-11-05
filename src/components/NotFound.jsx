import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="container text-center mt-5">
      <img
        src="https://media.tenor.com/vYTwUEafhogAAAAC/404.gif"
        alt="Page Not Found"
        className="img-fluid"
      />
      <h1 className="mt-4">404 - Page Not Found</h1>
      <p className="lead">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <div className="d-flex flex-row justify-content-center align-items-center">
        <button onClick={goHome} className="btn btn-primary mt-3">
          Go back to Home
        </button>
        <span className="fw-bold px-3 mt-3">Or</span>
        <button onClick={goBack} className="btn btn-primary mt-3">
          Go back to previous page
        </button>
      </div>
    </div>
  );
};

export default NotFound;
