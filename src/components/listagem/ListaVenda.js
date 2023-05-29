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





import { VendaController } from '../../controllers/VendaController';

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
const controller = new VendaController();
var dados = Object;
try {
  dados = await controller.listaTodos();
  
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
              <StyledTableCell align="right">Itens</StyledTableCell>
              <StyledTableCell align="right">Cliente</StyledTableCell>
              <StyledTableCell align="right">Data</StyledTableCell>
              <StyledTableCell align="right">Total</StyledTableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>

            {dados.vendas.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.codigo}
                </StyledTableCell>
                <StyledTableCell align="right">{row.nome}</StyledTableCell>
                <StyledTableCell align="right">{row.Pessoa.nome}</StyledTableCell>
                
                <StyledTableCell align="right">{row.createdAt}</StyledTableCell>
                
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>

      </TableContainer>


    </div>
  );
}