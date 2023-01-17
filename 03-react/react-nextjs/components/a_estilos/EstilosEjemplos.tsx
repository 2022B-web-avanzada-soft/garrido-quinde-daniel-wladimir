import styled  from "@emotion/styled";
import styles from './estilos.module.css'
//los estilos deben llevar .module
export default function (){
    const misEstilos ={
        color:'white',
        backgroundColor:'black',
        borderBottom:'5px solid yellow'
    }
    const Titulo = styled.h1 `
      font-size: 2rem;
      text-transform: uppercase;
      color:orange;
    `
    const TituloRojo = styled.h1 `
      font-size: 1.5rem;
      text-transform: capitalize;
      color:red;`

    const Subtitulo = styled.h2 `
      font-size: 1.5rem;
      text-transform: capitalize;
      color:green;`

    return (
        <>
            <div style={misEstilos}>Otros estilos</div>
            <div className={styles.rojo}>aqui se usa el componenete estilosEjemplo</div>
            <h1 style={{color : misEstilos.color,
            backgroundColor:misEstilos.backgroundColor,
            borderBottom:misEstilos.borderBottom}}>Estilos de objeto</h1>
            <Titulo>Titulo styled </Titulo>
            <TituloRojo>Ttitulo styled rojo</TituloRojo>
            <Subtitulo>Subtitulo styled</Subtitulo>
        </>
    )
}