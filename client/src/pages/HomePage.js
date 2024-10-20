import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import { Link, Outlet } from "react-router-dom";
import AddEditProduct from "../components/AddEditProduct"; // Import the AddEditProduct component
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/api"; // Import your CRUD functions
import "../styles/HomePage.css";
import SearchBar from "../components/SearchBar";
import { LoadingSpinner } from "../components/common/Spinner";
import PaymentModeFilter from "../components/PaymentModeFilter";

function HomePage({isAuthenticated}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);


    // States for payment mode filters
    const [filterEMI, setFilterEMI] = useState(false);
    const [filterCOD, setFilterCOD] = useState(false);
    const [filterPAID, setFilterPAID] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const productsData = await getAllProducts();
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };


  const handleSearchChange = (e) => {
    setSearchQuery(e);
  };


  useEffect(() => {
    const filtered = products.filter((product) => {
      // Filter by search query
      const matchesSearchQuery =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by payment mode
      const matchesPaymentMode =
        (filterEMI && product.paymentMode === "EMI") ||
        (filterCOD && product.paymentMode === "COD") ||
        (filterPAID && product.paymentMode === "PAID") ||
        (!filterEMI && !filterCOD && !filterPAID); // No filter applied

      return matchesSearchQuery && matchesPaymentMode;
    });

    setFilteredProducts(filtered);
  }, [searchQuery, products, filterEMI, filterCOD, filterPAID]);

  const handleFilterChange = (mode) => {
    if (mode === 'EMI') setFilterEMI(!filterEMI);
    if (mode === 'COD') setFilterCOD(!filterCOD);
    if (mode === 'PAID') setFilterPAID(!filterPAID);
  };

  return (
    <div className="home-page">
      <h1>REACT </h1>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="flex-grow-1">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
        </div>


      


  {isAuthenticated && ( 
        <Link to="/add-product">
          <button className="btn btn-primary ms-2">Add Product</button>
        </Link>
        )}
      </div>


      <PaymentModeFilter
          filterEMI={filterEMI}
          filterCOD={filterCOD}
          filterPAID={filterPAID}
          onFilterChange={handleFilterChange}
        />

      <Outlet />
      {/* <AddEditProduct product={editingProduct} onSave={handleSave} onCancel={handleCancel} /> */}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <ProductList
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isAuthenticated={isAuthenticated}  
        />
      )}
    </div>
  );
}

export default HomePage;
