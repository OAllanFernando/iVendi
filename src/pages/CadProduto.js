import Footer from "../components/Footer";
import Header from "../components/Header";
import CadastroProduto from "../components/cadastro/CadastroProduto";
export default function CadProduto(){
    return (

        <div className="corpo">
            <Header></Header>


            <CadastroProduto />
            <div className="rodape"><Footer ></Footer></div>

        </div>
    )
}