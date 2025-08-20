import React from 'react';
import { Link } from 'react-router-dom'; // or use <a> tags if not using React Router

function Navbar(){
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className="text-lg font-medium text-gray-900">
              MyApp
            </Link>
          </div>

          {/* Primary Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900">
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
              to="/login" 
              className="text-gray-700 hover:text-gray-900 px-3 py-1 rounded-md"
            >
              Login
            </Link>
            <Link 
              to="/adminlogin" 
              className="text-gray-700 hover:text-gray-900 px-3 py-1 rounded-md"
            >
              Admin Login
            </Link>
            <Link 
              to="/signup" 
              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;