import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductDataTable from "../tables/ProductDataTable";
import { MagnifyingGlass } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../redux/slices/authSlice";
import axios from "../../../api/axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const accessToken = useSelector(selectAccessToken);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  const fetchProducts = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
      const response = await axios.get("/api/products", config);

      if (response.status === 200) {
        const productsData = response.data;
        localStorage.setItem("Products", JSON.stringify(productsData));
        setProducts(productsData);
      } else {
        setError("Error fetching the products data");
      }
    } catch (error) {
      setError("Error in product fetching: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mb-3">
        <div className="col-md-12 d-flex">
          <span className="fw-bold fs-3 flex-grow-1">Products</span>
          <Link className="btn btn-primary" to="/dashboard/add_product">
            Add Product
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header text-center bg-dark text-white fw-semibold fs-5">
              Product Table
            </div>
            <div className="card-body p-0">
              {loading ? (
                <div className="text-center mt-5">
                  <MagnifyingGlass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="MagnifyingGlass-loading"
                    wrapperStyle={{}}
                    wrapperClass="MagnifyingGlass-wrapper"
                    glassColor="#c0efff"
                    color="#e15b64"
                  />{" "}
                  Loading...
                </div>
              ) : error ? (
                <div className="alert alert-danger">{error}</div>
              ) : (
                <ProductDataTable data={products} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
