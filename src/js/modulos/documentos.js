import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
const espacioCargaArchivos = document.querySelector('.espacioCargaArchivos');
const formularioSubirArchivo = document.querySelector('#formularioSubirArchivo');
if(formularioSubirArchivo){
    formularioSubirArchivo.addEventListener('submit', async e=>{ 
    e.preventDefault();
    const archivo = document.querySelector('archivo');
    const formData = new FormData(event.currentTarget);
    fetch('/subirArchivo',{
        method : 'POST',
        body : formData
    })
    .then(response => response.json())
    .then(data =>  
        {
            localStorage.setItem('columnas','-');
            localStorage.setItem('orden','1');
            localStorage.setItem('datos','-');
            pintarTabla(data);      
            let RPM;
            let RPMDHO;  
            let i=0;  
            for(let datos of data){                
                RPM = parseFloat(datos.Rate/datos.Trip).toFixed(2);
                if(isNaN(RPM)){
                    RPM = 0;
                } 
                RPMDHO = parseFloat(datos.Rate/(datos.Trip + datos["DH–O"])).toFixed(2);                
                    if(isNaN(RPMDHO)){
                    RPMDHO = 0;
                }
                datos.RPM = RPM;
                datos.RPMDHO = RPMDHO;
                datos.key = i;
                i+=1;
            }
        });
    });

}

const tablaExcel = document.querySelector('.tablaExcel');
if(tablaExcel){
    tablaExcel.addEventListener('click', async e=>{ 
        if(e.target.classList.contains('botonOrden')){ 
        const valorColumna = e.target;
        const columna = valorColumna.dataset.columna;
        const columnas = localStorage.getItem('columnas');
        const datos = localStorage.getItem('datos');
        const orden = localStorage.getItem('orden');
        let datosJ = JSON.parse(datos);
        const columnasJ = JSON.parse(columnas);
        if(orden === '1'){
            datosJ.sort(GetSortOrderAs(columna));
            localStorage.setItem('orden','2');
        }else{
            datosJ.sort(GetSortOrderDe(columna));
            localStorage.setItem('orden','1');
        }        
        pintarTabla(datosJ);
        }
    });
}

const GetSortOrderAs = prop => {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}    

