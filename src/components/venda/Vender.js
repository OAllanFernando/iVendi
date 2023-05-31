
//https://mui.com/material-ui/react-text-field/

//https://www.youtube.com/watch?v=2ZWUPtHTPEg para logica do carrinho

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { ProdutoController } from '../../controllers/ProdutoController'
import { Button, TableFooter } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import '../../styles/transitores.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { PessoaController } from '../../controllers/PessoaController';
import { VendaController } from '../../controllers/VendaController';
import { ProdutoVendaController } from '../../controllers/ProdutoVendaController';
import { Alert } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
    [`&.${tableCellClasses.footer}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
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



const controllerPessoa = new PessoaController();
const controllerProduto = new ProdutoController();
const controllerVenda = new VendaController();
const controllerProdutoVenda = new ProdutoVendaController();


var produtoDinamico = Object;
var dadosPessoa = Object;
var dadosProduto = Object;
let totalPedido = 0.0;

const dataAtual = new Date();
const dataLocal = dataAtual.toISOString().substring(0, 16);

var maiorId = await controllerVenda.maiorId();
try {
    dadosPessoa = await controllerPessoa.listaTodos();
    
} catch (error) {
    console.error(error);
}
try {
    dadosProduto = await controllerProduto.listaTodos();
    
} catch (error) {
    console.error(error);
}




export default function Vender() {
    const [quantidade, setQuantidade] = useState(1);
    const [total, setTotal] = useState(0);
    const [valorProduto, setValorProduto] = useState(0);
    const [cliente, setIdCliente] = useState('');
    const [carrinho, setCarrinho] = useState([]);

    const [inserirNulo, setInserirNulo] = useState(false);


    
    

    // campos de venda
    const handleChange = async (event) => {
        setInserirNulo(false);
        await controllerProduto.buscaPorId(event.target.value).then((response) => {
            produtoDinamico = response.produtos[0];
            setValorProduto(response.produtos[0].preco);
        });
    };
    const handleChangeQuantidade = async (event) => {
        setQuantidade(event.target.value);
    };
    const handleChangeValor = async (event) => {
        setValorProduto(event.target.value);
    };
    const handleChangeTotal = () => {
        const novoTotal = valorProduto * quantidade;
        setTotal(novoTotal);
    };
    // utilizado para verificar mudanças nos valores, se tiver ele atualiza o handlechancgeTotal
    useEffect(() => {
        handleChangeTotal();
    });

    //cliente
    const handleClienteChange = (event) => {
        console.log(event.target.value)
        setIdCliente(event.target.value);
    };

    const handleLimpar = (event) => {
        window.location.reload();
    };

// carrinho
    async function addCarrinho() {
        if (produtoDinamico.nome === undefined) {
            return setInserirNulo(true);

        }
        const quantidade = document.getElementById('quantidade').value;
       
        const itemNovo = {
            quantidade: quantidade,
            produtoId: produtoDinamico,
            total: total
        }
        totalPedido += total;
        // ... faz uma copia do carrinho anterior
        const novoCarrinho = [...carrinho, itemNovo];
        
        setCarrinho(novoCarrinho);


    }

// venda
    const handleVenda = async (event) => {
        if(carrinho.length === 0){
            return setInserirNulo(true);
        } 
        const data = document.getElementById('data').value;
        const codigo = document.getElementById('codigo').value;
        const total = document.getElementById('total').value;

        var vendaNova = Object;

        if(cliente === ""){
            vendaNova = {
                codigo: codigo,
                createdAt: data,
                total: total
            }
        } else {
            vendaNova = {
            codigo: codigo,
            createdAt: data,
            pessoaId: cliente,
            total: total
        }
        }
        console.log(vendaNova);
        
        await controllerVenda.inserir(vendaNova);

            carrinho.forEach(async element => {
               
                const produtoAoInserir = {
                    codigo: +codigo,
                    quantidade: +element.quantidade,
                    produtoId: element.produtoId.id,
                    vendaId: maiorId.maiorId + 1,
                  
                }
                console.log(produtoAoInserir);
               await  controllerProdutoVenda.inserir(produtoAoInserir);
                
            });
        
    }


    const handleDelete = (index) => {
        let valorSub = carrinho[index].total;
        totalPedido = totalPedido - valorSub;
        console.log(totalPedido);
        
        //CÓPIA DO CARRINHO  anterior e depois atualiza no setCarrinho para atualizar natela
        const novoCarrinho = [...carrinho];
        novoCarrinho.splice(index, 1);
        setCarrinho(novoCarrinho);


    };
  


    return (

        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">
            {inserirNulo && (
                <Alert severity="error">É preciso informar um item, tente novamente</Alert>
            )}

            <div className='centro'>
                <TextField id="data" label="Data" variant="standard" type="datetime-local" defaultValue={dataLocal} />
                <TextField id="codigo" label="Codigo da venda" variant="standard" type="number" defaultValue={maiorId.maiorId + 1} />
                <TextField id="cliente" select label="Clientes" defaultValue="0" helperText="Escolha o cliente" variant="standard" onChange={handleClienteChange} >
                    {dadosPessoa.pessoas.map((option) => (
                        <MenuItem
                            key={option.id}
                            value={option.id}>
                            {option.nome}
                        </MenuItem>
                    ))}
                </TextField>
            </div> <div className='centro'>
                <TextField id="produto" select label="Produtos" defaultValue="" helperText="Escolha o produto" variant="standard" onChange={handleChange}  >
                    {dadosProduto.produtos.map((option) => (
                        <MenuItem key={option.id} value={option.id}>{option.nome}

                        </MenuItem>
                    ))}
                </TextField>
                <TextField helperText="Fracionado ou unidade" id="quantidade" label="Quantidade" type='number' variant="standard" value={quantidade} onChange={handleChangeQuantidade} />
                <TextField id="valor" label="valor unitário" variant="standard" type='number' value={valorProduto} onChange={handleChangeValor} />
                <TextField id="total" label="Total:" variant="standard" value={total} onChange={handleChangeTotal} />
                <div>
                    
                    <Button variant="contained" color="success" startIcon={<AddShoppingCartIcon />} onClick={addCarrinho}>Inserir</Button>
                </div>

            </div>


            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Produto</StyledTableCell>
                            <StyledTableCell align="right">Quantidade</StyledTableCell>
                            <StyledTableCell align="right">Valor Un.</StyledTableCell>
                            <StyledTableCell align="right">Total</StyledTableCell>
                            <StyledTableCell align="right">Ações</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {carrinho.map((row, index) => (

                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row"> {row.produtoId.nome}</StyledTableCell>
                                <StyledTableCell align="right">{row.quantidade}</StyledTableCell>
                                <StyledTableCell align="right">{row.produtoId.preco}</StyledTableCell>
                                <StyledTableCell align="right">{row.total}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button variant="contained" color="error" onClick={() => handleDelete(index, row.produtoId.total)} startIcon={<DeleteSweepIcon />}></Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell align="right">Valor Total: {totalPedido}</StyledTableCell>
                            <StyledTableCell align="right"><Button variant="contained" color="error" onClick={handleLimpar}>Cancelar Venda</Button>
                                <Button variant="contained" color="success" onClick={handleVenda}>Confirmar Venda</Button>
                            </StyledTableCell>

                        </TableRow>
                    </TableFooter>
                </Table>

            </TableContainer>
        </Box >

    );


}