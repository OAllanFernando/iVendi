
//https://mui.com/material-ui/react-text-field/
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { CidadeController } from '../../controllers/CidadeController'


const controller = new CidadeController();
var dados = Object;
try {
  dados = await controller.listaTodos();
  console.log(dados);
} catch (error) {
  console.error(error);
}


export default function ComboCidade() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      
      
      <div>
        <TextField
          id="cidade"
          select
          label="Cidades"
          defaultValue=""
          helperText="Escolha a cidade"
          variant="standard"
        >
          {dados.cidades.map((option) => (
            <MenuItem key={option.id} value={option.sigla}>
              {option.nome}
            </MenuItem>
          ))}
        </TextField>
        
      </div>
    </Box>
  );
}