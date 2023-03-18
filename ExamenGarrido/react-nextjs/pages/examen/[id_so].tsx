import {GetStaticPaths, GetStaticProps} from "next";
import {so, soHttp, soIdList} from "../../servicios/so/so.http";
import Container from "react-bootstrap/Container";
import React, {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {Button} from "react-bootstrap";
import { DatePicker, setDefaultLocale } from  "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {width} from "dom-helpers";


export interface parametrosFormSO{
    nombre:string;
    fecha:string;
    eslibre:string;
}
interface parametrosSO{
        error?:string;
        so?:so;
}

export default function (paramas:parametrosSO){
    /* If para reutilizar el form en create y update*/
    if (paramas.so===undefined){
        paramas={
            so:{nombre:'',
            fechaLanzamiento:'',
            esLibre:false,
            id:-1,
            aplicaciones:null}
        }
    }
    const [nombre,setNombre] = useState(paramas.so.nombre)
    const [fecha,setFecha] = useState(paramas.so.fechaLanzamiento)
    const [esLibre,setEsLibre] = useState(paramas.so.esLibre)
    const {handleSubmit,register} = useForm<parametrosFormSO>(
        {
            defaultValues:{
                nombre:nombre,
                fecha:fecha,
                eslibre:esLibre.toString()
            },
            mode:'all'
        }
    )

    /**  Funcion para create o update  **/
    const resultadoForm = async (data:parametrosFormSO)=>{
        var url = `http://localhost:60/sisOpe/${paramas.so.id}`
        const requestOptions = {
            method:'',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(
                {
                    "nombre":data.nombre,
                    "esLibre":JSON.parse(data.eslibre),
                    "fechaLanzamiento":data.fecha
                }
            )
        }
        if(paramas.so.id===-1){
            requestOptions.method='POST'
            url = `http://localhost:60/sisOpe`
        }else {
            requestOptions.method='PUT'
        }
        console.log(requestOptions)


        fetch(url,requestOptions)
            .then(response => response.json())
    }

    /** Funcion para generar el select segun sea necesario **/

    const checkEsLibre = ()=>{
        if (esLibre){
            return <select {...register('eslibre')} defaultValue={'true'} id={'esLibre'}>
                <option value={'Elija'} >Elija</option>
                <option value={'true'} >True</option>
                <option value={'false'}>False</option>
            </select>
        }else if (!esLibre && paramas.so.id===-1) {
            return <select {...register('eslibre')} defaultValue={'Elija'} id={'esLibre'}>
                <option value={'Elija'} >Elija</option>
                <option value={'true'} >True</option>
                <option value={'false'}>False</option>
            </select>
        }else {
            return <select {...register('eslibre')} defaultValue={'false'} id={'esLibre'}>
                <option value={'Elija'} >Elija</option>
                <option value={'true'} >True</option>
                <option value={'false'}>False</option>
            </select>
        }
    }

    return(
        <>
            <Container>
                <p className={"fs-2"}>Editar el sistema operativo: {paramas.so.nombre}</p>
            </Container>
            <Container>
                <form className={'px-5'} onSubmit={handleSubmit(resultadoForm)}>
                    {/** Form **/}
                    {/** Nombre **/}
                    <div className={'row g-3 align-items-center'}>
                        <div className={'col-auto'}><label htmlFor={'nombre'} className={'form-label'}>Nombre</label></div>
                        <div className={'col-auto'}>
                            <input type={'text'}
                                   className={' form-control'}
                                   placeholder={nombre}
                                   id={'nombre'}
                                   {...register('nombre')}/>
                        </div>
                    </div>
                    {/** Fecha **/}
                    <div className={'row my-2 g-3 align-items-center'}>
                        <div className={'col-auto'}>Fecha de instalacion</div>
                        <div className={'col-auto'}>
                            <input type={'date'}
                                   id={'fecha'}
                                   {...register('fecha')}
                                   className={'form-control'}
                                   name={'fecha'}
                                    />
                        </div>
                    </div>
                    {/** Boolean **/}
                    <div className={'row my-2 g-3 align-items-center'}>
                        <div className={'col-auto'}>Es un software libre: </div>
                        <div className={'col-auto'}>
                            {checkEsLibre()}
                        </div>
                    </div>
                    {/** Submit **/}
                    <Button className={'my-2'} type={'submit'}>Enviar</Button>
                </form>
            </Container>
        </>
    )
}


export const getStaticProps:GetStaticProps =async (
    {params}
) => {
    try {
        //fetch
        const id = params.id_so as String
        const resultado = await soHttp(id);
        return {props:{so:resultado}}
    }catch (err:any){
        return  {props:{errors:err.message}}
    }
}

export const getStaticPaths:GetStaticPaths = async (
) =>{
    //consultar ids validos
    const paths = [{params:{id_so: "-1"}}]
    const lista = await soIdList()
    lista.map(
            (soID) =>{
                paths.push({params:{id_so:soID.id.toString()}})
            })
    return {paths,fallback:false}
}