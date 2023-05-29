
//https://mui.com/material-ui/react-text-field/
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { PessoaController } from '../../controllers/PessoaController'


const controller = new PessoaController();
var dados = Object;
try {
  dados = await controller.listaTodos();
  console.log(dados);
} catch (error) {
  console.error(error);
}


export default function ComboCliente() {
  return (
    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">

      <div>
        <TextField id="cliente" select label="Clientes" defaultValue="" helperText="Escolha o cliente" variant="standard"  >
          {dados.pessoas.map((option) => (
            <MenuItem
              key={option.id}
              value={option.id}>
              {option.nome}
            </MenuItem>
          ))}
        </TextField>

      </div>
    </Box>
  );
}