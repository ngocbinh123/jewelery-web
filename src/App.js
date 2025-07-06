import './App.css';
import Header from './components/Header';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CollectionSection from './components/CollectionSection';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
 <div className="App">
      <Header />
 <Switch>
 <Route path="/about">
 <AboutSection />
 </Route>
 <Route path="/collections">
 <CollectionSection />
 </Route>
 <Route path="/contact">
 <ContactSection />
 </Route>
 </Switch>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
