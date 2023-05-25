import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
//import CustomPaginationActionsTable from '../listagem/ListaCliente';

export default function MenuRelatorios() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


 

  // função dos botãoes 

  const listaClienteBtn = (event) => {
    
    handleClose()
  };
  
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
        <MenuItem onClick={listaClienteBtn}>Clientes</MenuItem>
        <MenuItem onClick={handleClose}>Bairros</MenuItem>
        <MenuItem onClick={handleClose}>Cidades</MenuItem>
        <MenuItem onClick={handleClose}>Relatório de vendas</MenuItem>
      </Menu>
    </div>
    
  );
  
}