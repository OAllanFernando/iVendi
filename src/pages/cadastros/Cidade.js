import React, { useState, useEffect, useRef } from 'react'; // Importe o useState, useEffect e useRef do pacote 'react'
import CidadeService from './services/CidadeService';
//instancia o obj
const Cidade = () => {
    let objetoNovo = {
        codigo: '',
        nome: '',
        sigla: ''

    };


    // aqui ao inves de referenciar como estado mesmo, utilizo objeto, para que nas outras entidades apenas copio
    const  [objetos, setObjetos] = useState(null);
    const [objeto, setObjeto] = useState(objetoNovo);
    const objetoService = new CidadeService();
    const toast = useRef(null);
    const [objetoDeleteDialog, setObjetoDeleteDialog] = useState(false);


    //para preencher o form
    useEffect(() => {
        objetoService.listarTodos().then(res => {
            console.log(res.data);
            setObjetos(res.data)
        });
    }, [objetos]);


    const saveObjeto = () => {
        setSubmitted(true);

        if (objeto.nome.trim()) {
            let _objeto = { ...objeto};
            if (objeto.id) {
                objetoService.alterar(_objeto).then(data => {
                    toast.current.show({severity: 'success', summary:'Sucesso', detail: 'Atualizado'})
                    setObjetos(null);
                });
            }
            else {
                objetoService.inserir(_objeto).then(data => {
                    toast.current.show({ severity: 'success', summary:'Sucesso', detail: 'Salvo'})
                });
            }
            setObjeto(objetoNovo);
        }
    }

    const editObjeto = (objeto) => {
        setObjeto(objeto);
        setObjetoDeleteDialog(true);
    }

    return (
        // Retorne o JSX do componente Cidade
        <div>
          {/* Conteúdo JSX do componente Cidade */}
        </div>
      );

}
export default Cidade;