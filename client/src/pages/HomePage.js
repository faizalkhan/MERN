import React, { useState, useEffect, useRef } from "react";
import ProductList from "../components/ProductList";
import { Link, Outlet } from "react-router-dom";
import AddEditProduct from "../components/AddEditProduct"; // Import the AddEditProduct component
import {
  getAllProducts,
  deleteProduct,
} from "../services/api"; // Import your CRUD functions
import "../styles/HomePage.css";
import SearchBar from "../components/SearchBar";
import { LoadingSpinner } from "../components/common/Spinner";
import ProductFilter from "../components/ProductFilter";
import InfiniteScroll from "react-infinite-scroll-component";
import { debounce } from "lodash";
import Container from "react-bootstrap/Container";
import Drawer from "../components/filtersidemenu/Drawer";

function HomePage({ isAuthenticated }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);


  const [filters, setFilters] = useState({
    DELL: false,
    HP: false,
    LENOVO: false,
    priceRange: null,
  });

  const [page, setPage] = useState(1);
  const [totalProduct, setTotalProduct] = useState(0);
  const isFirstFetch = useRef(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const debouncedSearch = useRef(
    debounce((query) => {
      setProducts([]);
      setPage(1);
      fetchProducts(query);
    }, 1000)
  ).current;


  const fetchProducts = async (query = searchQuery) => {
    if (loading || searchLoading) return;
    setLoading(true);

    try {
      const limit = 10;
      const { DELL, HP, LENOVO, priceRange } = filters;
      const apiFilters = {
        search: searchQuery || query || "",
        filterDell: DELL,
        filterHP: HP,
        filterLenovo: LENOVO,
        priceRange: priceRange,
      };

      const { products: newProducts, total } = await getAllProducts(
        page,
        limit,
        apiFilters,
        setLoading
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

  const handleEdit = useCallback((product) => {
    setEditingProduct(product);
  },
  []);

  const handleCancel = () => {
    setEditingProduct(null);
  };

  const handleDelete = useCallback(async (productId) => {
    try {
      await deleteProduct(productId, setLoading);
      setProducts([]); 
      setPage(1);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  },
  [])

  const handleFilterChange = (mode) => {
    isFirstFetch.current = true;
    if (["DELL", "HP", "LENOVO"].includes(mode)) {
      setFilters((prev) => ({
        ...prev,
        [mode]: !prev[mode],
      }));
    }

    const priceRanges = {
      under15000: "under15000",
      "16000to20000": "16000to20000",
      "25000to30000": "25000to30000",
      "35000to40000": "35000to40000",
      "45000to50000": "45000to50000",
      above50000: "above50000",
    };

    if (priceRanges[mode]) {
      setFilters((prev) => ({
        ...prev,
        priceRange: priceRanges[mode],
      }));
    } else {
      setFilters((prev) => {
        return {
          ...prev,
          priceRange: "",
        };
      });
    }

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
    setProducts([]);
    setPage(1);
    fetchProducts();
  }, [filters]);

  return (
    <Container-Fluid>
      <div className="home-page">
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

        <div className="d-md-none d-flex justify-content-center product-filter-mobile">
        <Drawer filters={filters} onFilterChange={handleFilterChange} />

  
</div>

<div className="d-md-block d-none col-md-3">





  <ProductFilter
    filters={filters}
    onFilterChange={handleFilterChange}
  />
</div>




      
          <div className="col-md-9">
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
                  !loading && (
                    <p>
                      {filters.LENOVO
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
    </Container-Fluid>
  );
}

export default HomePage;
