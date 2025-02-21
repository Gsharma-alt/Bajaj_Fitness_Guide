
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
import Wellness from './pages/diet';
import BicepCurlsChallenge from './pages/40bicepcurls';
import SquatsChallenge from './pages/50squat';

import PushupsChallenge from './pages/30pushup';
import { Register } from './pages/register';
import { Profile } from './pages/profile';
import About from './pages/about';
import PersonalizedTraining from './pages/PersonalizedTraining';
import Redeem from './pages/redeem';
import Join from './pages/Join';
import Diet from './pages/diet'; 
import Leaderboard from './pages/leaderboard';
import Tracker from './pages/tracker';


export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/cycle" element={<PeriodTracker/>}/>
          <Route path="/40bicepcurls" element={<BicepCurlsChallenge/>}/>
          <Route path="/50squat" element={<SquatsChallenge/>}/>
          
          <Route path="/30pushup" element={<PushupsChallenge/>}/>
          <Route path="/register" element={<Register/>}/>
          
          <Route path="/wellness" element={<Wellness/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/male-home" element={<MaleHome />} />
          <Route path='/female-home' element={<FemaleHome/>}/>
          <Route path="/workout" element={<Workout />} />
          <Route path="/about" element={<About/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path='/PersonalAssistant' element={<PersonalizedTraining/>}/>
          <Route path='/Redeem' element={<Redeem/>}/>
          <Route path='/join' element={<Join/>}/>
          <Route path="/diet" element={<Diet/>}/>
          <Route path="/leaderboard" element={<Leaderboard/>}/>
          <Route path="/tracker" element={<Tracker/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;