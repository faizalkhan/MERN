import React, { useState, useEffect, useRef } from "react";
import "../styles/AddEditProduct.css";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/api";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function AddEditProduct({ product, onCancel }) {
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  const [value, setValue] = useState("");

  const notify = () => toast("Product saved successfully");

  const onSave = async (productData) => {
     const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, productData);
        setEditingProduct(null);
      } else {
        await createProduct(productData);
      }
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    onlinePrice: "",
    imageFile: null,
  });
  const fileInputRef = useRef(null);


  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price,
        onlinePrice: product.onlinePrice,
        imageFile: null,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      description: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      imageFile: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("title", formData.title);
    formPayload.append("description", formData.description);
    formPayload.append("price", formData.price);
    formPayload.append("onlinePrice", formData.onlinePrice);
    if (formData.imageFile) {
      formPayload.append("imageFile", formData.imageFile);
    }

    await onSave(formPayload);

    setFormData({
      title: "",
      description: "",
      price: "",
      onlinePrice: "",
      imageFile: null,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success("Product saved successfully!", {
      autoClose: 500,
      onClose: () => navigate("/"),
    });
  };

  return (
    <div className="add-edit-product">
      <h2>{product ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div class="mb-3 mt-3">
          <label for="email" class="form-label">
            {" "}
            Title:
          </label>
          <input
            className="form-control"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div class="mb-3 mt-3" style={{ height: "600px" }}>
          <label class="form-label"> Description: </label>

          <ReactQuill
            theme="snow"
            style={{ height: "500px" }}
            name="description"
            value={formData.description}
            onChange={handleDescriptionChange}
          />
        </div>

        <div class="mb-3 mt-3">
          <label class="form-label">Price: </label>
          <input
            className="form-control"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div class="mb-3 mt-3">
          <label class="form-label">Online Price:</label>
          <input
            className="form-control"
            type="number"
            name="onlinePrice"
            value={formData.onlinePrice}
            onChange={handleChange}
          />
        </div>

        <div class="mb-3 mt-3">
          <label class="form-label">Image:</label>
          <input
            type="file"
            name="imageFile"
            onChange={handleFileChange}
            accept="image/*"
            required={!product}
            ref={fileInputRef}
          />
        </div>

        <div className="buttons">
          <button type="submit">
            {product ? "Save Changes" : "Add Product"}
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddEditProduct;
