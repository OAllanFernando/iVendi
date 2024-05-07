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
import { useState } from 'react';
import { ProdutoController } from '../../controllers/ProdutoController';
import ProdutoEditor from '../editores/ProdutoEditor';








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
const controller = new ProdutoController();
var dados = Object;
try {
  dados = await controller.listaTodos() || [];
  

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


export default function ListaProduto() {
  const [openEditor, setOpenEditor] = useState(false);
  const [produto, setProduto] = useState(null);


  


  async function handleEdit(id) {
    setOpenEditor(true);
    const produto = await controller.buscaPorId(id) || [];
    console.log(produto);
    setProduto(produto);
  }
  function handleCloseEditor() {
    setOpenEditor(false);
  }
  return (

    <div>
       
      <div>
        <ProdutoEditor open={openEditor} onClose={handleCloseEditor} produto={produto} />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Código</StyledTableCell>
              <StyledTableCell align="right">Nome</StyledTableCell>
              <StyledTableCell align="right">Preço</StyledTableCell>

              <StyledTableCell align="right">Cadastrado Em</StyledTableCell>

              <StyledTableCell align="right">Ações</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            { dados.produtos && dados.produtos.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.codigo}
                </StyledTableCell>
                <StyledTableCell align="right">{row.nome}</StyledTableCell>
                <StyledTableCell align="right">{row.preco}</StyledTableCell>

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