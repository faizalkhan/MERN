import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router"; 
import { LoadingSpinner } from "../components/common/Spinner";
import ShareButton from "../components/ShareButton";
import PlaceOrder from "../components/placeorder/PlaceOrder";


const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function SingleProductPage({ productId, isAuthenticated }) {
  const router = useRouter(); 
  const [product, setProduct] = useState(null);
  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId]);

  const fetchProduct = async (productId) => {
    try {
      const response = await axios.get(`${API_URL}/api/products/${productId}`); // Adjust the API endpoint
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      router.push("/");
    }
  };

  const handleBackClick = () => {
    const isInternalReferrer = document.referrer && document.referrer.includes(window.location.origin);
    if (isInternalReferrer) {
      router.back();
    } else {
      router.push("/");
    }
  };

  if (!product) {
    return <LoadingSpinner />;
  }
  const productUrl = `${window.location.origin}/product/${product._id}`;

  return (
    <div className="single-product-page">
      <button className="back-button" onClick={handleBackClick}>
        &larr; Back
      </button>
      <div className="product-image">
        <img src={product.imageFile} alt={product.title} />
      </div>

      
      <div className="product-details">
        <h2>{product.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: product.description }} />


        <p>
          <span>Brand: </span>{" "}
          <span>
          <strong>{product.brand} </strong>
          </span>
        </p>



        <p className="pt-20">
          <strong>Price: ₹{product.price.toLocaleString()}/-</strong>
        </p>
        <p>
          <span>Online Price: </span>{" "}
          <span className="online-price">
            ₹{product.onlinePrice.toLocaleString()}/-{" "}
          </span>
        </p>

        {isAuthenticated && (
          <>
            <p>
              <span>Dealer Price: </span>
              <span>
                <strong>₹{product.dealerPrice.toLocaleString()}/- </strong>{" "}
              </span>
            </p>
            <p>
              <span>Dealer Name: </span>
              <span>
                <strong>{product.dealerName} </strong>{" "}
              </span>
            </p>
          </>
        )}
        <div className="product-buttons">
          <ShareButton
            title={product.title}
            description={product.description}
            url={productUrl}
          />

       

          {/* <PlaceOrder   
          title={product.title}
          description={product.description}
          price = {product.price}/>  */}


          {/* {/* <button className="buy-now">Buy Now</button>
          <button className="add-to-cart">Add to Cart</button> */}
        </div>
      </div>
    </div>
  );
}

export default SingleProductPage;
