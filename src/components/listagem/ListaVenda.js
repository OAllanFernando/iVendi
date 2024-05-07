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
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { TextField } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { Button } from '@mui/material';
import { useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import { ProdutoVendaController } from '../../controllers/ProdutoVendaController';
import { PessoaController } from '../../controllers/PessoaController';
import { ProdutoController } from '../../controllers/ProdutoController';


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
const controller = new ProdutoVendaController();
const controllerPessoa = new PessoaController();
const controllerProduto = new ProdutoController()

try {
  var dados = await controller.listaTodos() || [];
  console.log(dados)
  //filtro
  var dadosPessoa = await controllerPessoa.listaTodos();
  var dadosProduto = await controllerProduto.listaTodos();
  
} catch (error) {
  console.error(error);
}
export default function ListaVenda() {

//filtro

const [dadoFiltro, setDadoFiltro] = useState(dados.vendas || []);

const [pessoa, setPessoa] = React.useState(false);
const [produtoFiltro, setProdutoFiltro] = React.useState(false);
const [data, setData] = React.useState(false);
const [semDado, setSemDado] = React.useState(false);

const [pessoaEscolha, setPessoaEscolha] = React.useState('');
const [produtoEscolha, setProdutoEscolha] = React.useState('');
const [dataEscolha, setDataEscolha] = React.useState('');
const [dataEscolhaFinal, setDataEscolhaFinal] = React.useState('');

const [abreAba, setAbreAba] = useState(false);


const handleAbreAba = () => {
  setSemDado(false);
  setAbreAba(true);
};

const handlePessoaEscolha = async (event) => {
  setPessoaEscolha(event.target.value);

};

const handleProdutoEscolha = async (event) => {
  setProdutoEscolha(event.target.value);

};
const handleDataEscolha = async (event) => {
  setDataEscolha(event.target.value);
 console.log(dataEscolha)

};

const handleDataEscolhaFinal = async (event) => {
  setDataEscolhaFinal(event.target.value);

};

function handlePessoa() {
  setData(false)
  setProdutoFiltro(false)
  setPessoa(true)
}
function handleData() {
  setProdutoFiltro(false)
  setPessoa(false)
  setData(true)
}
function handleProdutoFiltro() {
  setData(false)
  setPessoa(false)
  setProdutoFiltro(true)
}

async function handleFiltro() {
  let filtrado = dados.vendas || [];
  

  if (pessoa) {
    await controller.buscaPorPessoa(pessoaEscolha).then((response) => {
      if (response === undefined) {
        console.log(response)
        setSemDado(true);
      } else{
        console.log(response)
        filtrado = response;
        setDadoFiltro(filtrado.vendas || []);
      }
    })
  }

  if (produtoFiltro) {
    await controller.buscaPorProduto(produtoEscolha).then((response) => {
      if (response === undefined) {
        console.log(response)
        setSemDado(true);
      } else{
        console.log(response)
        filtrado = response;
        setDadoFiltro(filtrado.vendas   || []);
      }
    })
  }

  if (data) {
    await controller.buscaPorData(dataEscolha, dataEscolhaFinal).then((response) => {
      if (response === undefined) {
        console.log(response)
        setSemDado(true);
      } else{
        console.log(response)
        filtrado = response;
        setDadoFiltro(filtrado.vendas || []);
      }
    })
  }


  
  
  setAbreAba(false);
}
  return (

    <div>
      {semDado && (
        <Alert severity="info">Nenhuma venda no filtro selecionado!</Alert>
      )}


      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Código</StyledTableCell>
              <StyledTableCell align="right">Itens</StyledTableCell>
              <StyledTableCell align="right">Cliente</StyledTableCell>
              <StyledTableCell align="right">Data</StyledTableCell>
              <StyledTableCell align="right"><Button align="right" variant="contained" startIcon={<FilterAltIcon />} color="primary" onClick={handleAbreAba}>Filtro </Button>Total</StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>

            {dadoFiltro.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th"> {row.codigo}</StyledTableCell>
                <StyledTableCell align="right">{row.Produto.nome}</StyledTableCell>
                <StyledTableCell align="right">{row.Venda.Pessoa ? row.Venda.Pessoa.nome : ""}</StyledTableCell>
                <StyledTableCell align="right">{row.createdAt}</StyledTableCell>
                <StyledTableCell align="right">{row.Venda.total}</StyledTableCell>

              </StyledTableRow>
            ))}
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
              <Button onClick={handlePessoa}>Cliente</Button>
              <Button onClick={handleData}>Data</Button>
              <Button onClick={handleProdutoFiltro}>Produto</Button>
            </ButtonGroup>



            {pessoa && (
              <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} noValidate autoComplete="off" >
                <div>
                  <TextField id="pessoa" select label="Clientes" value={pessoaEscolha} onChange={handlePessoaEscolha} helperText="Escolha o cliente" variant="standard" >
                    {dadosPessoa.pessoas.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.nome}
                      </MenuItem>
                    ))}
                  </TextField>

                </div>
              </Box>

            )}
            {produtoFiltro && (

              <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} noValidate autoComplete="off" >
                <div>
                  <TextField id="produto" select label="Produtos" value={produtoEscolha} onChange={handleProdutoEscolha} helperText="Escolha o produto" variant="standard" >
                    {dadosProduto.produtos.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.nome}
                      </MenuItem>
                    ))}
                  </TextField>

                </div>
              </Box>
            )}

            {data && (


              <div>
                <TextField id="data" variant="standard" value={dataEscolha} onChange={handleDataEscolha} type="date" />
                <TextField id="data" variant="standard"value={dataEscolhaFinal} onChange={handleDataEscolhaFinal}  type="date" />
              </div>

            )}



            <div className='centro'>


              <Button variant="contained" color="primary" onClick={handleFiltro}>Buscar</Button>
            </div>
          </SwipeableDrawer>


        )}
      </div>


    </div>
  );
}