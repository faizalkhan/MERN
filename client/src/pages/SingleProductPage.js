import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Import Axios or your preferred HTTP library
import "../styles/SingleProductPage.css";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/common/Spinner";

const API_URL = process.env.REACT_APP_BACKEND_URL;

function SingleProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  const fetchProduct = async (id) => {
    try {
      const response = await axios.get(`${API_URL}api/products/${id}`); // Adjust the API endpoint
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  if (!product) {
    return <LoadingSpinner />;
  }

  //const imageSrc = `${API_URL}${product.imageFile}`;
  return (
    <div className="single-product-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <div className="product-image">
        <img src={product.imageFile} alt={product.title} />
      </div>
      <div className="product-details">
        <h2>{product.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
        <p>
          <strong>Price: ₹{product.price}</strong>
        </p>
        <p>
          <span>Online Price: </span>{" "}
          <span className="online-price">₹{product.onlinePrice} </span>
        </p>
        <div className="product-buttons">
          {/* <button className="buy-now">Buy Now</button>
          <button className="add-to-cart">Add to Cart</button> */}
        </div>
      </div>
    </div>
  );
}

export default SingleProductPage;
