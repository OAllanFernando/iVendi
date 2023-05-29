import * as React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


export default function MenuVenda() {
  
 
  const navigate = useNavigate(); 
 

  return (
    <div>
      <Button
        id="basic-button"
        color='inherit'
        
       
        
        onClick={() => {navigate("/")}}      >

        Vender
      </Button>
     
    </div>
    
  );
  
}