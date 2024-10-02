import React from "react";
import { Link } from "react-router-dom";
import "../styles/ProductCard.css";

function ProductCard({ product, onEdit, onDelete }) {
  const imageSrc = `${process.env.REACT_APP_BACKEND_URL}${product.imageFile}`;

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={imageSrc} alt={product.title} />
      </div>
      <div className="product-details">
        <p>
          <b>{product.title} </b>
        </p>
        <h3>
          {" "}
          <strong> Price: ₹{product.price} </strong> <span> OnlinePrice: </span>
          <span class="online-price">₹{product.onlinePrice} </span>{" "}
        </h3>
      </div>
      <div className="product-actions">
        {/* <button onClick={() => onEdit(product)}>Edit</button>*/}
        <button onClick={() => onDelete(product._id)}>Delete</button>
        <button>
          {" "}
          <Link to={`/product/${product._id}`}>View Details</Link>{" "}
        </button>

        {/* Add this link */}
      </div>
    </div>
  );
}

export default ProductCard;
