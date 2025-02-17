import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { MaleHome } from './pages/MaleHome';
import { Workout } from './pages/Workout';
import { Login } from './pages/Login';
import { Challenges } from './pages/Challenges';
import { Assistant } from './pages/Assistant';
import { Tutorials } from './pages/Tutorials';
import FemaleHome from './pages/FemaleHome';
import Home from './pages/Home';
import PeriodTracker from './pages/cycle';
import Wellness from './pages/wellness';

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/cycle" element={<PeriodTracker/>}/>
          <Route path="/wellness" element={<Wellness/>}/>
          <Route path="/male-home" element={<MaleHome />} />
          <Route path='/female-home' element={<FemaleHome/>}/>
          <Route path="/workout" element={<Workout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/tutorials" element={<Tutorials />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;