const GetSortOrderDe = prop => {  
    return function(a, b) {    
        if (a[prop] < b[prop]) {    
            return 1;    
        } else if (a[prop] > b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}    

const pintarTabla = data => {
    const tabla1 = `<div class="contenedorCarga cargaExcel">
                        <div class="carga">
                        </div>
                    </div>`;
    document.querySelector('.tablaExcel').innerHTML = tabla1;
    document.querySelector('.cargaExcel').style.display = 'block';
    const columnas = localStorage.getItem('columnasVisualizar');
    let columnasVisualizar = [];
    setTimeout(
        function(){ 
            if(data.length > 0){
                let atributos=[];
                let j=0;
                let tabla = `<table class="table tabla-colapse">
                                 <thead>
                                     <tr>`;
                if(!columnas){
                    for(let aux in data[0]){
                        if(j===0){
                           tabla+=`<th>
                                       Check
                                   </th>`;
                           j+=1;
                        }
                        if(aux === 'key'){
                            continue;
                        };
                        tabla+=`<th>
                            <button data-columna="${aux}" class="botonOrden" style="color:white;">
                                ${aux}
                            </button>
                            </th>`;
                       
                       atributos.push(aux);
                       columnasVisualizar.push(aux);
                       }
                       const columnasString = JSON.stringify(columnasVisualizar)
                       localStorage.setItem('columnasVisualizar',columnasString);
                }else{
                    columnasVisualizar = JSON.parse(columnas);
                    for(let aux in data[0]){
                        if(j===0){
                           tabla+=`<th>
                                       Check
                                   </th>`;
                           j+=1;
                        }
                        if(aux === 'key'){
                            continue;
                        };
                        for(let columnaVisualizar of columnasVisualizar ){
                            if(aux === columnaVisualizar){
                                tabla+=`<th>
                                <button data-columna="${aux}" class="botonOrden" style="color:white;">
                                    ${aux}
                                </button>
                                </th>`;
                            }                          
                        }                      
                       atributos.push(aux);
                       }
                }                
                const atributosString = JSON.stringify(atributos);
                const datosString = JSON.stringify(data);
                localStorage.setItem('columnas',atributosString);
                localStorage.setItem('datos',datosString);
                tabla += `</tr>
                         </thead>
                         <tbody>`;
                const columnasDatos = localStorage.getItem('columnasVisualizar');
                const columnasDatosObj = JSON.parse(columnasDatos);
                for(let valor of data){ 
                let auxTime,divTime,resTime,horaTime,peso,pesoObj,i,tarifa,tarifaObj;
                 tabla += `<tr>
                    <td>
                        <input type="checkbox" id="sw${valor.key}">
                    </td>`;                    
                     for(let att of atributos){ 
                        if(att === 'key'){
                            continue;
                        };
                        for(let columnaDatos of columnasDatosObj ){
                            if(att === columnaDatos){
                                if(att === "Pickup"){
                                    const numeroDeDias = parseInt(valor[att])
                                    const formateado = (numeroDeDias - (25567 + 1)) * 86400 * 1000;
                                    const date = new Date(formateado);
                                    let mes = (String(date.getMonth()+1)).padStart(2, '0');
                                    let dia = String(date.getDate()).padStart(2, '0');
                                    let mesL;
                                    switch(mes){
                                        case  '01' :
                                        mesL = 'jan';
                                        break;
                                        case  '02' :
                                        mesL = 'feb';
                                        break;
                                        case  '03' :
                                        mesL = 'mar';
                                        break;
                                        case  '04' :
                                        mesL = 'apr';
                                        break;
                                        case  '05' :
                                        mesL = 'may';
                                        break;
                                        case  '06' :
                                        mesL = 'jun';
                                        break;
                                        case  '07' :
                                        mesL = 'jul';
                                        break;
                                        case  '08' :
                                        mesL = 'aug';
                                        break;
                                        case  '09' :
                                        mesL = 'sep';
                                        break;
                                        case  '10' :
                                        mesL = 'oct';
                                        break;
                                        case  '11' :
                                        mesL = 'nov';
                                        break;
                                        case  '12' :
                                        mesL = 'dec';
                                        break;
                                    }
                                    const fecha = `${dia}-${mesL}`;
                                    tabla += `<td>${fecha}</td>`;
                                }else if(att === "Age"){
                                    auxTime = parseFloat(valor[att])/0.000694444;
                                    divTime = Math.trunc(auxTime/60);
                                    resTime = Math.trunc(auxTime % 60);
                                    horaTime = `${String(divTime).padStart(2,'0')}:${String(resTime).padStart(2,'0')}`;
                                    tabla += `<td>${horaTime}</td>`;
                                }else if(att === "Weight"){
                                    i=0;
                                    peso =``;
                                    pesoObj = (String(valor[att])).split('');
                                    for(let pes of pesoObj){
                                        if(i > 0){
                                            if(i=== (pesoObj.length - 3)){
                                                peso+=`,`;
                                            }
                                        }                                
                                        peso += pes;
                                        i += 1;
                                    }
                                    tabla += `<td>${peso}</td>`;
                                }else if(att === "Rate"){
                                    i=0;
                                    tarifa =``;
                                    tarifaObj = (String(valor[att])).split('');
                                    for(let tar of tarifaObj){ 
                                        if(i>0){
                                            if(i === (tarifaObj.length - 3)){
                                                tarifa+=`,`;
                                            }
                                        }                           
                                        tarifa += tar;
                                        i += 1;
                                    }
                                    tabla += `<td>$${tarifa}</td>`;
                                }else if(att === "RPM"){
                                    tabla += `<td>$${valor[att]}</td>`;
                                }else if(att === "RPMDHO"){
                                    tabla += `<td>$${valor[att]}</td>`;
                                }else{
                                    tabla += `<td>${valor[att]}</td>`;
                                } 
                            }
                        }                        
                     }
                     
                 tabla += `</tr>`;
                }
                tabla += `</body>
                             </table>
                            <div class="contenedorCarga cargaExcel">
                             <div class="carga">
                             </div>
                            </div>`;
                document.querySelector('.cargaExcel').style.display = 'none';
                document.querySelector('.tablaExcel').innerHTML = tabla;
                document.querySelector('.generarPDF').disabled = false;
                document.querySelector('.cambioColumnas').disabled = false;
                document.querySelector('.ordenColumnas').disabled = false;
            }
        }, 500)
    
}

const generarPDF = document.querySelector('.generarPDF');
if(generarPDF){
    generarPDF.addEventListener('click', e =>{
        const datos = localStorage.getItem('datos');
        const datosObj = JSON.parse(datos);
        let seleccionados = [ ];
        let datosSel = [];
        let auxSw;
        for(let i=0;i < datosObj.length; i++){
            auxSw = document.querySelector(`#sw${i}`);
            if(auxSw.checked){
                seleccionados.push(i);
            }
        }
        for(let dato of datosObj){
            for(let selDato of seleccionados){
                if(dato.key === selDato){
                    datosSel.push(dato);
                }
            }
        }
        const datoSel = JSON.stringify(datosSel);
        localStorage.setItem('datosSel',datoSel);
        $('#descripcionReporte').modal('show');
        
    });
}

const abrirPdfTruck = document.querySelector('.abrirPdfTruck');
if(abrirPdfTruck){
    abrirPdfTruck.addEventListener('click', e =>{
        const titulo = document.querySelector('#tituloRepo').value;
        const trailer = document.querySelector('#trailerRepo').value;
        const ruta = document.querySelector('#rutaRepo').value;
        const descripcion = document.querySelector('#descripcionRepo').value;
        const headers = [titulo,trailer,ruta,descripcion]
        const headersS =  JSON.stringify(headers);
        localStorage.setItem('headers',headersS);
        window.open('/PDFtruck');
    });
}
const mostrarOrdenColumnas = () => {
        let tabla = ``
        const orden = localStorage.getItem('ordencolumnas');
        if(orden){
            const ordenObj = JSON.parse(orden);
            tabla += `<table class="table table-striped">
                        <thead>
                            <tr>
                                <th>1ero</th>
                                <th>2do</th>
                                <th>3er</th>
                                <th>4to</th>
                                <th>Aplicar</th>
                                <th>Borrar</th>
                            </tr>
                        </thead>
                        <tbody>`;
            let a,b,c,d;
            for(let ord of ordenObj){
                if(ord.a){
                    a = ord.a
                }else{
                    a =`<button data-id=${ord.key} data-att=a class="btn btn-primary cambioa">
                            Agregar
                        </button>`;
                }
                if(ord.b){
                    b = ord.b
                }else{
                    b =`<button data-id=${ord.key} data-att=b class="btn btn-primary cambioa">
                            Agregar
                        </button>`;
                }
                if(ord.c){
                    c = ord.c
                }else{
                    c =`<button data-id=${ord.key} data-att=c class="btn btn-primary cambioa">
                            Agregar
                        </button>`;
                }
                if(ord.d){
                    d = ord.d
                }else{
                    d =`<button data-id=${ord.key} data-att=d class="btn btn-primary cambioa">
                            Agregar
                        </button>`;
                }
                tabla +=`<tr>
                            <td>${a}</td>
                            <td>${b}</td>
                            <td>${c}</td>
                            <td>${d}</td> 
                            <td>
                                <button data-id=${ord.key} class="botn aplicarOrden">
                                    <img data-id=${ord.key}  src="/img/palomaVerde.png" class="iconoChico aplicarOrden">
                                </button>        
                            </td>
                            <td>
                                <button data-id=${ord.key} class="botn borrarOrden">
                                    <img data-id=${ord.key} src="/img/tache.png" class="iconoChico borrarOrden">
                                </button> 
                            </td>        
                        </tr>`; 
            }
            tabla += `</tbody></table>`;
        }else{
            tabla = `<p>No se han agregado</p>`;
        }
        document.querySelector('#ordenDeColumnas').innerHTML = tabla;
}
const agregarCriterio = document.querySelector('.agregarCriterio');
if(agregarCriterio){
    agregarCriterio.addEventListener('click', e =>{
        const orden = localStorage.getItem('ordencolumnas');
        let ordenObj = [];
        if(orden){
            ordenObj = JSON.parse(orden);
        }      
        ordenObj.push({
            a : '',
            b : '',
            c : '',
            d : '',
            key : uuidv4()
        });
        const ordenString = JSON.stringify(ordenObj);
        localStorage.setItem('ordencolumnas',ordenString);
        mostrarOrdenColumnas();    
    });
}

const ordenDeColumnas = document.querySelector('#ordenDeColumnas');
if(ordenDeColumnas){
    ordenDeColumnas.addEventListener('click', e =>{
        if(e.target.classList.contains('aplicarOrden')){ 
            const valorColumna = e.target;
            const id = valorColumna.dataset.id;
            let arreglo = [];
            const datos = localStorage.getItem('datos');
            let datosJ = JSON.parse(datos);
            const orden = localStorage.getItem('ordencolumnas');
            const ordenObj = JSON.parse(orden);
            for(let ord of ordenObj){
                if(ord.key === id){
                    arreglo = ord;
                }
            }
            console.log(arreglo);           
            if(arreglo.a){
                datosJ.sort(GetSortOrderDe(arreglo.a));
                //localStorage.setItem('orden','1');
            }
            if(arreglo.b){
                console.log('si hay b')
                datosJ.sort(GetSortOrderDe(arreglo.b));
                //localStorage.setItem('orden','1');
            }
            if(arreglo.c){
                datosJ.sort(GetSortOrderDe(arreglo.c));
                //localStorage.setItem('orden','1');
            }
            if(arreglo.d){
                datosJ.sort(GetSortOrderDe(arreglo.d));
                //localStorage.setItem('orden','1');
            } 
            
            pintarTabla(datosJ);
        }else if(e.target.classList.contains('borrarOrden')){ 
            const valorColumna = e.target;
            const id = valorColumna.dataset.id;
            let arreglo = [];
            const orden = localStorage.getItem('ordencolumnas');
            const ordenObj = JSON.parse(orden);
            for(let ord of ordenObj){
                if(ord.key !== id){
                    arreglo.push(ord);
                }
            }
            const ordenString = JSON.stringify(arreglo);
            localStorage.setItem('ordencolumnas',ordenString);
            mostrarOrdenColumnas();  
        }else if(e.target.classList.contains('cambioa')){ 
            const valorColumna = e.target;
            const id = valorColumna.dataset.id;
            const att = valorColumna.dataset.att;
            const columnas =  localStorage.getItem('columnas');
            const columnasObj = JSON.parse(columnas);
            let lista = `<ul class="list-group">`
            for(let columna of columnasObj){
                lista += `<li class="list-group-item">
                            <button data-dismiss="modal" data-id=${id} data-att=${att} data-nombre=${columna} class="btn btn-warning columnaEleccion">
                                ${columna}
                            </button>
                          </li>`; 
            }
            lista += `</ul>`;
            $('#columnasAgregar').modal('show');
            document.querySelector('.columnasAgregar').innerHTML = lista;
            }
    });
}

const columnasAgregar = document.querySelector('.columnasAgregar');
if(columnasAgregar){
    columnasAgregar.addEventListener('click', e =>{
        if(e.target.classList.contains('columnaEleccion')){ 
            const valorColumna = e.target;
            const id = valorColumna.dataset.id;
            const attributo = valorColumna.dataset.att;
            const nombre = valorColumna.dataset.nombre;
            const orden = localStorage.getItem('ordencolumnas');
            const ordenObj = JSON.parse(orden);
            for(let ord of ordenObj){
                if(ord.key === id){
                    ord[attributo] = nombre
                }
            }
            const ordenString = JSON.stringify(ordenObj);
            localStorage.setItem('ordencolumnas',ordenString);
            mostrarOrdenColumnas();  
        }
    });
}

const ordenColumnas = document.querySelector('.ordenColumnas');
if(ordenColumnas){
    ordenColumnas.addEventListener('click', e =>{
    mostrarOrdenColumnas();    
    });
}


const pdftruck = document.querySelector('.pdftruck');
if(pdftruck){
    const datos = localStorage.getItem('datosSel');
    const data = JSON.parse(datos);
    const headers = localStorage.getItem('headers');
    const headersS = JSON.parse(headers);
    if(data.length > 0){
        //const columnas = (JSON.stringify(data[0])).split(',');
        let atributos=[];
        let tabla = `
                <h4 style="text-align:center;">${headersS[0]}</h4>
                <table class="tabla-colapse">
                         <thead>
                             <tr>
                                <th>Truck</th>
                                <th>Route</th>
                                <th>Description</th>
                             </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${headersS[1]}</td>
                                <td>${headersS[2]}</td>
                                <td>${headersS[3]}</td>
                            </tr>
                        </tbody>
                </table>
                    <table class="table table-striped">
                         <thead>
                             <tr>`;
        for(let aux in data[0]){         
         if(aux === 'key'){
             continue;
         };
         tabla+=`<th>             
                 ${aux}
              </th>`;
         atributos.push(aux);
        }
        tabla += `</tr>
                 </thead>
                 <tbody>`;
        
        for(let valor of data){ 
        let auxTime,divTime,resTime,horaTime,peso,pesoObj,i,tarifa,tarifaObj;
         tabla += `<tr>`;                    
             for(let att of atributos){ 
                if(att === 'key'){
                    continue;
                };
                if(att === "Pickup"){
                    const numeroDeDias = parseInt(valor[att])
                    const formateado = (numeroDeDias - (25567 + 1)) * 86400 * 1000;
                    const date = new Date(formateado);
                    let mes = (String(date.getMonth()+1)).padStart(2, '0');
                    let dia = String(date.getDate()).padStart(2, '0');
                    let mesL;
                    switch(mes){
                        case  '01' :
                        mesL = 'jan';
                        break;
                        case  '02' :
                        mesL = 'feb';
                        break;
                        case  '03' :
                        mesL = 'mar';
                        break;
                        case  '04' :
                        mesL = 'apr';
                        break;
                        case  '05' :
                        mesL = 'may';
                        break;
                        case  '06' :
                        mesL = 'jun';
                        break;
                        case  '07' :
                        mesL = 'jul';
                        break;
                        case  '08' :
                        mesL = 'aug';
                        break;
                        case  '09' :
                        mesL = 'sep';
                        break;
                        case  '10' :
                        mesL = 'oct';
                        break;
                        case  '11' :
                        mesL = 'nov';
                        break;
                        case  '12' :
                        mesL = 'dec';
                        break;
                    }
                    const fecha = `${dia}-${mesL}`;
                    tabla += `<td>${fecha}</td>`;
                }else if(att === "Age"){
                    auxTime = parseFloat(valor[att])/0.000694444;
                    divTime = Math.trunc(auxTime/60);
                    resTime = Math.trunc(auxTime % 60);
                    horaTime = `${String(divTime).padStart(2,'0')}:${String(resTime).padStart(2,'0')}`;
                    tabla += `<td>${horaTime}</td>`;
                }else if(att === "Weight"){
                    i=0;
                    peso =``;
                    pesoObj = (String(valor[att])).split('');
                    for(let pes of pesoObj){
                        if(i > 0){
                            if(i=== (pesoObj.length - 3)){
                                peso+=`,`;
                            }
                        }                                
                        peso += pes;
                        i += 1;
                    }
                    tabla += `<td>${peso}</td>`;
                }else if(att === "Rate"){
                    i=0;
                    tarifa =``;
                    tarifaObj = (String(valor[att])).split('');
                    for(let tar of tarifaObj){ 
                        if(i>0){
                            if(i === (tarifaObj.length - 3)){
                                tarifa+=`,`;
                            }
                        }                           
                        tarifa += tar;
                        i += 1;
                    }
                    tabla += `<td>$${tarifa}</td>`;
                }else if(att === "RPM"){
                    tabla += `<td>$${valor[att]}</td>`;
                }else if(att === "RPMDHO"){
                    tabla += `<td>$${valor[att]}</td>`;
                }else{
                    tabla += `<td>${valor[att]}</td>`;
                } 
             }
             
         tabla += `</tr>`;
        }
        tabla += `</body>
                     </table>`;
        document.querySelector('.pdftruck').innerHTML = tabla;
    }    
    setTimeout(
        function(){ 
           window.print();
        }, 1500)
}

const cambioColumnas = document.querySelector('.cambioColumnas');
if(cambioColumnas){
    cambioColumnas.addEventListener('click', e =>{
        const atributosString = localStorage.getItem('columnas'); 
        const atributosStringObj = JSON.parse(atributosString);
        const columnas = localStorage.getItem('columnasVisualizar');
        const columnasObj = JSON.parse(columnas);
        let visualizados = [ ];
        let encontrado;
        let lista =`<ul class="list-group">`;
        let attAlt;
        for(let att of atributosStringObj){
            encontrado = columnasObj.find(element => element === att);
            if(att === 'F/P'){
                attAlt = 'FP';
            }else{
                attAlt = att;
            }
            if(encontrado){
                lista += `<li class="list-group-item">
                            <input type="checkbox" id="sw${attAlt}" checked>
                            <label for="sw${attAlt}">${att}</label>
                            </li>`; 
            }else{
                lista += `<li class="list-group-item">
                            <input type="checkbox" id="sw${attAlt}">
                            <label for="sw${attAlt}">${att}</label>
                            </li>`;
            }
        }
        document.querySelector('#columnas').innerHTML = lista;
    })
}

const botonCambioColumnas = document.querySelector('.botonCambioColumnas');
if(botonCambioColumnas){
    botonCambioColumnas.addEventListener('click', e =>{
        const atributosString = localStorage.getItem('columnas'); 
        const atributosStringObj = JSON.parse(atributosString);
        let visualizados = [ ];
        let valor;
        let attAlt;
        for(let att of atributosStringObj){
            if(att === 'F/P'){
                attAlt = 'FP';
            }else{
                attAlt = att;
            }
            valor = document.querySelector(`#sw${attAlt}`);
            if(valor.checked){
                visualizados.push(attAlt);
            }           
        }
        const columnasVisualizar = JSON.stringify(visualizados);
        localStorage.setItem('columnasVisualizar',columnasVisualizar);
        const datos = localStorage.getItem('datos');
        let datosJ = JSON.parse(datos);
        pintarTabla(datosJ);
    })
}