// pages/NotFoundPage.js

import React from "react";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate(); 
  const handleGoHome = () => {
    navigate("/"); 
  };
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button onClick={handleGoHome}>Go Home</button>
    </div>
  );
}

export default NotFoundPage;
