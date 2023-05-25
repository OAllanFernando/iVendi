import ListaCliente from "../components/listagem/ListaCliente";


import Footer from "../components/Footer";
import Header from "../components/Header";
import '../styles/App.css';



//import { PessoaController } from '../controllers/PessoaController';

function Clientes() {


   

    return (

        <div className="corpo">
            <Header></Header>


            <ListaCliente />
            <div className="rodape"><Footer ></Footer></div>

        </div>


    );
}





export default Clientes;