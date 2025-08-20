import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
function UserNavbar(){
const navigate = useNavigate();
  useEffect(() => {
      const token = localStorage.getItem("token");
      const admine = localStorage.getItem("isAdmin");
      const email = localStorage.getItem("email");
      if (!token) {
        navigate("/login");
      }
      console.log("admin = ",admine);
      console.log("user email",email);
     
    }, [navigate]); // Added navigate to dependency array
  
    const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/login");
    };


  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/user" className="text-lg font-medium text-gray-900">
              MyApp
            </Link>
          </div>

          {/* Primary Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/user" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-gray-900">
              Contact
            </Link>
          </div>

          {/* Secondary Nav Items */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/user/work" 
              className="text-gray-700 hover:text-gray-900 px-3 py-1 rounded-md"
            >
              work
            </Link>
            <Link 
              to="/user/update" 
              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
            >
              Update Work
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
};

export default UserNavbar;