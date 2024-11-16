import React, { useState, useEffect, useRef } from "react";
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
import InfiniteScroll from "react-infinite-scroll-component";
import { debounce } from "lodash";
import Container from "react-bootstrap/Container";

function HomePage({ isAuthenticated }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  // States for payment mode filters
  const [filterDELL, setFilterDELL] = useState(false);
  const [filterHP, setFilterHP] = useState(false);
  const [filterLENOVO, setFilterLENOVO] = useState(false);

  const [page, setPage] = useState(1);
  const [totalProduct, setTotalProduct] = useState(0);

  const isFirstFetch = useRef(true);

  const [searchLoading, setSearchLoading] = useState(false);

  const debouncedSearch = useRef(
    debounce((query) => {
      setProducts([]);
      fetchProducts(query);
    }, 1000)
  ).current; // Keep a reference to the debounced function

  const fetchProducts = async (query = searchQuery) => {

    if (loading || searchLoading) return;
    setLoading(true);

    try {
      const limit = 10;
      const filters = {
        search: searchQuery || query || "",
        filterDell: filterDELL,
        filterHP: filterHP,
        filterLenovo: filterLENOVO,
      };

      const { products: newProducts, total } = await getAllProducts(
        page,
        limit,
        filters
      );

      setProducts((prev) => [...prev, ...newProducts]);
      setTotalProduct(total);

      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
      setSearchLoading(false);
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

  const handleFilterChange = (mode) => {
    debugger;
    isFirstFetch.current = true;
    if (mode === "DELL") setFilterDELL((prev) => !prev);
    if (mode === "HP") setFilterHP((prev) => !prev);
    if (mode === "LENOVO") setFilterLENOVO((prev) => !prev);
    setPage(1);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length >= 1 || query.length === 0) {
      setPage(1);
      debouncedSearch(query);
    }
  };

  const resetAndFetch = () => {
    setProducts([]);
    setPage(1);
  };
  useEffect(() => {
    if (isFirstFetch.current) {
      fetchProducts();
      isFirstFetch.current = false;
    }
  }, []);

  useEffect(() => {
    if (!isFirstFetch.current) return;

    setProducts([]); // Reset the product list when filters change
    setPage(1); // Reset the page to 1 when filters change
    fetchProducts();
  }, [filterDELL, filterHP, filterLENOVO]);

  return (
    <Container>
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

        <div className="row">
          <div className="col-md-2">
            <PaymentModeFilter
              filterDELL={filterDELL}
              filterHP={filterHP}
              filterLENOVO={filterLENOVO}
              onFilterChange={handleFilterChange}
            />
          </div>

          <div className="col-md-10">
            <Outlet />

            {loading && products.length === 0 ? (
              <LoadingSpinner />
            ) : (
              <InfiniteScroll
                dataLength={products.length}
                next={() => fetchProducts(searchQuery)}
                hasMore={products.length < totalProduct}
                scrollThreshold={0.9}
                loader={
                  searchLoading ? <LoadingSpinner /> : <h4>Loading...</h4>
                } // Show spinner only if search is loading
              >
                {products.length > 0 ? (
                  <ProductList
                    products={products}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    isAuthenticated={isAuthenticated}
                  />
                ) : (
                  !loading && 
                  (
                    <p>
                      {filterLENOVO
                        ? "No products in Lenovo."
                        : searchQuery
                        ? `No results found for "${searchQuery}".`
                        : "No products available."}
                    </p>
                  )                  
                )}
              </InfiniteScroll>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default HomePage;
