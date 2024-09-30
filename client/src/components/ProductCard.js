import React from "react";
import { Link } from "react-router-dom";
import "../styles/ProductCard.css";


function ProductCard({ product, onEdit, onDelete }) {

  const imageSrc = `${process.env.REACT_APP_BACKEND_URL}${product.imageFile}`;

  return (
    <div className="product-card">
      <div className="product-image">
        <img
          src={imageSrc}
          alt={product.title}
        />
      </div>
      <div className="product-details">
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
      </div>
      <div className="product-actions">
        <button onClick={() => onEdit(product)}>Edit</button>
        <button onClick={() => onDelete(product._id)}>Delete</button>
        <Link to={`/product/${product._id}`}>View Details</Link>{" "}
        {/* Add this link */}
      </div>
    </div>
  );
}

export default ProductCard;
