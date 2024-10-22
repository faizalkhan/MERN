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
import { useLocation } from "react-router-dom";

function AddEditProduct({ onCancel }) {
  const location = useLocation();
  const product = location.state?.product; // Access the product from state

  const [editingProduct, setEditingProduct] = useState(null);

  const [paymentMode, setPaymentMode] = useState(null);

  const navigate = useNavigate();

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
    dealerPrice: "",
    paymentMode : null,
    imageFile: null,
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price,
        onlinePrice: product.onlinePrice,
        dealerPrice : product.dealerPrice,
        paymentMode : product.paymentMode,
        imageFile: product.imageFile,
        previewUrl: product.imageFile ? `${product.imageFile}` : null,
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

    if (file) {
      const previewUrl = URL.createObjectURL(file);

      setFormData((prevData) => ({
        ...prevData,
        imageFile: file,
        previewUrl: previewUrl,
      }));
    }
  };

  const handlePayment = (e) => {
    debugger;
    console.log(e.target.value)
    setFormData((prevData) => ({
      ...prevData,
      paymentMode: e.target.value,
    }));
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
  debugger;
    const formPayload = new FormData();
    formPayload.append("title", formData.title);
    formPayload.append("description", formData.description);
    formPayload.append("price", formData.price);
    formPayload.append("onlinePrice", formData.onlinePrice);
    formPayload.append("dealerPrice", formData.dealerPrice);
    formPayload.append("paymentMode", formData.paymentMode);
    if (formData.imageFile) {
      formPayload.append("imageFile", formData.imageFile);
    }

    if (
      !formData.price ||
      !formData.onlinePrice ||
      !formData.title ||
      !formData.description ||
      !formData.paymentMode ||
      !formData.dealerPrice
      ) {
      return toast.error(
        "TItle, Description, Price, Online Price and payment Mode are required.",
      );
    }
    setEditingProduct(formPayload);

    try {
      await onSave(formPayload);

      setFormData({
        title: "",
        description: "",
        price: "",
        onlinePrice: "",
        dealerPrice : "",
        imageFile: null,
        paymentMode: "",
        previewUrl: null,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast.success("Product saved successfully!", {
        autoClose: 300,
        onClose: () => navigate("/"),
      });
    } catch (error) {
      toast.error("Failed to save product. Please try again.", {
        autoClose: 300,
      });
      console.error("Error saving product:", error);
    }
  };

  return (
    <div className="add-edit-product">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <h2>{product ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3 mt-3">
          <label for="email" className="form-label">
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

        <div className="mb-3 mt-3" style={{ height: "600px" }}>
          <label className="form-label"> Description: </label>
          <ReactQuill
            theme="snow"
            style={{ height: "500px" }}
            name="description"
            value={formData.description}
            onChange={handleDescriptionChange}
          />
        </div>

        <div className="mb-3 mt-3">
          <label className="form-label">Price: </label>
          <input
            className="form-control"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

         <div className="mb-3 mt-3">
          <label className="form-label">Online Price:</label>
          <input
            className="form-control"
            type="number"
            name="onlinePrice"
            value={formData.onlinePrice}
            onChange={handleChange}
          />
        </div>


        <div className="mb-3 mt-3">
          <label className="form-label">Dealer Price:</label>
          <input
            className="form-control"
            type="number"
            name="dealerPrice"
            value={formData.dealerPrice}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 mt-3">
          <label className="form-label">Image:</label>

          {formData.previewUrl && (
            <img
              src={formData.previewUrl}
              alt={formData.title}
              style={{ height: "200px", width: "auto", marginBottom: "10px" }}
            />
          )}

          <input
            type="file"
            name="imageFile"
            onChange={handleFileChange}
            accept="image/*"
            required={!product}
            ref={fileInputRef}
          />
        </div>



        <div className="mb-3 mt-3">
          <label className="form-label">Payment Mode:</label>

        
          <select
          className="form-control"
        value={formData.paymentMode}
        onChange={handlePayment}
        required
      >
      <option value="">Please select mode</option>
      <option value="COD">COD</option>
       <option value="EMI">EMI</option>
        <option value="PAID">PAID</option>
       </select>
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
