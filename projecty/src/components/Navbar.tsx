import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Award, BarChart2, HeartPulse, User, Menu, X } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Navbar() {
  const currentUser = useStore((state) => state.currentUser);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/70 backdrop-blur-lg border-b border-indigo-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-blue-700 transition-all duration-300"
        >
          <Dumbbell className="w-7 h-7 text-indigo-600" />
          <span>FLEX-IT-OUT</span>
        </Link>
        
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none">
          {isOpen ? <X className="w-7 h-7 text-indigo-600" /> : <Menu className="w-7 h-7 text-indigo-600" />}
        </button>
        
        <div className={`md:flex md:items-center md:space-x-6 ${isOpen ? 'block' : 'hidden'} md:block absolute md:static bg-white md:bg-transparent w-full md:w-auto top-16 left-0 p-4 md:p-0 shadow-md md:shadow-none ${isOpen ? 'flex-col space-y-4' : ''}`}>
          <Link to="/challenges" className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 group">
            <Award className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium text-sm">Brownie Points</span>
          </Link>
          
          <Link to="/leaderboard" className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 group">
            <BarChart2 className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium text-sm">Leaderboard</span>
          </Link>
          
          <Link to="/tutorials" className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 group">
            <Dumbbell className="w-5 h-5" />
            <span className="font-medium text-sm">Tutorials</span>
          </Link>
          
          <Link to="/assistant" className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 group">
            <HeartPulse className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium text-sm">Assistant</span>
          </Link>
          
          {currentUser ? (
            <Link to="/profile" className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 group">
              <div className="relative">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full object-cover border-2 border-indigo-100 group-hover:border-indigo-300 transition-colors duration-200" />
                <div className="absolute inset-0 rounded-full border-2 border-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
              <span className="font-medium text-sm">{currentUser.name}</span>
            </Link>
          ) : (
            <Link to="/login" className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium text-sm hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-sm hover:shadow group">
              <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
