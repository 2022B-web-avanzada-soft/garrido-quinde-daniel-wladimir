import React from "react";
import '../styles/global.css'

function Myapp({
    Component,pageProps
               }){
    return (
        <>
            <Component {...pageProps}/>
        </>
    )
}
export default Myapp







