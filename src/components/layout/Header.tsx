import React from "react";
import { useAuth } from "../../context/AuthContext";
import { FiLogOut } from "react-icons/fi";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-purple-600">TaskMaster</h1>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-700">{user?.name}</span>
            <button
              onClick={logout}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Logout"
            >
              <FiLogOut className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
