import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landing";
import Navbar from "./components/Navbar";
import PricingPage from "./components/Pricing";
import PricingSection from "./components/PricingSection";
import Footer from "./components/Footer";
import SignUp from "./components/SignUpMod";
import Faq from "./components/Faq";
import LoginPage from "./components/LoginPage";
import { useLocation } from "react-router-dom";
import Register from "./components/Register";
import { EmailContext } from "./components/context/emailContext";

function App() {
  const location = useLocation();
  const [email,setEmail] = useState("");
  const [name,setName] = useState("");
  const [lastName,setLastName] = useState("");
  const [isLocalLogin,setIsLocalLogin] = useState(true);
  const [googleId,setGoogleId] = useState("");
  const [googleToken,setGoogleToken] = useState("");
  


  const hideFooterRoute = ["/login","/register","/signup"];
  return (
    <>
    <EmailContext.Provider value={{email,setEmail ,name,setLastName,lastName,
      setName,isLocalLogin,setIsLocalLogin,googleId,setGoogleId,googleToken,setGoogleToken}} >
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
      </EmailContext.Provider>
    </>
  );
}

export default App;
