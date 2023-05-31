import { PessoaService } from '../services/PessoaService'


var pessoa = new PessoaService();

export class PessoaController {

    async listaTodos() {
        try {
            const response = await pessoa.listarTodos();
            
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

    async buscaPorId(id) {
        try {
            const response = await pessoa.buscaPorId(id);
            
            return response.data;
                
            
        } catch (error) {

            console.error(error);
        }
    }


    async alterar(Object){
        try {
            const response = await pessoa.alterar(Object);
            
            if(response.data.mensagem === "Registro editado!"){
            
            
            return response.data.mensagem; 
            }
        } catch (error) {
            
            console.error(error);
        }
    }


    async buscaPorCidade(id) {
        try {
            const response = await pessoa.buscaPorCidade(id);
            
            return response.data;
                
            
        } catch (error) {

            console.error(error);
        }
    }

    async buscaPorBairro(id) {
        try {
            const response = await pessoa.buscaPorBairro(id);
            
            return response.data;
                
            
        } catch (error) {

            console.error(error);
        }
    }

    async buscaPorNome(nome) {
        try {
            const response = await pessoa.buscaPorNome(nome);
            
            return response.data;
                
            
        } catch (error) {

            console.error(error);
        }
    }

}