import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "../../redux/slices/authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../redux/slices/authSlice";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectAccessToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        // console.log("verifying refresh token");
        try {
          //   const response =
          await refresh();
          //   const { accessToken } = response.data;
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  let content;
  if (!persist) {
    // persist: no
    // console.log("no persist");
    content = <Outlet />;
  } else if (isLoading) {
    //persist: yes, token: no
    // console.log("loading");
    content = <p>Loading...</p>;
  } else if (isError) {
    //persist: yes, token: no
    // console.log("error");
    content = (
      <div className="container-fluid d-flex justify-content-center align-items-center bg-dark vh-100">
        <div className="alert alert-light text-center col-sm-6">
          <p className="mb-0">
            {error.data?.message}
            <Link to="/login" className="btn btn-danger">
              Please login again
            </Link>
          </p>
          <p className="mt-2">to get back to the page</p>
        </div>
      </div>
    );
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    // console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    // console.log("token and uninit");
    // console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};
export default PersistLogin;
