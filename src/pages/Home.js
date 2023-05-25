import Footer from "../components/Footer";
import Header from "../components/Header";
import '../styles/App.css';



import { PessoaController } from '../controllers/PessoaController';








function Home() {


    const handleClick = () => {
        const controller = new PessoaController();
        controller.listaTodos().then((dados) => {
            console.log(dados);  // Imprime os dados retornados no console
        }).catch((error) => {
            console.error(error);
        });
    };

    return (

        <div className="corpo">
            <Header></Header>


            <button onClick={handleClick} >cathuca</button>
            <div className="rodape"><Footer ></Footer></div>

        </div>


    );
}





export default Home;