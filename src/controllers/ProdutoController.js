import { ProdutoService } from '../services/ProdutoService'


var produto = new ProdutoService();

export class ProdutoController {

    async listaTodos() {
        try {
            const response = await produto.listarTodos();
           
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


    async buscaPorId(id) {
        try {
            const response = await produto.buscaPorId(id);
            
            return response.data;
                
            
        } catch (error) {

            console.error(error);
        }
    }

    async maiorId(){
        try{
            const response = await produto.maiorId();
            
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

    async alterar(Object){
        try {
            const response = await produto.alterar(Object);
            
            if(response.data.mensagem === "Registro editado!"){
            
            
            return response.data.mensagem; 
            }
        } catch (error) {
            
            console.error(error);
        }
    }



}