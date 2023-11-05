import React, { useEffect } from "react";
import OrderDataTable from "../tables/OrderDataTable";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../../redux/slices/orderSlice";
import { Dna } from "react-loader-spinner";
import { selectAccessToken } from "../../../redux/slices/authSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const { data, loading, error } = useSelector((state) => state.orders);

  const orderData = data;

  useEffect(() => {
    if (loading === "idle") {
      dispatch(fetchOrders(accessToken));
    } // eslint-disable-next-line
  }, [loading, dispatch]);

  // Calculate the counts for different order statuses
  const totalOrders = orderData.length;
  const acceptedOrders = orderData.filter(
    (order) => order.status === "Accepted"
  ).length;
  const dispatchedOrders = orderData.filter(
    (order) => order.status === "Dispatched"
  ).length;
  const deliveredOrders = orderData.filter(
    (order) => order.status === "Delivered"
  ).length;
  const returnedOrders = orderData.filter(
    (order) => order.status === "Returned"
  ).length;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 fw-bold fs-3">Manange Orders</div>
      </div>
      <div className="row justify-content-center justify-content-sm-between mt-2">
        <div className="col-12 col-sm-6 col-md-3 col-lg-3 col-xl-2  mb-3">
          <div className="card text-bg-primary">
            <div className="card-body text-center">
              <h6 className="card-title">Total Orders</h6>
              <hr />
              <p className="card-text fw-bold fs-4">{totalOrders}</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-3 col-lg-3 col-xl-2  mb-3">
          <div className="card text-bg-info">
            <div className="card-body text-center">
              <h6 className="card-title">Accepted</h6>
              <hr />
              <p className="card-text fw-bold fs-4">{acceptedOrders}</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-3 col-lg-3 col-xl-2  mb-3">
          <div className="card text-bg-warning">
            <div className="card-body text-center">
              <h6 className="card-title">Dispatched</h6>
              <hr />
              <p className="card-text fw-bold fs-4">{dispatchedOrders}</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-3 col-lg-3 col-xl-2  mb-3">
          <div className="card text-bg-success">
            <div className="card-body text-center">
              <h6 className="card-title">Delivered</h6>
              <hr />
              <p className="card-text fw-bold fs-4">{deliveredOrders}</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-3 col-lg-3 col-xl-2  mb-3">
          <div className="card text-bg-danger">
            <div className="card-body text-center">
              <h6 className="card-title">Returned</h6>
              <hr />
              <p className="card-text fw-bold fs-4">{returnedOrders}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header text-center bg-dark text-white fw-semibold fs-5">
              Order Table
            </div>
            <div className="card-body p-0">
              {loading === "loading" ? (
                <div className="text-center mt-5">
                  <Dna
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                  />{" "}
                  Loading...
                </div>
              ) : error ? (
                <div className="alert alert-danger">{error}</div>
              ) : (
                <OrderDataTable data={orderData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
