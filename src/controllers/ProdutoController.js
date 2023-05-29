import { ProdutoService } from '../services/ProdutoService'


var produto = new ProdutoService();

export class ProdutoController {

    async listaTodos() {
        try {
            const response = await produto.listarTodos();
            console.log(response.data)
            return response.data;
            
        } catch (error) {

            console.error(error);
        }

    }
    async excluir(id) {
        try {
            const response = await produto.excluir(id);
            if (response === "Registro apagado!") {

                return response;
            }
        } catch (error) {

            console.error(error);
        }
    }


    async buscaPorCidade(id) {
        try {
            const response = await produto.buscaPorCidade(id);
            console.log(response.data);
            return response.data;
                
            
        } catch (error) {

            console.error(error);
        }
    }

    async maiorId(){
        try{
            const response = await produto.maiorId();
            console.log(response);
            return response.data;
        } catch (error) {
            
            console.error(error);
        }
    }

    async inserir(Object){
        try {
            const response = await produto.inserer(Object);
            console.log(response);
            if(response.data.mensagem === "Produto cadastrado com sucesso!"){
            
            
            return response.data.mensagem; 
            }
        } catch (error) {
            
            console.error(error);
        }
    }



}