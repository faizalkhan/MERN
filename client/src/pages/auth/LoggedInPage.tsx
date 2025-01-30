import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthenticateContext } from "../../components/contexts/AuthenticateContext";

function LoggedInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();  
    const authContext = useContext(AuthenticateContext);
  
    const {isAuthenticated, login } = authContext;
  
    console.log(`Authentication`, isAuthenticated);
  
    useEffect(() => {
      debugger;
      if (isAuthenticated) {
        router.push("/admin/dashboard");
      }
   
    }, [isAuthenticated, router]);
  
  
    const handleLogin = async (e) => {
      e.preventDefault();
      setError("");
      try {
        const response = await login(email, password);
        if (response.status === "success") {
           router.push("/admin/dashboard");
        } else {
          setError("Invalid login credentials");
        }
      } catch (err) {
        setError("An error occurred during login.");
      }
    };

    return (
      <>
    
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
         
          <form onSubmit={handleLogin} className="space-y-6">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Password{" "}
          </label>
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      {error && <p>{error}</p>}

      </div>
        </div>
      </>
    )
  }


  export default LoggedInPage;