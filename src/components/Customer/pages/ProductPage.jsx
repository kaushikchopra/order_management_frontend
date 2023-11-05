// ProductPage.js
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "../../../api/axios";

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");

      if (response.status === 200) {
        setProducts(response.data);
      } else {
        console.error("Error fetching the products data");
      }
    } catch (error) {
      console.error("Error is product fetching: ", error);
    }
  };

  return (
    <>
      <main className="container mt-4">
        <div className="row">
          {products.map((product) => (
            <div
              key={product._id}
              className="col-12 col-md-6 col-sm-6 col-lg-3"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default ProductPage;
