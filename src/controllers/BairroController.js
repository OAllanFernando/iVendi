import { BairroService } from '../services/BairroService'


var bairro = new BairroService();

export class BairroController {

    async listaTodos() {
        try {
            const response = await bairro.listarTodos();
            
            return response.data;
        } catch (error) {

            console.error(error);
        }

    }
    async excluir(id) {
        try {
            const response = await bairro.excluir(id);
            if (response === "Registro apagado!") {

                return response;
            }
        } catch (error) {

            console.error(error);
        }
    }


    async buscaPorCidade(id) {
        try {
            const response = await bairro.buscaPorCidade(id);
            console.log(response.data);
            return response.data;
                
            
        } catch (error) {

            console.error(error);
        }
    }

    async maiorId(){
        try{
            const response = await bairro.maiorId();
            
            return response.data;
        } catch (error) {
            
            console.error(error);
        }
    }

    async inserir(Object){
        try {
            const response = await bairro.inserer(Object);
            console.log(response);
            if(response.data.mensagem === "Bairro cadastrado com sucesso!"){
            
            
            return response.data.mensagem; 
            }
        } catch (error) {
            
            console.error(error);
        }
    }


    async buscaPorId(id) {
        try {
            const response = await bairro.buscaPorId(id);
            
            return response.data;
                
            
        } catch (error) {

            console.error(error);
        }
    }


    async alterar(Object){
        try {
            const response = await bairro.alterar(Object);
            
            if(response.data.mensagem === "Registro editado!"){
            
            
            return response.data.mensagem; 
            }
        } catch (error) {
            
            console.error(error);
        }
    }


}