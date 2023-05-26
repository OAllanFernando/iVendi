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



import { PessoaController } from '../../controllers/PessoaController';

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



 const handleDelete = () => {
    
    console.log("Deletado");
  };
  function handleEdit() {
    console.log("Editado")
  }

// instancio o controlador e tento 
const controller = new PessoaController();
var dados = Object;
try {
  dados = await controller.listaTodos();
  console.log(dados);
} catch (error) {
  console.error(error);
}



export default function ListaCliente() {
  
 




  return (

    <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Código</StyledTableCell>
            <StyledTableCell align="right">Nome</StyledTableCell>
            <StyledTableCell align="right">Telefone</StyledTableCell>
            <StyledTableCell align="right">Cidade</StyledTableCell>
            <StyledTableCell align="right">Cadastrado Em</StyledTableCell>

            <StyledTableCell align="right">Ações</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {dados.pessoas.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.codigo}
              </StyledTableCell>
              <StyledTableCell align="right">{row.nome}</StyledTableCell>
              <StyledTableCell align="right">{row.telefone}</StyledTableCell>
              <StyledTableCell align="right">{row.Endereco.Bairro.Cidade.nome}</StyledTableCell>
              <StyledTableCell align="right">{row.createdAt}</StyledTableCell>
              <StyledTableCell align="right"><Button variant="contained" color="primary" onClick={() => handleEdit(row.id)}>Editar</Button>
                <Button variant="contained" color="error" onClick={() => handleDelete(row.id)}>Excluir</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
   
    </TableContainer>
    
    
    </div>
  );
}