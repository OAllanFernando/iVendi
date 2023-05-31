import { PessoaController } from "../controllers/PessoaController";
import AbaLateral from '../components/transitores/AbaLateral'
import ComboCidade from "../components/comboBox/comboCidade";
import ComboBairro from "../components/comboBox/comboBairro";



const venda = new PessoaController();

const pessoa =  {
    id: 1,
    nome: 'novoNoe',
    telefone: '4445555'
}

async function handle(){
    
    var dado = await venda.buscaPorCidade(1);
    var dado1 = await venda.listaTodos();
    
    console.log(dado);
    console.log(dado1);

}

function About() {
    return (
        <body><div className="App">
        
         </div>
        <button onClick={handle}>Mostra</button>
        <ComboCidade />
        <ComboBairro />
        <AbaLateral />
        </body>
      
  
        
     
    );
  }

  export default About;