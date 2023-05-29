import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CidadeController } from '../../controllers/CidadeController'
import { BairroController } from '../../controllers/BairroController'
import { useState } from 'react';

const controllerBairro = new BairroController();
const controller = new CidadeController();
var dados;
var dadosBairro;

//basca dados das cidades ao abrir o comporennte
dados = await controller.listaTodos();
dadosBairro = await controllerBairro.listaTodos();







export default function ComboBeC() {

    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');

    const handleChange = async (event) => {
        setCidade(event.target.value);
        console.log(event.target.value);

        dadosBairro = await controllerBairro.buscaPorCidade(event.target.value);
        console.log('');
        //dou esse set para atualizar o combo bairro sem ele só atualiza depois de cluicar em um
        setBairro(Object)
    };

    const handleChangeBairro = async (event) => {
        setBairro(event.target.value);
    };

    return (
        <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 190 }}>
                <InputLabel id="cidade">Cidade</InputLabel>
                <Select
                    labelId="cidade"
                    id="cidade"
                    value={cidade}
                    onChange={handleChange}
                    label="Cidade"
                    defaultValue='1'
                >
                    {dados.cidades.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.nome}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ m: 1, minWidth: 190 }}>
                <InputLabel id="bairro">Bairro</InputLabel>
                <Select
                    labelId="bairro"
                    id="bairro"
                    value={bairro}
                    onChange={handleChangeBairro}
                >
                    {dadosBairro.bairros.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.nome}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}