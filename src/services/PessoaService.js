import axios  from 'axios';

export class PessoaService{
    
    url = process.env.REACT_APP_URL_NODE_API+'/pessoa';

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
        return axios.delete(this.url+id);
    }

}