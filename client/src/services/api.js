// api.js
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// CRUD operations

export const getAllProducts = async (page, limit, filters = {}) => {

debugger;
  try {
    const queryParams = new URLSearchParams({
      page,
      limit,
      search: filters.search || "", // Search query, default to empty
      filterDell: filters.filterDell,
      filterHp: filters.filterHP,
      filterLenovo: filters.filterLenovo,
    });
    const response = await api.get(`api/products?${queryParams.toString()}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await api.post("api/products", productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await api.put(`api/products/${productId}`, productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`api/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
