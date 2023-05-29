import { TextField, Fab } from "@mui/material"
import { IMaskInput } from 'react-imask';



import '../../styles/transitores.css'


export default function CadastroProduto() {

    return (
        <div >
            <form >
                <div className="centro"><label >Insira os dados do produto:</label></div>
                <div className="centro"><TextField id="codigo" label="Codigo" variant="standard" type="number" /></div>
                <div className="centro"><TextField id="nome" label="Nome" variant="standard" /></div>

                <div className="centro"><TextField id="sigla" label="Sigla" variant="standard" InputProps={{inputComponent: IMaskInput, inputProps: { mask: 'aa' }}} /></div>

          
                <div className="centro">
                    <Fab variant="extended" color="primary" aria-label="add">
                        
                        Cadastrar
                    </Fab>
                
                
                    <Fab variant="extended" color="error" aria-label="add" type="reset">
                        
                        Cancelar
                    </Fab>
                </div>
            </form>

        </div>
    )
}