import React, { createContext, useContext, useState } from "react";
import { User, LoginCredentials } from "../types/auth";

interface AuthContextType {
  user: User | null;
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

  const login = async (credentials: LoginCredentials) => {
    // Mock login kontrolü
    if (
      credentials.email === "demo@example.com" &&
      credentials.password === "demo123"
    ) {
      setUser(MOCK_USER);
    } else {
      throw new Error("Invalid email or password");
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
