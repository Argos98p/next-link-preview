import { useRouter } from 'next/router'
import Head from 'next/head'
import XMLHttpRequest from 'xhr2';

import { useEffect } from 'react';
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";

function VisualizadorVehiculo({imagen,nombre,info,info2}){
    const router = useRouter();
    let aux= info + " "+ info2;


    useEffect(() => {
        window.location.href = `https://3dmotores.com/visualizador/${router.query.id}`;
      }, []);
    
    return (
        <div >
          <Head>
            <title>{nombre}</title>
              <meta property="og:url" content="https://edisciplinas.usp.br/pluginfile.php/5196097/mod_resource/content/1/Teste.mp4"/>
            <meta property="og:title" content={aux}  />
            <meta property="og:image" content={imagen}/>
            <meta property="og:image:width" content="400"/>
            <meta property="og:image:height" content="400"/>
            <meta property="og:description"  content={aux}/>
            <link rel="icon" href="/favicon.ico" />
          </Head>
            <main >
            </main>
        </div>
      );
}

export default VisualizadorVehiculo



export const getServerSideProps = async (context) => {


    const id = context.params.id;
    let  res = {};
    let data = {};
    let imagen = "https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1";
    let aux2="";
    try {
       res = await fetch(`https://3dmotores.com/objects/getobject?idobjeto=${id}`);
       data = await res.json();

        aux2 =   `${data.escenas["1"].imagenes["25"].path}`.split("/")[1];

        imagen=`https://3dmotores.com/ObjetosVirtuales/${id}/${aux2}/preview/preview.jpg`;


    } catch (error) {
      imagen = "https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1"
      return{
        props:{
          imagen:imagen,
          nombre: "Vehiculo no encontrado",
          info : "",
          info2 : ""
        }
      }
    }



    var imagen2=""
    await fetch(imagen, { method: 'HEAD' })
        .then(res => {
            if (res.ok) {
                imagen2 = imagen;
            } else {
                imagen2 =   `https://3dmotores.com/ObjetosVirtuales/${id}/${data.escenas["1"].imagenes["25"].path}`
            }
        }).catch(()=>{
        imagen2 =   `https://3dmotores.com/ObjetosVirtuales/${id}/${data.escenas["1"].imagenes["25"].path}`
    } );

    return {
      props:{
        imagen:imagen2,
        nombre:data.info.modelo+ " "+data.info.anio,
        info:data.info.modelo,
        info2:data.info.anio
      }
    } ;
  }