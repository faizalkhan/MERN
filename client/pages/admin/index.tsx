import React, { useContext, useEffect, useState } from "react";
import LoggedInPage from "../../src/pages/auth/LoggedInPage";
import { AuthenticateContext, AuthenticateProvider } from "../../src/components/contexts/AuthenticateContext";
import { useRouter } from "next/router";

const LoginPage = () => {

  const router = useRouter();
  const context = useContext(AuthenticateContext);

  useEffect(() => {
    if (context?.isAuthenticated) {
      router.push("/admin/dashboard");
    }
  }, [context, router]);



  // Show loading if authentication status is still being determined
  if (context?.isAuthenticated) {
    return <p>Redirecting to the dashboard...</p>;
  }

  return (
     <AuthenticateProvider>
     <LoggedInPage />
    </AuthenticateProvider>    
   
  );
};

LoginPage.noLayout = false;

export default LoginPage;
