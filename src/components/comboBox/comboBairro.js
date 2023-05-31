
//https://mui.com/material-ui/react-text-field/
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { BairroController } from '../../controllers/BairroController'


const controller = new BairroController();

try {
  var dados = await controller.listaTodos();
  console.log(dados);
} catch (error) {
  console.error(error);
}

export default function ComboBairro() {
  return (
    <Box
      component="form" sx={{  '& .MuiTextField-root': { m: 1, width: '25ch' }, }}  noValidate autoComplete="off" >
     <div>
        <TextField id="bairro"    select label="Bairros" defaultValue=""helperText="Escolha o bairro"  variant="standard">
          {dados.bairros.map((option) => (
            <MenuItem key={option.id}>
              {option.nome}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
}