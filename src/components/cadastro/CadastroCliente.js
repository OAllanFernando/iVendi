import { TextField, Fab } from "@mui/material"
import { IMaskInput } from 'react-imask';
import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { PessoaController } from "../../controllers/PessoaController";
import '../../styles/transitores.css'
import { EnderecoController } from "../../controllers/EnderecoController";
import { CidadeController } from '../../controllers/CidadeController'
import { BairroController } from '../../controllers/BairroController'
import { useState } from 'react';
import { Alert } from "@mui/material";




const pessoa = new PessoaController();
const endereco = new EnderecoController();

const controllerBairro = new BairroController();
const controller = new CidadeController();
var dados;
var dadosBairro;

//basca dados das cidades ao abrir o componente
dados = await controller.listaTodos() ;
dadosBairro = await controllerBairro.listaTodos();
console.log(dadosBairro)





var maiorIdPessoa = await pessoa.maiorId() || 0;
var maiorIdEndereco = await endereco.maiorId() || 0;

var bairroEscolhido;

export default function CadastroCliente() {
    const [clienteCadastrado, setClienteCadastrado] = useState(false);
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cep, setCep] = useState('');

    const handleChangeTelefone = async (event) => {
        setTelefone(event.target.value);
    }
    const handleChangeCep = async (event) => {
        setCep(event.target.value);
    }

    const handleChange = async (event) => {
        setCidade(event.target.value);
        console.log(event.target.value);

        
        await controllerBairro.buscaPorCidade(event.target.value).then((response)=> {
            if(response === undefined){
                dadosBairro = { bairros: [{ nome: "" }] };
                console.log(dadosBairro);
                setBairro(dadosBairro)
                
            } else {
                dadosBairro = response;
                setBairro(dadosBairro)
            }
        });
        
        //dou esse set para atualizar o combo bairro sem ele só atualiza depois de cluicar em um
        
    };

    const handleChangeBairro = async (event) => {
        setBairro(event.target.value);
        bairroEscolhido = event.target.value;
    };

    async function pegaDados() {


        const rua = document.getElementById('rua').value;
        const complemento = document.getElementById('complemento').value;
        const cep = document.getElementById('cep').value;
        const numero = document.getElementById('numero').value;

        const codigo = document.getElementById('codigo').value;
        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const email = document.getElementById('email').value;



        const enderecoNovoCliente = {
            codigo: maiorIdEndereco.maiorId + 1,
            cep: cep,
            numero: numero,
            rua: rua,
            complemento: complemento,
            bairroId: bairroEscolhido

        }
        const cliente = {
            codigo: codigo,
            nome: nome,
            telefone: telefone,
            email: email,
            enderecoId: maiorIdEndereco.maiorId + 1
        }

        await endereco.inserir(enderecoNovoCliente);

        await pessoa.inserir(cliente).then((response) => {
            if (response === "Cliente cadastrado com sucesso!") {
                setClienteCadastrado(true);
            }
        });

    }


    return (
        <div >
            {clienteCadastrado && (
                <Alert severity="success">Cliente cadastrado com sucesso!</Alert>
            )}
            <form ></form>


            <form >
                <div className="centro"><label >Insira os dados do cliente:</label></div>
                <div className="centrodados">
                    <TextField id="codigo" label="Codigo" variant="standard" type="number" defaultValue={maiorIdPessoa.maiorId + 1} />
                    <TextField id="nome" label="Nome" variant="standard" />

                </div>

                <div className="centrodados">
                    <TextField id="telefone" label="Telefone" variant="standard" value={telefone} InputProps={{ inputComponent: IMaskInput, inputProps: { mask: '(00)0 0000-0000' } }} onChange={handleChangeTelefone}/>
                    <TextField id="email" label="E-mail" variant="standard" />
                </div>
                <div className="centro"><label >Endereço:</label></div>
                <div className="centrodados">
                    <div>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 190 }}>
                            <InputLabel id="cidade">Cidade</InputLabel>
                            <Select
                                labelId="cidade"
                                id="cidade"
                                value={cidade}
                                onChange={handleChange}
                                label="Cidade"

                            >
                                {dados && dados.cidades.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl variant="standard" sx={{ m: 1, minWidth: 190 }}>
                            <InputLabel id="bairro">Bairro</InputLabel>
                            <Select  labelId="bairro"   id="bairro" value={bairro} onChange={handleChangeBairro} >
                                {dadosBairro && dadosBairro.bairros.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>



                </div>
                <div className="centrodados">
                    <TextField id="cep" label="Cep" variant="standard" value={cep} InputProps={{ inputComponent: IMaskInput, inputProps: { mask: '00000-000' } }} onChange={handleChangeCep}/>
                    <TextField id="numero" label="Número" variant="standard" type="number" />

                </div>
                <div className="centrodados">
                    <TextField id="rua" label="Rua" variant="standard" sx={{ m: 1, width: '44ch' }} />

                </div>
                <div className="centrodados">

                    <TextField id="complemento" label="Complemento" variant="standard" sx={{ m: 1, width: '44ch' }} />

                </div>

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







