
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import LandingPage from './components/Landing';
import Navbar from './components/Navbar';
import PricingPage from './components/Pricing';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
    {/* <div className="App"> */}
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/price' element ={<PricingSection/>} />
    </Routes>
    <Footer/>
    </Router>
  );
}

export default App;
