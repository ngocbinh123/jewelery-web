import './App.css';
import Header from './components/Header';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CollectionSection from './components/CollectionSection';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<AboutSection />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/collection" element={<CollectionSection />} />
          <Route path="/contact" element={<ContactSection />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
