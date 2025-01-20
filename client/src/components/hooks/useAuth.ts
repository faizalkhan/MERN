import { useContext } from "react";
import { AuthenticateContext } from "../contexts/AuthenticateContext";
import { AuthContextType } from "../contexts/AuthTypes";


export const useAuth = (): AuthContextType => {
  const value = useContext(AuthenticateContext);

  if (!value) {
    throw new Error(
      'The `useAuth` hook must be used within a component that is wrapped with the <AuthProvider /> context provider.',
    );
  }

  return value;
};
