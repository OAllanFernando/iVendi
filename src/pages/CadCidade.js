import Footer from "../components/Footer";
import Header from "../components/Header";
import CadastroCidade from "../components/cadastro/CadastroCidade";
export default function CadCidade(){
    return (

        <div className="corpo">
            <Header></Header>


            <CadastroCidade />
            <div className="rodape"><Footer ></Footer></div>

        </div>
    )
}