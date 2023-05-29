import ListaProduto from "../components/listagem/ListaProduto";


import Footer from "../components/Footer";
import Header from "../components/Header";
import '../styles/App.css';



//import { PessoaController } from '../controllers/PessoaController';

function Produtos() {
    return (

        <div className="corpo">
            <Header></Header>


            <ListaProduto />
            <div className="rodape"><Footer ></Footer></div>

        </div>


    );
}





export default Produtos;