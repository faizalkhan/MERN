export interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<{ status: string; token?: string }>;
    logout: () => void;
  }