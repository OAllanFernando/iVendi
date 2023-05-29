import Footer from "../components/Footer";
import Header from "../components/Header";
import CadastroCliente from "../components/cadastro/CadastroCliente";
export default function CadCliente(){
    return (

        <div className="corpo">
            <Header></Header>


            <CadastroCliente />
            <div className="rodape"><Footer ></Footer></div>

        </div>
    )
}