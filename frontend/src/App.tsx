import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import "./App.css";
import { ToastContainer, toast } from 'react-toastify'
import Signin from "./pages/Signin"
import OAuth2RedirectHandler from "./pages/OAuth2RedirectHandler";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import LocationServices from "./pages/LocationService";



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        <Route path="/location" element={<LocationServices/>}/>
      </Routes>

      <ToastContainer />
    </Router>
  );
}

export default App;

