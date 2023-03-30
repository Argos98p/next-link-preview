import { useRouter } from 'next/router'
import Head from 'next/head'
import XMLHttpRequest from 'xhr2';

import { useEffect } from 'react';
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";

function VisualizadorVehiculo({imagen,nombre,info,info2}){
    const router = useRouter();
    let aux= info + " "+ info2;
    console.log(imagen);
    console.log(nombre);

    useEffect(() => {
        window.location.href = `https://3dmotores.com/visualizador/view/${router.query.id}`;
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

function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;

}

export const getServerSideProps = async (context) => {


    const id = context.params.id;
    let  res = {};
    let data = {};
    let imagen = "https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1";
    try {
       res = await fetch(`https://3dmotores.com/objects/getobject?idobjeto=${id}`);
       data = await res.json();

       let aux2 =   `${data.escenas["0"].imagenes["25"].path}`.split("/")[1];

        imagen=`https://3dmotores.com/images/getimage?path=/${id}/${aux2}/preview/preview.jpg`;
        console.log(imagen);

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

    function checkImage(url) {
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.send();
        request.onload = function() {
            var status = request.status;
            if (request.status === 200) //if(statusText == OK)
            {
                console.log("image exists");
            } else {
                imagen = `https://3dmotores.com/images/getimage?path=/${id}/${data.escenas["0"].imagenes["25"].path}`
            }
        }
    }

    checkImage(imagen);


    console.log(imagen);

   
    return {
      props:{
        imagen:imagen,
        nombre:data.info.split(",")[0]+ " "+data.info.split(",")[1],
        info:data.info.split(",")[0],
        info2:data.info.split(",")[1]
      }
    } ;
  }