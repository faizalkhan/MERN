import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    loginIn
  } from "../services/auth";

const LoginPage = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
       const response = await loginIn(email, password);
     
       if (response.status === "success") {
        localStorage.setItem("token", response.token);
        setIsAuthenticated(true);
        navigate("/"); // Redirect to HomePage after login
      }
    } catch (err) {
      setError("Invalid login credentials");
    }
  };

  return (
    <div>
  
      <form onSubmit={handleLogin}>
      <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
         class="form-control"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        </div>
        <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Password </label>
        <input
          class="form-control"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
