import React, { useEffect } from "react";
import BarChart from "../charts/BarChart";
import PieChart from "../charts/PieChart";
import LineChart from "../charts/LineChart";
import { fetchOrders } from "../../../redux/slices/orderSlice";
import { useSelector, useDispatch } from "react-redux";
import { Hourglass } from "react-loader-spinner";
import { selectAccessToken } from "../../../redux/slices/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const { data, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (loading === "idle") {
      dispatch(fetchOrders(accessToken));
    } // eslint-disable-next-line
  }, [loading, dispatch]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 fw-bold text-center fs-3 mb-3">Dashboard</div>
      </div>
      <div className="row">
        <div className="col-md-12 text-center mb-3">
          <span className="bg-success fs-5 fw-semibold text-light rounded p-2">
            Sales Charts
          </span>
        </div>

        <div className="col-md-8 mb-3 h-100">
          <div className="card">
            <div className="card-header border-0 bg-dark text-center text-info fw-semibold">
              Sales and Revenue Trend
            </div>
            <div className="card-body">
              {loading === "loading" ? (
                <div className="text-center mt-5">
                  <Hourglass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={["#306cce", "#72a1ed"]}
                  />{" "}
                  Loading...
                </div>
              ) : loading === "failed" ? (
                <div className="alert alert-danger">{error}</div>
              ) : (
                <LineChart order={data} />
              )}
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3 h-100">
          <div className="card">
            <div className="card-header border-0 bg-dark text-center text-info fw-semibold">
              Order Status
            </div>
            <div className="card-body">
              {loading === "loading" ? (
                <div className="text-center mt-5">
                  <Hourglass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={["#306cce", "#72a1ed"]}
                  />{" "}
                  Loading...
                </div>
              ) : loading === "failed" ? (
                <div className="alert alert-danger">{error}</div>
              ) : (
                <PieChart order={data} />
              )}
            </div>
          </div>
        </div>
        <div className="col-md-12 mb-3 h-100">
          <div className="card">
            <div className="card-header border-0 bg-dark text-center text-info fw-semibold">
              Monthly Sales{" "}
            </div>
            <div className="card-body">
              {loading === "loading" ? (
                <div className="text-center mt-5">
                  <Hourglass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={["#306cce", "#72a1ed"]}
                  />{" "}
                  Loading...
                </div>
              ) : loading === "failed" ? (
                <div className="alert alert-danger">{error}</div>
              ) : (
                <BarChart order={data} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
