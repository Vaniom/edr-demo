import Header from "./components/Header";
import Brand from "./components/Brand";
import Home from "./components/Home";
import Magazine from "./components/Magazine";
import News from "./components/News";
import Videos from "./components/Videos";
import Footer from "./components/Footer";
import Ads from "./components/Ads";

import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
} from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Brand />
        <Ads />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/magazine" element={<Magazine />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
