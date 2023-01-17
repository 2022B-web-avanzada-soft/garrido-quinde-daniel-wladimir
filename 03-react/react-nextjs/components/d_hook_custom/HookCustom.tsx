import UseSelectMoneda from "../hooks/useSelectMoneda";
import useSelectMoneda from "../hooks/useSelectMoneda";

export default function (){
    const [moneda,UseSelectMoneda] = useSelectMoneda('Moneda',[{
        id: 'USD' ,nombre:'Dolar USA'
    },{
        id:'MXN' ,nombre :'Peso mexicano'
    },{
        id:'EUR',nombre:'Euro'
    },{
        id: 'GBP',nombre:'Libra Esterlina'
    }])

    return (<>
        {UseSelectMoneda}
    </>)
}