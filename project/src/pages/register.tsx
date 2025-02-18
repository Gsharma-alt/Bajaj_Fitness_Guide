import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { User as UserIcon } from 'lucide-react';

export function Register() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [gender, setGender] = useState<string>('male');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Log form data to verify
    console.log('Form Data:', { email, password, gender });

    try {
      // Send POST request to the backend to register the user
      const response = await axios.post('http://localhost:3000/api/auth/signup', 
        {
          email,
          password,
          gender,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        }
      );

      // Log response to check the returned data
      console.log('Response:', response);

      if (response.data.success) {
        // On success, navigate to login page
        navigate('/login');
      } else {
        // Handle error in case of failure (e.g., user already exists)
        alert(response.data.message || 'Registration failed');
      }
    } catch (error: any) {
      console.log(error.message);
      console.error(error);
      // Improve error handling to show specific error message
      alert(error.response?.data?.message || 'An error occurred during registration');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-lg rounded-lg">
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-full bg-indigo-100 mb-4">
            <UserIcon className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-indigo-600">Create an Account</h2>
          <p className="text-indigo-500">Join our fitness community</p>
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
              <option value="other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
          >
            Create Account
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-indigo-600">Already have an account? 
            <button onClick={() => navigate('/login')} className="text-indigo-500 hover:underline ml-1">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
