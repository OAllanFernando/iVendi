import { PessoaService } from '../services/PessoaService'


var pessoa = new PessoaService();

export class PessoaController {

    async listaTodos() {
        try {
            const response = await pessoa.listarTodos();
            console.log("estou aqui amigo allan");
            return response.data;
        } catch (error) {
            // Handle any errors that occurred during the promise execution
            console.error(error);
        }
 
}



}