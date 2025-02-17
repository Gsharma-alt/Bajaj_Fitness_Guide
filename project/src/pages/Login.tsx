import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { User as UserIcon } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('male'); // Default gender selection
  const navigate = useNavigate();
  const setCurrentUser = useStore((state) => state.setCurrentUser);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser({
      id: '1',
      name: email.split('@')[0],
      score: 0,
      gender: gender,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    });
    
    // Navigate based on gender selection
    if (gender === 'male') {
      navigate('/');
    } else {
      navigate('/female-home');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-lg rounded-lg">
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-full bg-indigo-100 mb-4">
            <UserIcon className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-indigo-600">Welcome Back</h2>
          <p className="text-indigo-500">Sign in to continue your fitness journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-indigo-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-indigo-300 px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-indigo-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-indigo-300 px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-indigo-600">
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 block w-full rounded-md border border-indigo-300 px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}