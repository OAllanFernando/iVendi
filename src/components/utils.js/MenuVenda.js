import * as React from 'react';
import Button from '@mui/material/Button';


export default function MenuVenda() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
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
        Vender
      </Button>
     
    </div>
    
  );
  
}