import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { TextField } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { CidadeController } from '../../controllers/CidadeController';
import Box from '@mui/material/Box';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const controller = new CidadeController();


export default function CidadeEditor({ open, onClose, cidade }) {
    const handleClose = () => {
        onClose();
    };

    const salvar = async () => {
        const nome = document.getElementById('nome').value;
        const sigla = document.getElementById('sigla').value;

        const editado = {
            id: cidade.cidades[0].id,
            nome: nome,
            sigla: sigla
            
        }
        console.log(editado);
        await controller.alterar(editado).then((response) => {
            if (response === "Registro editado!") {
                window.location.reload();
            }

        })

    };
    if (cidade === null) {
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

                    <DialogTitle>{"Editando a cidade: "}</DialogTitle>
                    <Box>
                        {cidade && cidade.cidades.length > 0 && (
                            <div className='editor'>
                                <TextField label="Nome:" variant="standard" id='nome' defaultValue={cidade.cidades[0].nome} >Nome</TextField>,
                                <TextField label="Sigla:" variant="standard" id='sigla' defaultValue={cidade.cidades[0].sigla} >Sigla</TextField>,
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