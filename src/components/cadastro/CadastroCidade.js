import { TextField, Fab } from "@mui/material"
import { IMaskInput } from 'react-imask';
import '../../styles/transitores.css'
import { CidadeController } from "../../controllers/CidadeController";
import { Alert } from "@mui/material";
import { useState } from "react";

const cidade = new CidadeController();

var maiorId = await cidade.maiorId();


export default function CadastroCidade() {
    const [cidadeCadastrado, setCidadeCadastrado] = useState(false);
    const [sigla, setSigla] = useState('');

    const handleSigla = async (event) => {
        setSigla(event.target.value);
    }
    async function pegaDados() {
        const codigo = document.getElementById('codigo').value;
        const nome = document.getElementById('nome').value;
        

        const cidadeNova = {
            codigo: codigo,
            nome: nome,
            sigla: sigla
        }

        await cidade.inserir(cidadeNova).then((response) => {
            if (response === "Cidade cadastrada com sucesso!") {
                setCidadeCadastrado(true);
                
            }

        })
    }

    return (
        <div >
            {cidadeCadastrado && (
                <Alert severity="success">Cidade cadastrado com sucesso!</Alert>
            )}

            <form >
                <div className="centro"><label >Insira os dados da cidade:</label></div>
                <div className="centro"><TextField id="codigo" label="Codigo" variant="standard" type="number" defaultValue={maiorId.maiorId + 1} /></div>
                <div className="centro"><TextField id="nome" label="Nome" variant="standard" /></div>
                <div className="centro"><TextField id="sigla" label="Sigla" variant="standard"  value={sigla} onChange={handleSigla} InputProps={{ inputComponent: IMaskInput, inputProps: { mask: 'aa' } }} /></div>


                <div className="centro">
                    <Fab variant="extended" color="error" aria-label="add" type="reset" >

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