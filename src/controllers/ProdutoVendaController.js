import { ProdutoVendaService } from '../services/ProdutoVendaService'


var produtovenda = new ProdutoVendaService();

export class ProdutoVendaController {

    async listaTodos() {
        try {
            const response = await produtovenda.listarTodos();
            console.log(response.data)
            return response.data;
            
        } catch (error) {

            console.error(error);
        }

    }
    async excluir(id) {
        try {
            const response = await produtovenda.excluir(id);
            if (response === "Registro apagado!") {

                return response;
            }
        } catch (error) {

            console.error(error);
        }
    }


    async buscaPorCidade(id) {
        try {
            const response = await produtovenda.buscaPorCidade(id);
            console.log(response.data);
            return response.data;
                
            
        } catch (error) {

            console.error(error);
        }
    }

    async maiorId(){
        try{
            const response = await produtovenda.maiorId();
            console.log(response);
            return response.data;
        } catch (error) {
            
            console.error(error);
        }
    }

    async inserir(Object){
        try {
            const response = await produtovenda.inserer(Object);
            console.log(response);
            if(response.data.mensagem === "Venda cadastrado com sucesso!"){
            
            
            return response.data.mensagem; 
            }
        } catch (error) {
            
            console.error(error);
        }
    }



}