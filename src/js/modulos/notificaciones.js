import axios from 'axios';
//import 'babel-polyfill';
/*SUSCRIPCION DE USUARIO*/
/*const PUBLIC_VAPID_KEY = "BF_DkPs6HyX_7Z0fVfEaj-OLKnEA9TjyCgC1fZbsW8_i3Eg_Rio2zkdvc16VEMok433b9xM1XFMGjuRfTCBk8po";
if (!('serviceWorker' in navigator)) {
  console.log('EL navegador no soporta ServiceWorker');
}

if (!('PushManager' in window)) {
  console.log('EL navegador no soporta PushManager');
}
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
   
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
   
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

const subscripcionF = async() =>{
  const registro = await navigator.serviceWorker.register('/worker.js',{
    scope: '/'
  });
  const subscripcion =  await registro.pushManager.subscribe ({
      userVisibleOnly : true,
      applicationServerKey : urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
  });
  await fetch('/subscripcion',{
    method : 'POST',
    body : JSON.stringify(subscripcion),
    headers:{
      "Content-Type" : "application/json"
    }
  });
  console.log('subscrito')
}
subscripcionF();

setTimeout(
    function(){ 
       fetch('/notificacion',{
        method : 'POST',
        body : JSON.stringify({
            mensaje : 'CHINGATUMADRE'
        }),
        headers:{
            "Content-Type" : "application/json"
        }
       })               
    }, 3000
)
*/
/*---------------------*/
const campana1 =  `<button class="notificacionBoton">
                      <img src="/img/campana1.png",alt="campana",class="iconoChico">
                    </button>`;
const campana2 =  `<button class="notificacionBoton">
                    <img src="/img/campana2.png",alt="campana",class="iconoChico">
                  </button>`;
const peticion = async () => {
  const respuesta = await axios.post(`/consultaNotificacion`);
  //console.log(respuesta.data);
  if(respuesta.data === 1){
    notificacion.innerHTML = campana2;
  }else{
    notificacion.innerHTML = campana1;
  }
}
const notificacion = document.querySelector('.notificaciones');
if(notificacion){
  peticion();
  setInterval(peticion,5000);
}