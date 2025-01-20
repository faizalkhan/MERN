import { createContext, useEffect, useState } from "react";
import { AuthContextType } from "./AuthTypes";
import { loginIn } from "../../services/auth";
import { useRouter } from "next/router";



export const AuthenticateContext = createContext<AuthContextType | null>(null);

export const AuthenticateProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const router = useRouter();

 console.log("auth", isAuthenticated);


    //  const token = localStorage.getItem("token");
     
     useEffect(() => {

        const token = localStorage.getItem("token");
      
        if (token) {
          setIsAuthenticated(true);
        }
        else {
            router.push("/admin")
        }
      }, []);

    const login = async(email, password) => {
    const response = await loginIn(email, password);
    if (response.status === "success") {
      localStorage.setItem("token", response.token);
      setIsAuthenticated(true);
      console.log("st", isAuthenticated)
    }
    return response;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthenticateContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthenticateContext.Provider>
  );
};
