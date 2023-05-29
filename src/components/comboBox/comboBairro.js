
//https://mui.com/material-ui/react-text-field/
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { BairroController } from '../../controllers/BairroController'


const controller = new BairroController();


export default  async function ComboBairro(id) {

var dados = Object;

if(id === null){
    try {
  dados = await controller.listaTodos();
  console.log(dados);
} catch (error) {
  console.error(error);
}
} else {
    dados = await controller.buscaPorCidade(id);
    console.log(dados);
}





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
          id="bairro"
          select
          label="Bairros"
          defaultValue=""
          helperText="Escolha o bairro"
          variant="standard"
        >
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