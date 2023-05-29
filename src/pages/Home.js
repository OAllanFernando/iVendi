import Footer from "../components/Footer";
import Header from "../components/Header";
import '../styles/App.css';

import SelectVariants from "../components/comboBox/ComboBeC";

//import ComboBairro from "../components/comboBox/comboBairro";
//import { PessoaController } from '../controllers/PessoaController';

import { BairroController } from "../controllers/BairroController";



/*const Pessoa = {
  
  "id": 6,
  "nome": "Allan teste",
  "codigo": 6,
  "telefone": null,
  "email": "rafa@meuamdddddddddddor.com",
  "enderecoId": 1,
  "createdAt": "2023-05-27T15:55:42.000Z",
  "updatedAt": "2023-05-27T15:55:42.000Z",
};
*/



function Home() {
    


    const handleClick =  async () => {
        var controller = new BairroController();
        var maior = await controller.maiorId();
        console.log(maior);


       

    };

    return (

        <div className="corpo">
            <Header></Header>

            <SelectVariants />

            <button onClick={handleClick} >cathuca</button>
            <div className="rodape"><Footer ></Footer></div>

        </div>


    );
}





export default Home;