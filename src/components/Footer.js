import React from 'react';

// Instancio o horário para mostrar no roda pé
var dateNow = new Date();

const options = { month: 'long' };
const monthName = dateNow.toLocaleDateString('pt-BR', options);


const Footer = () => {
  return (
    
    <footer>
        
      <p className='rodape'>Paranavaí, {dateNow.getDate()} de {monthName} de {dateNow.getFullYear()}  |  {dateNow.getHours()}: {dateNow.getUTCMinutes()}</p>
        
    </footer>
  );
};

export default Footer;