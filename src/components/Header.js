import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import '../styles/transitores.css'


import CssBaseline from '@mui/material/CssBaseline';




import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuCadastro from './transitores/MenuCadastro';

import MenuRelatorio from './transitores/MenuRelatorio';
import MenuVenda from './transitores/MenuVenda';
import MenuLogin from './transitores/MenuLogin';

const defaultTheme = createTheme();

export default function Header() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="static">

       

        <div className='esquerda'>
          <MenuVenda />
          
          <MenuCadastro /><MenuRelatorio />

 <div className='direita'>
          
          <MenuLogin />
        </div>
 </div>

      </AppBar>
    </ThemeProvider>
  );
}