import Footer from "../components/Footer";
import Header from "../components/Header";
import CadastroBairro from "../components/cadastro/CadastroBairro";
export default function CadCidade(){
    return (

        <div className="corpo">
            <Header></Header>


            <CadastroBairro />
            <div className="rodape"><Footer ></Footer></div>

        </div>
    )
}