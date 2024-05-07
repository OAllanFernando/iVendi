import { TextField, Fab } from "@mui/material"
import { BairroController } from "../../controllers/BairroController";
import React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { CidadeController } from '../../controllers/CidadeController';
import '../../styles/transitores.css'
import { Alert } from "@mui/material";
import { useState } from "react";

const bairro = new BairroController();
var maiorId = await bairro.maiorId() || 0;




// combo box
const controller = new CidadeController();
var dados = Object;
var cidadeId;
try {
    dados = await controller.listaTodos();

} catch (error) {
    console.error(error);
}
const escolha = async (event) => {
    cidadeId = event.target.value;

};

export default function CadastroBairro() {
    const [bairroCadastrado, setBairroCadastrado] = useState(false);

    async function pegaDados() {
        const codigo = document.getElementById('codigo').value;
        const nome = document.getElementById('nome').value;

        const bairroNovo = {
            codigo: codigo,
            nome: nome,
            cidadeId: cidadeId
        }

        await bairro.inserir(bairroNovo).then((response) => {
            if (response === "Bairro cadastrado com sucesso!") {
                console.log('to aqui')
                setBairroCadastrado(true);

            }
        });

    }
    return (
        <div >
            {bairroCadastrado && (
                <Alert severity="success">Bairro cadastrado com sucesso!</Alert>
            )}
            <form >
                <div className="centro"><label >Insira os dados do bairro:</label></div>
                <div className="centro"><TextField id="codigo" label="Codigo" variant="standard" type="number" defaultValue={maiorId.maiorId + 1} /></div>
                <div className="centro"><TextField id="nome" label="Nome" variant="standard" /></div>

                <div className="centro"> <Box

                    sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}
                    noValidate
                    autoComplete="off">
                    <div>
                        <TextField
                            id="cidade"
                            select
                            label="Cidades"
                            onChange={escolha}
                            helperText="Escolha a cidade"
                            variant="standard"
                        >
                            {dados && dados.cidades.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.nome}
                                </MenuItem>
                            ))}
                        </TextField>

                    </div>
                </Box></div>
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