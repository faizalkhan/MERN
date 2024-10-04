import React from "react";
import { Link } from "react-router-dom";
import "../styles/ProductCard.css";

function ProductCard({ product, onEdit, onDelete }) {
  //const imageSrc = `${process.env.REACT_APP_BACKEND_URL}${product.imageFile}`;

  const handleEdit = () => {
    onEdit(product);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.imageFile} alt={product.title} />
      </div>
      <div className="product-details">
        <p>
          <b>{product.title} </b>
        </p>
        <h3>
          {" "}
          <strong> Price: ₹{product.price} </strong> <span> OnlinePrice: </span>
          <span className="online-price">₹{product.onlinePrice} </span>{" "}
        </h3>
      </div>
      <div className="product-actions">
        {
          <button className="btn btn-primary ms-2" onClick={handleEdit}>
            Edit
          </button>
        }
        <button
          className="btn btn-danger  ms-2"
          onClick={() => onDelete(product._id)}
        >
          Delete
        </button>
        <button className="btn btn-danger  ms-2">
          {" "}
          <Link to={`/product/${product._id}`}>View Details</Link>{" "}
        </button>

        {/* Add this link */}
      </div>
    </div>
  );
}

export default ProductCard;
