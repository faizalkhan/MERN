import React, { useState } from "react";

import ProductCard from "./ProductCard";
import { useRouter } from "next/router"; 

function ProductList({ products, onDelete, isAuthenticated}) {
  const [editingProduct, setEditingProduct] = useState(null);

  const router = useRouter();

  const handleEdit = (product) => {
    setEditingProduct(product);



    // navigate("/add-product", { state: { product } });


    // router.push({
    //   pathname: "/add-product",
    //   query: { product: JSON.stringify(product) },  // Passing product data via query string
    // });

    // navigate("/add-product");
  };
  const handleCancelEdit = () => {
    setEditingProduct(null);
    //navigate("/"); // Navigate back to the product list or wherever appropriate

    //router.push("/");
  };

  console.log("Product list selected");
  return (
    <div className="product-list">
      {products?.map((product, index) => (
        <ProductCard
          key={`${product.id}-${index}`}         
          product={product}
          onEdit={handleEdit} // Ensure onEdit is a function that handles editing
          onDelete={onDelete}
          isAuthenticated={isAuthenticated} 
        />
      ))}
    </div>
  );
}

export default React.memo(ProductList);
