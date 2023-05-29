import { BrowserRouter, Routes, Route } from "react-router-dom";
import './pages/about';
import './pages/Home';
import './styles/App.css';
import Clientes from "./pages/Clientes";
import Cidades from "./pages/Cidades";
import Bairros from "./pages/Bairros";
import Vendas from "./pages/Vendas";

import CadCidade from "./pages/CadCidade";
import CadBairro from "./pages/CadBairro";
import CadCliente from "./pages/CadCliente";
import CadProduto from "./pages/CadProduto";
import Home from './pages/Home';




function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}> </Route>
      <Route path="/clientes" element={<Clientes />}></Route>
      <Route path="/cidades" element={<Cidades />}></Route>
      <Route path="/bairros" element={<Bairros />}></Route>
      <Route path="/vendas" element={<Vendas />}></Route>

      <Route path="/cadastro/cidade" element={<CadCidade />}></Route>
      <Route path="/cadastro/bairro" element={<CadBairro />}></Route>
      <Route path="/cadastro/cliente" element={<CadCliente />}></Route>
      <Route path="/cadastro/produto" element={<CadProduto />}></Route>
      


    </Routes>
  </BrowserRouter>
    
  );
  
}

export default App;
