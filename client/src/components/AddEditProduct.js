import React, { useState, useEffect, useRef } from 'react';
import '../styles/AddEditProduct.css';

function AddEditProduct({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageFile: null,
  });
  const fileInputRef = useRef(null);

  console.log("fileInputRef", fileInputRef)
  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price,
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
    console.log(formPayload)
    debugger;
    formPayload.append('title', formData.title);
    formPayload.append('description', formData.description);
    formPayload.append('price', formData.price);
    if (formData.imageFile) {
      formPayload.append('imageFile', formData.imageFile);
    }

    console.log("formPayload", formPayload);

    await onSave(formPayload);







    setFormData({
      title: '',
      description: '',
      price: '',
      imageFile: null,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="add-edit-product">
      <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </label>
        <label>
          Image:
          <input
            type="file"
            name="imageFile"         
            onChange={handleFileChange}
            accept="image/*"
            required={!product} 
            ref={fileInputRef}  
          />
        </label>
        <div className="buttons">
          <button type="submit">{product ? 'Save Changes' : 'Add Product'}</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEditProduct;
