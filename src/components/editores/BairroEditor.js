import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { TextField } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { BairroController } from '../../controllers/BairroController';
import Box from '@mui/material/Box';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const controller = new BairroController();


export default function BairroEditor({ open, onClose, bairro }) {
    const handleClose = () => {
        onClose();
    };

    const salvar = async () => {
        const nome = document.getElementById('nome').value;
        

        const editado = {
            id: bairro.bairros[0].id,
            nome: nome,
            
        }

        await controller.alterar(editado).then((response) => {
            if (response === "Registro editado!") {
                window.location.reload();
            }

        })

    };
    if (bairro === null) {
        return console.log("Em Espera");
    } else {

        return (

            <div>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >

                    <DialogTitle>{"Editando o Bairro: "}</DialogTitle>
                    <Box>
                        {bairro && bairro.bairros.length > 0 && (
                            <div className='editor'>
                                <TextField label="Nome:" variant="standard" id='nome' defaultValue={bairro.bairros[0].nome} >Nome</TextField>,
                             
                            </div>
                        )}
                    </Box>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button onClick={salvar}>Salvar</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}