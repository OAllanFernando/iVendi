import axios  from 'axios';

export class ProdutoVendaService{
    
    url = process.env.REACT_APP_URL_NODE_API+'produtovenda';

    listarTodos(){
        return axios.get(this.url);
    }

    inserer(objeto){
        return axios.post(this.url,objeto);
    }

    alterar(objeto){
        return axios.put(this.url,objeto);
    }
    
    excluir(id){
        return axios.delete(this.url+"/"+id);
    }
    maiorId(){
        return axios.get(this.url+"maior");
    }

}