import ListaVenda from "../components/listagem/ListaVenda";


import Footer from "../components/Footer";
import Header from "../components/Header";
import '../styles/App.css';



//import { PessoaController } from '../controllers/PessoaController';

function Cidades() {
    return (

        <div className="corpo">
            <Header></Header>


            <ListaVenda />
            <div className="rodape"><Footer ></Footer></div>

        </div>


    );
}





export default Cidades;