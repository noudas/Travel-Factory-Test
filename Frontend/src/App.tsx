import { BrowserRouter as Router, Routes, Route } from "react-router";
import Login from "./pages/Login";
import RequestorDashboard from "./pages/RequestorDashboard";
import ValidatorDashboard from "./pages/ValidatorDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route to Login */}
        <Route path="/" element={<Login />} />

        {/* Dashboard routes based on role */}
        <Route path="/requester-dashboard" element={<RequestorDashboard />} />
        <Route path="/validator-dashboard" element={<ValidatorDashboard />} />

        {/* Fallback for unknown routes */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
