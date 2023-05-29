import { PessoaService } from '../services/PessoaService'


var pessoa = new PessoaService();

export class PessoaController {

    async listaTodos() {
        try {
            const response = await pessoa.listarTodos();
            console.log(response.data)
            return response.data;
        } catch (error) {
           
            console.error(error);
        }
 
}

    async excluir(id){
        try {
            const response = await pessoa.excluir(id);
            if(response === "Registro apagado!"){
           
            return response; 
            }
        } catch (error) {
           
            console.error(error);
        }
    }

    

    async inserir(Object){
        try {
            const response = await pessoa.inserer(Object);
            
            if(response.data.mensagem === "Cliente cadastrado com sucesso!"){
            
            
            return response.data.mensagem; 
            }
        } catch (error) {
            
            console.error(error);
        }
    }

    
    async maiorId(){
        try{
            const response = await pessoa.maiorId();
            
            return response.data;
        } catch (error) {
            
            console.error(error);
        }
    }



    



}