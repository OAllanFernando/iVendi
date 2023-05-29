import { TextField, Fab } from "@mui/material"
import { useState } from 'react';
import { Alert } from "@mui/material";




import '../../styles/transitores.css'
import { ProdutoController } from "../../controllers/ProdutoController";

const produto = new ProdutoController();

var maiorId = await produto.maiorId();

export default function CadastroProduto() {
    const [produtoCadastrado, setProdutoCadastrado] = useState(false);

    async function pegaDados() {
        const codigo = document.getElementById('codigo').value;
        const nome = document.getElementById('nome').value;
        const preco = document.getElementById('preco').value;

        const produtoNovo = {
            codigo: codigo,
            nome: nome,
            preco: preco
        }


        produto.inserir(produtoNovo).then((response) => {
            if (response === "Produto cadastrado com sucesso!") {
                setProdutoCadastrado(true);
            }
        });
    }

    return (
            <div >
                {produtoCadastrado && (
                    <Alert severity="success">Produto cadastrado com sucesso!</Alert>
                )}
                <form >
                    <div className="centro"><label >Insira os dados do produto:</label></div>
                    <div className="centro"><TextField id="codigo" label="Codigo" variant="standard" type="number" defaultValue={maiorId.maiorId + 1} /></div>
                    <div className="centro"><TextField id="nome" label="Nome" variant="standard" /></div>

                    <div className="centro"><TextField id="preco" label="Preço" variant="standard" type="number" /></div>


                    <div className="centro">
                        <Fab variant="extended" color="error" aria-label="add" type="reset">

                            Cancelar
                        </Fab>
                        <Fab variant="extended" color="primary" aria-label="add" onClick={pegaDados}>

                            Cadastrar
                        </Fab>


                    </div>
                </form>

            </div>
        )
    }