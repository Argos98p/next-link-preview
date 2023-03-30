import { useRouter } from 'next/router'
import Head from 'next/head'
import XMLHttpRequest from 'xhr2';

import { useEffect } from 'react';
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";

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
    let aux2="";
    try {
       res = await fetch(`https://3dmotores.com/objects/getobject?idobjeto=${id}`);
       data = await res.json();

        aux2 =   `${data.escenas["0"].imagenes["25"].path}`.split("/")[1];

        imagen=`https://3dmotores.com/images/getimage?path=/${id}/${aux2}/preview/preview.jpg`;


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

    function   checkImage(url)  {
        console.log(`se verifca la siguiente imagen ${url}`)
        var request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send();
        console.log(request.status)
        if(request.status !== 404){
            return  `https://3dmotores.com/images/getimage?path=/${id}/${aux2}/preview/preview.jpg`;
        }else{
            return  `https://3dmotores.com/images/getimage?path=/${id}/${data.escenas["0"].imagenes["25"].path}`
        }
        /*
        request.onload = function() {
            console.log(imagen);
            console.log(request.status);
            var status = request.status;
            if (request.status === 200) //if(statusText == OK)
            {
                console.log(`la imagen ${url} existe `)
                return url;
            } if(request.status === 404){
                console.log(`la imagen ${url} NO existe `)
               return  `https://3dmotores.com/images/getimage?path=/${id}/${data.escenas["0"].imagenes["25"].path}`
            }
            return "";
        }
        console.log(`la respuesta de response es ${response}`);
        return  response;
        //return  `https://3dmotores.com/images/getimage?path=/${id}/${data.escenas["0"].imagenes["25"].path}`*/
    }
    //var imagen2 = checkImage(imagen);

    var imagen2=""
    fetch(imagen, { method: 'HEAD' })
        .then(res => {
            if (res.ok) {
                imagen2 = imagen;
            } else {
                imagen2 =   `https://3dmotores.com/images/getimage?path=/${id}/${data.escenas["0"].imagenes["25"].path}`
            }
        }).catch(()=>{
        imagen2 =   `https://3dmotores.com/images/getimage?path=/${id}/${data.escenas["0"].imagenes["25"].path}`
    } );

    console.log(`la imagen q se va es ${imagen2}`)
    return {
      props:{
        imagen:imagen2,
        nombre:data.info.split(",")[0]+ " "+data.info.split(",")[1],
        info:data.info.split(",")[0],
        info2:data.info.split(",")[1]
      }
    } ;
  }