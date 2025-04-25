import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import LandingPage from "./components/Landing";
import Navbar from "./components/Navbar";
import PricingPage from "./components/Pricing";
import PricingSection from "./components/PricingSection";
import Footer from "./components/Footer";
import SignUp from "./components/SignUpMod";
import Faq from "./components/Faq";
import LoginPage from "./components/LoginPage";
import { useLocation } from "react-router";
import Register from "./components/Register";

function App() {
  const location = useLocation();

  const hideFooterRoute = ["/login","/register","/signup"];
  return (
    <>
      <Navbar />
      <div className="mt-16">
      <Routes>
        {/* <div className="App"> */}
        <Route path="/"   element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/price" element={<PricingSection />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/register" element={<Register/>}/>
      </Routes>
      </div>
    
      {!hideFooterRoute.includes(location.pathname) && (
        <>
          <Faq />
          
        </>
      )}
      <Footer />
    </>
  );
}

export default App;
