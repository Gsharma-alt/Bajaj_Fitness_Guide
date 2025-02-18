import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Award, HeartPulse, User } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Navbar() {
  const currentUser = useStore((state) => state.currentUser);

  return (
    <nav className="bg-white/70 backdrop-blur-lg border-b border-indigo-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-blue-700 transition-all duration-300"
          >
            <Dumbbell className="w-7 h-7 text-indigo-600" />
            <span>FitTech</span>
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link 
              to="/challenges" 
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 group"
            >
              <Award className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-medium">Brownie Points</span>
            </Link>
            
            <Link 
              to="/tutorials" 
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 group"
            >
              <Dumbbell className="w-5 h-5 text-black-600" />
              <span className="font-medium">Tutorials</span>
            </Link>

            <Link 
              to="/assistant" 
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 group"
            >
              <HeartPulse className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-medium">Assistant</span>
            </Link>

            {currentUser ? (
              <Link 
                to="/profile" 
                className="flex items-center space-x-3 text-gray-600 hover:text-indigo-600 transition-colors duration-200 group"
              >
                <div className="relative">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-9 h-9 rounded-full object-cover border-2 border-indigo-100 group-hover:border-indigo-300 transition-colors duration-200"
                  />
                  <div className="absolute inset-0 rounded-full border-2 border-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
                <span className="font-medium">{currentUser.name}</span>
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-sm hover:shadow group"
              >
                <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
