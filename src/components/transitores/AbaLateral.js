// https://mui.com/material-ui/react-drawer/
//https://mui.com/material-ui/react-tabs/
import React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import MenuItem from '@mui/material/MenuItem';
import { CidadeController } from '../../controllers/CidadeController'

import Box from '@mui/material/Box';
import { BairroController } from '../../controllers/BairroController';


const controllerCidade = new CidadeController();
const controllerBairro = new BairroController()

try {
    var dadosCidade = await controllerCidade.listaTodos();
    var dadosBairro = await controllerBairro.listaTodos();

} catch (error) {
    console.error(error);
}

export default function SwipeableTemporaryDrawer() {
    const [state, setState] = React.useState({ left: false, });
    const [nome, setNome] = React.useState(false);
    const [bairro, setBairro] = React.useState(false);
    const [cidade, setCidade] = React.useState(false);

    const [cidadeEscolha, setCidadeEscolha] = React.useState('');
    const [bairroEscolha, setBairroEscolha] = React.useState('');

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };


    const handleBairroEscolha = async (event) => {
        setBairroEscolha(event.target.value);

    };

    const handleCidadeEscolha = async (event) => {
        setCidadeEscolha(event.target.value);

    };

    function handleNome() {
        setBairro(false)
        setCidade(false)
        setNome(true)
    }
    function handleBairro() {
        setCidade(false)
        setNome(false)
        setBairro(true)
    }
    function handleCidade() {
        setBairro(false)
        setNome(false)
        setCidade(true)
    }
    return (
        <div>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >


                        <text className='filtro'>Filtrar por: </text>
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <Button onClick={handleNome}>Nome</Button>
                            <Button onClick={handleBairro}>Bairro</Button>
                            <Button onClick={handleCidade}>Cidade</Button>
                        </ButtonGroup>



                        {nome && (
                            <TextField id="nome" label="Nome" variant="standard" />

                        )}
                        {cidade && (

                            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} noValidate autoComplete="off" >
                                <div>
                                    <TextField id="cidade" select label="Cidades" value={cidadeEscolha} onChange={handleCidadeEscolha} helperText="Escolha a cidade" variant="standard" >
                                        {dadosCidade.cidades.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.nome}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                </div>
                            </Box>
                        )}

                        {bairro && (
                            <Box
                                component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} noValidate autoComplete="off" >
                                <div>
                                    <TextField id="bairro" select label="Bairros" value={bairroEscolha} onChange={handleBairroEscolha} helperText="Escolha o bairro" variant="standard">
                                        {dadosBairro.bairros.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.nome}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </Box>

                        )}



                        <div className='centro'>


                            <Button variant="contained" color="primary" >Buscar</Button>
                        </div>
                    </SwipeableDrawer>

                </React.Fragment>
            ))}
        </div>
    );
}

