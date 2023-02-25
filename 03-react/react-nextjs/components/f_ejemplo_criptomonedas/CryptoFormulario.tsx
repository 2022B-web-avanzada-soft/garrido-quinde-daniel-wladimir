import {useEffect, useState} from "react";
import {MONEDAS} from "../d_hook_custom/monedas";
import {MonedasInterface} from "../../interfaces/monedas";
import useSelectMoneda from "../hooks/useSelectMoneda";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {ConsultaMoneda} from "../../pages/f_ejemplo_criptomonedas";

export default function ({setMonedas}){ //destructuracion desde aqui
    const monedasArreglo = MONEDAS
    const [criptoMonedasArreglo,setCriptoMonedasArreglo] = useState([] as MonedasInterface[])
    const [valorMoneda,SelectMonedaComponente] = useSelectMoneda(
        'Seleccionar Moneda',monedasArreglo)
    const [valorCriptomoneda,SelectCriptmonedaComponente] = useSelectMoneda(
        'Seleccionar Cripto',
        criptoMonedasArreglo
    )

    useEffect(//se llena el arreglo de las criptomonedas
        ()=>{
            const consultarAPICripto = async ()=>{
                const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
                const respuesta = await fetch(url)
                const dataPlana = await respuesta.json();
                const arregloCripto:MonedasInterface[] = dataPlana.Data.map(
                    (criptoMoneda)=>{
                        const criptoMonedaLocal:MonedasInterface = {
                            id:criptoMoneda.CoinInfo.Name,
                            nombre:criptoMoneda.CoinInfo.FullName,
                        }
                        return criptoMonedaLocal
                    }
                );
                setCriptoMonedasArreglo(arregloCripto);
            }
            consultarAPICripto().then().catch((error)=>{
                console.error(error)
            })
        },[]
    )

    const manekarSubmitFormulario = (e)=>{
        e.preventDefault();
        const monedasConsulta:ConsultaMoneda = {
            valorMoneda:valorMoneda as string,
            valorCriptomoneda:valorCriptomoneda as string
        }
        setMonedas(monedasConsulta)
    }

    return (

        <>
            <form onSubmit={manekarSubmitFormulario}>
                {SelectMonedaComponente}
                {SelectCriptmonedaComponente}
                <br/>
                <button className={'btn btn-primary w-100'} type={"submit"}>
                    Consultar
                </button>
            </form>
        </>
    )
}