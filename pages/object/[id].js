import { useRouter } from 'next/router'
import Head from 'next/head'

import { useEffect } from 'react';

function VisualizadorVehiculo({imagen,nombre,info,info2}){
    const router = useRouter();
    let aux= info + " "+ info2;



    useEffect(() => {
        window.location.href = `https://3dmotores.com/visualizador/view/${router.query.id}`;
      }, []);
    
    return (
        <div >
          <Head>
            <title>{nombre}</title>
            <meta property="og:url" content="https://edisciplinas.usp.br/pluginfile.php/5196097/mod_resource/content/1/Teste.mp4"/>
            <meta property="og:title" content={nombre}  />
            <meta property="og:image" content={imagen}/>
            <meta property="og:image:width" content="1280"/>
            <meta property="og:image:height" content="720"/>
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
    let imagen = "";
    try {
       res = await fetch(`https://3dmotores.com/objects/getobject?idobjeto=${id}`);
       data = await res.json();
       imagen = `https://3dmotores.com/images/getimage?path=/${id}/${data.escenas["0"].imagenes["1"].path}`
  
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
   
    return {
      props:{
        imagen:imagen,
        nombre:aux,
        info:data.info.split(",")[0],
        info2:data.info.split(",")[1]
      }
    } ;
  }