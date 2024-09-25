
// import React, { useState, useEffect } from 'react';
// import ProductList from '../components/ProductList';
// import AddEditProduct from '../components/AddEditProduct'; // Import the AddEditProduct component
// import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../services/api'; // Import your CRUD functions
// import '../styles/HomePage.css';


// function HomePage() {
//   const [products, setProducts] = useState([]);
//   const [editingProduct, setEditingProduct] = useState(null);

//   const handleEdit = (product) => {
//     setEditingProduct(product);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const productsData = await getAllProducts();
//       setProducts(productsData);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   return (
//     <div className="home-page">
//       <h1>Product Management</h1>
//       <ProductList products={products} />

//     </div>
//   );
// }

// export default HomePage;


import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import AddEditProduct from '../components/AddEditProduct'; // Import the AddEditProduct component
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../services/api'; // Import your CRUD functions
import '../styles/HomePage.css';
import SearchBar from '../components/SearchBar';

function HomePage() {

  const [searchQuery, setSearchQuery] = useState('');

  const [filteredProducts, setFilteredProducts] = useState([]);


  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const productsData = await getAllProducts();
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleSave = async (productData) => {
    debugger;
    console.log(productData)
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, productData);
        setEditingProduct(null);
      } else {
        await createProduct(productData);
      }
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };


  useEffect(() => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||

      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredProducts(filtered);

  }, [searchQuery, products])


  const handleSearchChange = (e) => {
    debugger;
    setSearchQuery(e);
  };

  return (
    <div className="home-page">
      <h1>Product Management</h1>

      <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />


      <ul>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <li key={product._id}>
              <h3>{product.title}</h3>
              <p>{product.description}</p>


              <p>${product.price}</p>
              <img src={`http://localhost:9000${product.imageFile}`} alt={product.title} width="100" />
            </li>
          ))
        ) : (
          <p>No products found</p>
        )}
      </ul>


      <AddEditProduct product={editingProduct} onSave={handleSave} onCancel={handleCancel} />
      <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default HomePage;
