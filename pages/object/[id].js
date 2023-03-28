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
            <meta property="og:url" content={`https://3dmotores.com/visualizador/view/${router.query.id}`}/>
            <meta property="og:title" content={aux}  />
            <meta property="og:image" content={imagen}/>
            <meta property="og:image:width" content="400"/>
            <meta property="og:image:height" content="400"/>
            <meta property="og:description"  content={aux}/>
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
    let infoObjecto=[];
    try {
       res = await fetch(`https://3dmotores.com/objects/getinfo?idobjeto=${id}`);
       data = await res.text();
       infoObjecto = data.split(",");
       console.log(data);
       imagen = data.split(",")[14];
  
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
        nombre:data.split(",")[0]+ " "+data.split(",")[1],
        info:data.split(",")[0],
        info2:data.split(",")[1]
      }
    } ;
  }