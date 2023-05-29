
//https://mui.com/material-ui/react-text-field/
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { ProdutoController } from '../../controllers/ProdutoController'
import { Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import '../../styles/transitores.css';
import { useState } from 'react';
import { useEffect } from 'react';

const controller = new ProdutoController();
var dados = Object;
try {
    dados = await controller.listaTodos();
    console.log(dados);
} catch (error) {
    console.error(error);
}





export default function ComboCidade() {
    const [quantidade, setQuantidade] = useState(1);
    const [total, setTotal] = useState(0);
    const [valorProduto, setValorProduto] = useState(0);
  
    const handleChange = async (event) => {
      await controller.buscaPorId(event.target.value).then((response) => {
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
    }, [valorProduto, quantidade]);
    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} noValidate autoComplete="off"       >
            <div>
                <TextField id="produto" select label="Produtos" defaultValue="" helperText="Escolha o produto" variant="standard" onChange={handleChange}  >
                    {dados.produtos.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.nome}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField helperText="Apenas unidade" id="quantidade" label="Quantidade" type='number' variant="standard" value={quantidade} onChange={handleChangeQuantidade} />
                <TextField id="valor" label="valor unitário" variant="standard" type='number' value={valorProduto} onChange={handleChangeValor} />
                <TextField id="total" label="Total:" variant="standard" value={total}  />
                <Button variant="contained" color="success" startIcon={<AddShoppingCartIcon />}>Inserir</Button>

            </div>
        </Box>
    );
}