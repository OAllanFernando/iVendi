//https://mui.com/material-ui/react-table/#api
import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import ClienteEditor from '../editores/ClienteEditor';
import { useState } from 'react';
import { PessoaController } from '../../controllers/PessoaController';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { TextField } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import MenuItem from '@mui/material/MenuItem';
import { CidadeController } from '../../controllers/CidadeController'
import { BairroController } from '../../controllers/BairroController';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// instancio o controlador e tento 
const controller = new PessoaController();
const controllerCidade = new CidadeController();
const controllerBairro = new BairroController();




try {
  var dados = await controller.listaTodos();
  //filtro
  var dadosCidade = await controllerCidade.listaTodos();
  var dadosBairro = await controllerBairro.listaTodos();
  //
} catch (error) {
  console.error(error);
}


const handleDelete = (id) => {
  // exclui e recarrega a página 
  controller.excluir(id).then(() => {
    window.location.reload();

  })
    .catch((error) => {
      console.error(error);
    });

};



export default function ListaCliente() {
  const [openEditor, setOpenEditor] = useState(false);
  const [cliente, setCliente] = useState(null);
  const [semDado, setSemDado] = React.useState(false);

  //Filtro
  //att a lista
  const [dadoFiltro, setDadoFiltro] = useState(dados.pessoas);

  const [nome, setNome] = React.useState(false);
  const [bairro, setBairro] = React.useState(false);
  const [cidade, setCidade] = React.useState(false);

  const [cidadeEscolha, setCidadeEscolha] = React.useState('');
  const [bairroEscolha, setBairroEscolha] = React.useState('');

  const [abreAba, setAbreAba] = useState(false);

  const handleAbreAba = () => {
    setSemDado(false);
    setAbreAba(true);
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

  async function handleFiltro() {
    let filtrado = dados.pessoas;
    console.log(cidade);
    const nomeEscolhido = document.getElementById('nome').value;
   
    if (nome) {
      await controller.buscaPorNome(nomeEscolhido).then((response) => {
        if (response === undefined) {
          console.log(response)
          setSemDado(true);
        } else{
          console.log(response)
          filtrado = response;
          setDadoFiltro(filtrado.pessoas);
        }
      })
    }

    if (cidade) {
      await controller.buscaPorCidade(cidadeEscolha).then((response) => {
        if (response === undefined) {
          console.log(response)
          setSemDado(true);
        } else{
          console.log(response)
          filtrado = response;
          setDadoFiltro(filtrado.pessoas);
        }
      })
    }

    if (bairro) {
      await controller.buscaPorBairro(bairroEscolha).then((response) => {
        if (response === undefined) {
          console.log(response)
          setSemDado(true);
        } else{
          console.log(response)
          filtrado = response;
          setDadoFiltro(filtrado.pessoas);
        }
      })
    }


    
    
    setAbreAba(false);
  }

  function handleCloseEditor() {

    setAbreAba(false);
  }






  // fim do filtro


  async function handleEdit(id) {
    setOpenEditor(true);
    const cliente = await controller.buscaPorId(id);
    console.log(cliente);
    setCliente(cliente);
  }
  function handleCloseEditor() {
    setOpenEditor(false);
  }






  return (

    <div>
      {semDado && (
        <Alert severity="info">Nenhum cliente no filtro selecionado!</Alert>
      )}
      <div>
        <ClienteEditor open={openEditor} onClose={handleCloseEditor} cliente={cliente} />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Código</StyledTableCell>
              <StyledTableCell align="right">Nome</StyledTableCell>
              <StyledTableCell align="right">Telefone</StyledTableCell>
              <StyledTableCell align="right">Cidade</StyledTableCell>
              <StyledTableCell align="right">Cadastrado Em</StyledTableCell>

              <StyledTableCell align="right"><Button align="right" variant="contained" startIcon={<FilterAltIcon />} color="primary" onClick={handleAbreAba}>Filtro </Button>Ações</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {dadoFiltro.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.codigo}
                </StyledTableCell>
                <StyledTableCell align="right">{row.nome}</StyledTableCell>
                <StyledTableCell align="right">{row.telefone}</StyledTableCell>
                <StyledTableCell align="right">{row.Endereco.Bairro.Cidade.nome}</StyledTableCell>
                <StyledTableCell align="right">{row.createdAt}</StyledTableCell>
                <StyledTableCell align="right"><Button variant="contained" color="primary" onClick={() => handleEdit(row.id)}>Editar</Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(row.id)} >Excluir</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))

            }
          </TableBody>
        </Table>

      </TableContainer>


      <div>
        {abreAba && (


          <SwipeableDrawer

            open={abreAba}
            onClose={() => setAbreAba(false)}
            onOpen={() => setAbreAba(true)}
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


              <Button variant="contained" color="primary" onClick={handleFiltro} >Buscar</Button>
            </div>
          </SwipeableDrawer>


        )}
      </div>
    </div>
  );
}