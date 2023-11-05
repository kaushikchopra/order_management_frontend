import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../redux/slices/cartSlice";
import { productsInCart } from "../../../redux/slices/cartSlice";

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

const ProductCard = ({ product }) => {
  const { name, description, price, manufacturer, image, category } = product;

  // To get all products in the cart and check if the product already exist
  const cart = useSelector(productsInCart);
  const isProductInCart = cart.some((item) => {
    return item._id === product._id;
  });

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    // Dispatch to add a product to the cart
    dispatch(addItem(product));
  };

  const truncatedDescription = truncateText(description, 50);

  return (
    <div className="card my-4">
      <header>
        <img
          src={image}
          alt={name}
          className="card-img-top img-fluid object-fit-scale"
          style={{ maxHeight: "200px" }}
        />
      </header>
      <div className="card-body text-center">
        <h5 className="card-title">{name}</h5>
        <p className="card-text text-muted">{manufacturer}</p>
        <p className="card-text">{truncatedDescription}</p>
        <p className="card-text">Category: {category}</p>
        <p className="card-text text-dark fw-bold">₹{price}</p>
      </div>
      <div className="card-footer text-center bg-white border-0">
        {isProductInCart ? (
          <button className="btn btn-secondary" disabled>
            In Cart
          </button>
        ) : (
          <button
            onClick={() => handleAddToCart(product)}
            className="btn btn-dark"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
