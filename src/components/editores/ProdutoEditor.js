import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { TextField } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { ProdutoController } from '../../controllers/ProdutoController';
import Box from '@mui/material/Box';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const controller = new ProdutoController();


export default function ProdutoEditor({ open, onClose, produto }) {
    const handleClose = () => {
        onClose();
    };

    const salvar = async () => {
        const nome = document.getElementById('nome').value;
        const preco = document.getElementById('preco').value;
        

        const editado = {
            id: produto.produtos[0].id,
            nome: nome,
            preco: preco
            
        }

        await controller.alterar(editado).then((response) => {
            if (response === "Registro editado!") {
                window.location.reload();
            }

        })

    };
    if (produto === null) {
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

                    <DialogTitle>{"Editando o produto: "}</DialogTitle>
                    <Box>
                        {produto && produto.produtos.length > 0 && (
                            <div className='editor'>
                                <TextField label="Nome:" variant="standard" id='nome' defaultValue={produto.produtos[0].nome} >Nome</TextField>,
                                <TextField label="Preço:" variant="standard" id='preco' defaultValue={produto.produtos[0].preco} >Preco</TextField>,
                             
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