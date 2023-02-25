import UseSelectMoneda from "../hooks/useSelectMoneda";
import useSelectMoneda from "../hooks/useSelectMoneda";
import {MONEDAS} from "./monedas";

export default function (){
    const [moneda,UseSelectMoneda] = useSelectMoneda('Moneda',MONEDAS)

    return (<>
        {UseSelectMoneda}
    </>)
}