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
            <meta property="og:url" content="https://3dmotores.com"/>
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
    let infoObject=[];
    try {
       res = await fetch(`https://3dmotores.com/objects/getinfo?idobjeto=${id}`);
       infoObject = res.data.split(",")
       imagen = infoObject[14];
  
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
        nombre:infoObject[0]+ " "+infoObject[1],
        info:infoObject[0],
        info2:infoObject[1]
      }
    } ;
  }