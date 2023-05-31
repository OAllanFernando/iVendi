import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { TextField } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { PessoaController } from '../../controllers/PessoaController';

import Box from '@mui/material/Box';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const controller = new PessoaController();


export default function ClienteEditor({ open, onClose, cliente }) {
    const handleClose = () => {
        onClose();
    };

    const salvar = async () => {
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;

        const editado = {
            id: cliente.pessoas[0].id,
            nome: nome,
            email: email,
            telefone: telefone
        }

        await controller.alterar(editado).then((response) => {
            if (response === "Registro editado!") {
                window.location.reload();
            }

        })

    };
    console.log(cliente);
    if (cliente === null) {
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

                    <DialogTitle>{"Editando o cliente: "}</DialogTitle>
                    <Box>
                        {cliente && cliente.pessoas.length > 0 && (
                            <div className='editor'>
                                <TextField label="Nome:" variant="standard" id='nome' defaultValue={cliente.pessoas[0].nome} >Nome</TextField>,
                                <TextField label="Telefone:" variant="standard" id='telefone' defaultValue={cliente.pessoas[0].telefone} ></TextField>,
                                <TextField label="Email:" variant="standard" id='email' defaultValue={cliente.pessoas[0].email}></TextField>
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