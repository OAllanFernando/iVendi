import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useNavigate } from 'react-router-dom';
//import CustomPaginationActionsTable from '../listagem/ListaCliente';

export default function MenuRelatorios() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate(); 
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        color='inherit'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Relatórios
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => {navigate("/clientes")}}>Clientes</MenuItem>
        <MenuItem onClick={() => {navigate("/bairros")}}>Bairros</MenuItem>
        <MenuItem onClick={() => {navigate("/cidades")}}>Cidades</MenuItem>
        <MenuItem onClick={() => {navigate("/vendas")}}>Relatório de vendas</MenuItem>
      </Menu>
    </div>
    
  );
  
}