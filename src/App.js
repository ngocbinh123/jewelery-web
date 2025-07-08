import './App.css';
import Header from './components/Header';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CollectionSection from './components/CollectionSection';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DSDashboardScreen from './design-system/showcases/DSDashboardScreen';

function App() {
  return (
    <DSDashboardScreen />
  );
  // return (
  //   <BrowserRouter>
  //     <div className="App">
  //       <Header />
  //       <Routes>
  //         <Route path="/" element={<AboutSection />} />
  //         <Route path="/about" element={<AboutSection />} />
  //         <Route path="/collection" element={<CollectionSection />} />
  //         <Route path="/contact" element={<ContactSection />} />
  //         {/* <Route path="/design-system" element={<DSDashboardScreen />} /> */}
  //       </Routes>
  //       <Footer />
  //     </div>
  //   </BrowserRouter>
  // );
}

export default App;
