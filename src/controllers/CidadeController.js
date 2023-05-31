import { CidadeService } from '../services/CidadeService'


var cidade = new CidadeService();

export class CidadeController {

    async listaTodos() {
        try {
            const response = await cidade.listarTodos();
          
            return response.data;
        } catch (error) {

            console.error(error);
        }

    }

    async excluir(id) {
        try {
            const response = await cidade.excluir(id);
            if (response === "Registro apagado!") {

                return response;
            }
        } catch (error) {

            console.error(error);
        }
    }


    async maiorId(){
        try{
            const response = await cidade.maiorId();
            
            return response.data;
        } catch (error) {
            
            console.error(error);
        }
    }

    async inserir(Object){
        try {
            const response = await cidade.inserer(Object);
            console.log(response);
            if(response.data.mensagem === "Cidade cadastrada com sucesso!"){
            
            
            return response.data.mensagem; 
            }
        } catch (error) {
            
            console.error(error);
        }
    }

    async buscaPorId(id) {
        try {
            const response = await cidade.buscaPorId(id);
            
            return response.data;
                
            
        } catch (error) {

            console.error(error);
        }
    }

    async alterar(Object){
        try {
            const response = await cidade.alterar(Object);
            
            if(response.data.mensagem === "Registro editado!"){
            
            
            return response.data.mensagem; 
            }
        } catch (error) {
            
            console.error(error);
        }
    }
}