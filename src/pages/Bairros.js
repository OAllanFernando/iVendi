import ListaBairro from "../components/listagem/ListaBairro";


import Footer from "../components/Footer";
import Header from "../components/Header";
import '../styles/App.css';



//import { PessoaController } from '../controllers/PessoaController';

function Bairros() {
    return (

        <div className="corpo">
            <Header></Header>


            <ListaBairro />
            <div className="rodape"><Footer ></Footer></div>

        </div>


    );
}





export default Bairros;