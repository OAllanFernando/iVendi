import * as React from 'react';
import AppBar from '@mui/material/AppBar';


import CssBaseline from '@mui/material/CssBaseline';

import Toolbar from '@mui/material/Toolbar';



import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuCadastro from './utils.js/MenuCadastro';
import MenuMovimento from './utils.js/MenuMovimento';
import MenuRelatorio from './utils.js/MenuRelatorio';
import MenuVenda from './utils.js/MenuVenda';

const defaultTheme = createTheme();

export default function Header() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
            <MenuVenda />
            <MenuMovimento />
            <MenuCadastro />
            <MenuRelatorio />
          
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}