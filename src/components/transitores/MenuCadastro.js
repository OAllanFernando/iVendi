import  React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

export default function MenuCadastro() {
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
        Cadastro
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
        <MenuItem onClick={() => {navigate("/cadastro/cliente")}}>Clientes</MenuItem>
        <MenuItem onClick={() => {navigate("/cadastro/bairro")}}>Bairros</MenuItem>
        <MenuItem onClick={() => {navigate("/cadastro/cidade")}}>Cidades</MenuItem>

        <MenuItem onClick={() => {navigate("/cadastro/produto")}}>Produtos</MenuItem>
      </Menu>
    </div>

  );

}