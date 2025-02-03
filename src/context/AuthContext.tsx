import React, { createContext, useContext, useState } from "react";
import { User, LoginCredentials } from "../types/auth";
import { api } from "../services/api";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock kullanıcı
const MOCK_USER: User = {
  id: "1",
  email: "demo@example.com",
  name: "Demo User",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await api.auth.signin({
        username: credentials.username,
        password: credentials.password,
        email: credentials.email,
      });

      setToken(response.token);
      // Token aldıktan sonra kullanıcı bilgilerini set edebiliriz
      setUser({
        id: "1", // Bu bilgiler backend'den gelebilir
        email: credentials.email,
        name: credentials.username,
      });
    } catch (error) {
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
