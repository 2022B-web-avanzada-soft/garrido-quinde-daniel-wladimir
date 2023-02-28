//hacer formularios facil en react
//https://react-hook-form.com/get-started/
import {useState} from "react";
import {useForm} from "react-hook-form";
import Layout from "../components/Layout";
import {data} from "autoprefixer";
import {Button} from "@mui/material";

type FormularioEjemplo = {
    nombre:string;
}

export default function (){
    const [nombre,setNombre] = useState('Daniel')
    const {handleSubmit,register} = useForm<FormularioEjemplo>(
        {
            defaultValues:{
                nombre: 'Wladimir' //este es el init, puede ir vacio
            },
            mode:'all'
        }
    )
    const controladorSubmit = (data:FormularioEjemplo)=>{//aqui se recive el submit,la info que envia
        console.log(data)
    }
    return(
        <>
            <Layout title={'Formulario'}>
                <h1>Form con react hook form</h1>
                <form onSubmit={handleSubmit(controladorSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input type="text" className="form-control" placeholder="EJ: ARIEL"
                        id="nombre"
                               {...register('nombre')}
                            aria-describedby={"nombreHelp"}
                        />
                        <div id={"nombreHelp"} className={"form-text"}>
                            Ingresa tu nombre.
                        </div>
                    </div>
                    <Button type="submit" variant='outlined'>
                        Enviar
                    </Button>
                </form>
            </Layout>
        </>
    )
}