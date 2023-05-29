import { EnderecoService } from '../services/EnderecoService'


var endereco = new EnderecoService();

export class EnderecoController {

    async listaTodos() {
        try {
            const response = await endereco.listarTodos();
            
            return response.data;
        } catch (error) {
           
            console.error(error);
        }
 
}

    async excluir(id){
        try {
            const response = await endereco.excluir(id);
            if(response === "Registro apagado!"){
           
            return response; 
            }
        } catch (error) {
           
            console.error(error);
        }
    }

    

    async inserir(Object){
        try {
            const response = await endereco.inserer(Object);
            
            if(response.mensagem === "Endereco cadastrado com sucesso!"){
            
            
            return response.mensagem; 
            }
        } catch (error) {
            
            console.error(error);
        }
    }

    async maiorId(){
        try{
            const response = await endereco.maiorId();
            
            return response.data;
        } catch (error) {
            
            console.error(error);
        }
    }

    
        



    



}