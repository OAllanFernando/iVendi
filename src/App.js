import { BrowserRouter, Routes, Route } from "react-router-dom";
import './pages/about';
import './pages/Home';
import './styles/App.css';
import Clientes from "./pages/Clientes";

import Home from './pages/Home';




function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}> </Route>
      <Route path="/clientes" element={<Clientes />}></Route>
      
       
     
    </Routes>
  </BrowserRouter>
    
  );
  
}

export default App;
