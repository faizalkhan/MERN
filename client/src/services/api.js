// api.js
import axios from "axios";
import { set } from "lodash";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const withLoading = async (apiCall, setLoading) => {
  setLoading(true); // Set loading to true before the call
  try {
    const response = await apiCall();
    return response; // Return the API response
  } catch (error) {
    throw error; // Rethrow the error to handle it in the component
  } finally {
    setLoading(false); // Set loading to false after the call
  }
};

// CRUD operations

export const getAllProducts = async (page, limit, filters = {}, setLoading) => {
  return withLoading(async () => {
    const queryParams = new URLSearchParams({
      page,
      limit,
      search: filters.search || "", // Search query, default to empty
      filterDell: filters.filterDell,
      filterHp: filters.filterHP,
      filterLenovo: filters.filterLenovo,
      priceRange: filters.priceRange,
    });
    const response = await api.get(`api/products?${queryParams.toString()}`);

    return response.data;
  }, setLoading);
};

export const createProduct = async (productData, setLoading) => {
  return withLoading(async () => {
    const response = await api.post("api/products", productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }, setLoading);
};

export const updateProduct = async (productId, productData, setLoading) => {
  return withLoading(async () => {
    const response = await api.put(`api/products/${productId}`, productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }, setLoading);
};

export const deleteProduct = async (productId, setLoading) => {
  return withLoading(async () => {
    const response = await api.delete(`api/products/${productId}`);
    return response.data;
  }, setLoading);
};

export default api;
