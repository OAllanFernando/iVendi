import { VendaService } from '../services/VendaService'


var venda = new VendaService();

export class VendaController {

    async listaTodos() {
        try {
            const response = await venda.listarTodos();
            console.log(response.data)
            return response.data;
            
        } catch (error) {

            console.error(error);
        }

    }
    async excluir(id) {
        try {
            const response = await venda.excluir(id);
            if (response === "Registro apagado!") {

                return response;
            }
        } catch (error) {

            console.error(error);
        }
    }


    async buscaPorCidade(id) {
        try {
            const response = await venda.buscaPorCidade(id);
            console.log(response.data);
            return response.data;
                
            
        } catch (error) {

            console.error(error);
        }
    }

    async maiorId(){
        try{
            const response = await venda.maiorId();
            
            return response.data;
        } catch (error) {
            
            console.error(error);
        }
    }

    async inserir(Object){
        try {
            const response = await venda.inserer(Object);
            console.log(response);
            if(response.data.mensagem === "Venda cadastrado com sucesso!"){
            
            
            return response.data.mensagem; 
            }
        } catch (error) {
            
            console.error(error);
        }
    }



}