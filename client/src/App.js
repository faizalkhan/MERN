import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage.js";
import SingleProductPage from "./pages/SingleProductPage";
import "./styles/App.css";
import AddEditProduct from "./components/AddEditProduct.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-product" element={<AddEditProduct />} />
          <Route path="/product/:productId" element={<SingleProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
