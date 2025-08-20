import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";

function AdminNavbar() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const admine = localStorage.getItem("isAdmin");
    if (!token || !admine) {
      navigate("/login");
    }
    console.log("admin = ",admine);
  }, [navigate]); // Added navigate to dependency array

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/admin" className="text-lg font-medium text-gray-900"> {/* Changed to /admin */}
              Admin
            </Link>
          </div>

          {/* Primary Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/admin" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link to="/admin/about" className="text-gray-700 hover:text-gray-900"> {/* Added /admin prefix */}
              About
            </Link>
            <Link to="/admin/contact" className="text-gray-700 hover:text-gray-900"> {/* Added /admin prefix */}
              Contact
            </Link>
          </div>

          {/* Secondary Nav Items */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/admin/Addwork" 
              className="text-gray-700 hover:text-gray-900 px-3 py-1 rounded-md"
            >
              Work {/* Capitalized */}
            </Link>
            <Link 
              to="/admin/update" 
              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
            >
              Update Work
            </Link>
            <Link 
              to="/admin/list" 
              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
            >
              Work List
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700" 
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;