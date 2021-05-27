import axios from 'axios';
//import 'babel-polyfill';

const consultarReporte = document.querySelector('.consultarReporte');
const espacioReporte =  document.querySelector('#espacioReporte');
const consultaAdmins = async () =>{    
        let combo = `<select class="form-control" id="id_admin">
        <option value="non">Seleccione administrador</option>`;
        const admins = await axios.post(`/consultaAdminsWialons`); 
        for(let admin of admins.data){
        combo += `<option value="${admin.id_admin}">${admin.nombre}</option>`;
        }
        combo += `</select>`;
        document.querySelector('.comboAdminWialon').innerHTML = combo;
}
if(espacioReporte){
    consultaAdmins();    
}
if(consultarReporte){
    consultarReporte.addEventListener('click', async e=>{              
        const tipo = document.querySelector('#tipo').value;
        const id_admin =  document.querySelector('#id_admin').value;
        const fecha_ini =  document.querySelector('#fecha_ini').value;
        const fecha_fin =  document.querySelector('#fecha_fin').value;
        const anho =  document.querySelector('#anho').value;
        if(tipo === "non" || id_admin === "non" ){
            alertify.error('Seleccione administrador');
            return;
        }
        if(!fecha_ini || !fecha_fin){
            alertify.error('Seleccione todos los campos');
            return;
        }
        const reporte = await axios.post(`/consultaReporteUnidades`,{
            id_admin,
            fecha_ini,
            fecha_fin
        }); 
        let tabla = `<table class="tabla-colapse">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Id</th>
                    <th>Nombre</th>`;
        let i = 0;
        let fechaArray = [];
        let datosObj = [];
        let fechaRed , objeto ;
        const total = reporte.data.length;        
        for(let fecha of reporte.data){
            i += 1;
            fechaRed = fecha.fecha_m.split(' ');
            if(i === 1){      
                fechaArray.push(fechaRed[0]);
                continue;
            }
            const encontrar = fechaArray.includes(fechaRed[0]);
            if(!encontrar){
                fechaArray.push(fechaRed[0]);
                continue;
            }
        }
        for(let fechaA of fechaArray){
            tabla += `<th>${fechaA}</th>`;
        }       
        tabla += `</tr>
        </thead>
        <tbody>`;
        i = 0;
        let j = 0;
        const k = fechaArray.length;
            for(let repo of reporte.data){  
            i += 1;     
            if(i === 1){
                j+=1;
                objeto = {
                    registro : repo.registro,
                    nombre : repo.nombre,
                    u1 : repo.unidades,
                    num : j
                };
                continue;
            }
            if(objeto.registro === repo.registro){
                objeto.u2 = repo.unidades;
                continue;
            }else{
                j += 1;
                datosObj.push(objeto);
                objeto = {
                    registro : repo.registro,
                    nombre : repo.nombre,
                    u1 : repo.unidades,
                    num : j
                };
            }                  
            }
            for(let dato of datosObj){
                tabla += `<tr>
                        <td>${dato.num}</td>
                        <td>${dato.registro}</td>
                        <td>${dato.nombre}</td>
                        <td>${dato.u1}</td>
                        <td>${dato.u2}</td>
                        <td>${dato.u3}</td>
                        <td>${dato.u4}</td>
                          </tr>`;
            }
            tabla += `</tbody>
                    </table>`;
            espacioReporte.innerHTML = tabla;
    });
}