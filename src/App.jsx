import { Routes, Route } from 'react-router-dom';
import TrinetraLanding from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import BehaviorDashboard from './pages/BehaviorDashboard';
import EmailVerification from './components/EmailVerification';
import VideoAnalysis from './pages/VideoAnalysis';

import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<TrinetraLanding />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/email-verification" element={<EmailVerification />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <BehaviorDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/videoanalysis"
        element={
          <PrivateRoute>
            <VideoAnalysis />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;