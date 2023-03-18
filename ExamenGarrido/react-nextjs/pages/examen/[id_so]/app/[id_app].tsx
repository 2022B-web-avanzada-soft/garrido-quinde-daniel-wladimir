import {GetStaticPaths, GetStaticProps} from "next";
import {soHttp, soIdList} from "../../../../servicios/so/so.http";
import {app, appHttp} from "../../../../servicios/aplicaciones/app.http";
import {useRouter} from "next/router";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import Container from "react-bootstrap/Container";
import {Button} from "react-bootstrap";



interface paramsApp {
    error?:string;
    app?:app;
    id_so?:string
}

interface parametrosFormApp{
    nombre:string;
    version:string;
    eslibre:string;
}

export default function (paramsApp:paramsApp){


    if (paramsApp.app===undefined){
        paramsApp={
            app:{nombre:'',
                version:0,
                esLibre:false,
                id:-1
            },
            id_so:paramsApp.id_so
        }
    }

    console.log(paramsApp)

    const [nombre,setNombre] = useState(paramsApp.app.nombre)
    const [version,setVersion] = useState(paramsApp.app.version)
    const [esLibre,setEsLibre] = useState(paramsApp.app.esLibre)

    const {register,handleSubmit} = useForm<parametrosFormApp>(
        {
            defaultValues:{
                nombre:nombre,
                version:version.toString(),
                eslibre:esLibre.toString()
            }
        }
    )

    /** Funcion para generar el select segun sea necesario **/

    const checkEsLibre = ()=>{
        if (esLibre){
            return <select {...register('eslibre')} defaultValue={'true'} id={'esLibre'}>
                <option value={'Elija'} >Elija</option>
                <option value={'true'} >True</option>
                <option value={'false'}>False</option>
            </select>
        }else if (!esLibre && paramsApp.app.id===-1) {
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

    const resultadoForm = async (data:parametrosFormApp)=>{
        var url = `http://localhost:60/aplicacion/${paramsApp.app.id}`
        const requestOptions = {
            method:'',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(
                {
                    "nombre":data.nombre,
                    "esLibre":JSON.parse(data.eslibre),
                    "version": Number(data.version),
                    "so":Number(paramsApp.id_so)
                }
            )
        }
        if (paramsApp.app.id===-1){
            requestOptions.method='POST'
            url = `http://localhost:60/aplicacion`
            requestOptions.body = JSON.stringify(
                {
                    "nombre":data.nombre,
                    "esLibre":JSON.parse(data.eslibre),
                    "version":Number(data.version),
                    "so":Number(paramsApp.id_so)
                    }
                )
        }else {
            requestOptions.method='PUT'
            requestOptions.body = JSON.stringify(
                {
                    "nombre":data.nombre,
                    "esLibre":JSON.parse(data.eslibre),
                    "version":Number(data.version),
                }

            )
        }
        console.log(requestOptions)
         fetch(url,requestOptions)
             .then(response => response.json())
    }

    return(
        <>
            <Container>
                <p className={"fs-2"}>Editar la aplicacion: {paramsApp.app.nombre}</p>
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
                        <div className={'col-auto'}>Version</div>
                        <div className={'col-auto'}>
                            <input type={'number'}
                                   id={'version'}
                                    step={".01"}
                                   {...register('version')}
                                   className={'form-control'}
                                   name={'version'}
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
        const id = params.id_app as String
        const resultado = await appHttp(id)
        return {props:{
            app:resultado
                ,id_so: params.id_so as String

        }}
    }catch (err:any){
        return  {props:{errors:err.message,
                id_so: params.id_so as String
                }}
    }
}


export const getStaticPaths:GetStaticPaths = async (
) =>{
    //consultar ids validos
    const paths = []
    const listaSO = await soIdList()
    const listaApps = [-1,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]
    listaSO.map(
        (soID) =>{
            listaApps.map((app)=>{
                paths.push(
                    {params:
                            {id_app: app.toString(),id_so:soID.id.toString()}
                    })
            })
        })
    return {paths,fallback:false}
}
