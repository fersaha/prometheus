import axios from 'axios';
import 'regenerator-runtime/runtime'
import session from 'express-session';
/*CLIENTES*/
const espacioClientes = document.querySelector('.espacioClientes');
const espacioEnlazados = document.querySelector('.espacioEnlazados');
const espacioFacturas = document.querySelector('.espacioFacturas');
const divSpinner = document.querySelector('.divSpinner');
const seleccionAdminBindInputs = document.querySelector('.seleccionAdminBindInputs'); 
const consultaAdministradores = async () =>{
  let combo = `<select class="form-control selectAdmins" id="id_admin">
                <option value="non">Seleccione administrador</option>`;
  const admins = await axios.post(`/consultaAdmins`); 
  for(let admin of admins.data){
    combo += `<option value="${admin.id_admin}">${admin.nombre}</option>`;
  }
  combo += `</select>`;
  document.querySelector('.comboAdminBind').innerHTML = combo;
}
if(seleccionAdminBindInputs){
   consultaAdministradores();     
   document.querySelector(".divSpinner").style.display="none";  
   seleccionAdminBindInputs.addEventListener('change', async e=>{ 
    if(e.target.classList.contains('selectRegistros') || e.target.classList.contains('selectAdmins')){ 
      const id_admin = document.querySelector('#id_admin').value;
      const reg_bus = document.querySelector('#reg_bus').value;    
      const reg_inp = document.querySelector('#reg_inp').value;    
      if(espacioClientes){
        consultaClientes(id_admin,reg_bus,'0',reg_inp); 
      }else if(espacioEnlazados){
        const factura = document.querySelector('#factura').value; 
        const tipo_clienteE = document.querySelector('#tipo_clienteE').value; 
        consultaEnlazados(id_admin,reg_bus,'0',reg_inp,factura,tipo_clienteE);
      }else if(espacioFacturas){
        const mes_fact = document.querySelector('#mes_fact').value;
        const anho_fact = document.querySelector('#anho_fact').value;
        const tipo_clienteE = document.querySelector('#tipo_clienteE').value; 
        consultaFacturas(id_admin,reg_bus,'0',reg_inp,anho_fact,mes_fact,tipo_clienteE);
      } 
    }
  });
    seleccionAdminBindInputs.addEventListener('keyup', async e=>{ 
      if(e.target.classList.contains('inputBuscar')){ 
      const id_admin = document.querySelector('#id_admin').value;
      const reg_bus = document.querySelector('#reg_bus').value;    
      const reg_inp = document.querySelector('#reg_inp').value;    
      if(espacioClientes){
        consultaClientes(id_admin,reg_bus,'0',reg_inp); 
      }else if(espacioEnlazados){
        const factura = document.querySelector('#factura').value; 
        const tipo_clienteE = document.querySelector('#tipo_clienteE').value; 
        consultaEnlazados(id_admin,reg_bus,'0',reg_inp,factura,tipo_clienteE);
      }else if(espacioFacturas){
        const mes_fact = document.querySelector('#mes_fact').value;
        const anho_fact = document.querySelector('#anho_fact').value;
        const tipo_clienteE = document.querySelector('#tipo_clienteE').value; 
        consultaFacturas(id_admin,reg_bus,'0',reg_inp,anho_fact,mes_fact,tipo_clienteE);
      } 
      }
  });
}
const seleccionaAnhoMes = document.querySelector('.seleccionaAnhoMes');
if(seleccionaAnhoMes){
  seleccionaAnhoMes.addEventListener('change', async e=>{ 
    if(e.target.classList.contains('mes_fact') || e.target.classList.contains('anho_fact')){ 
      const id_admin = document.querySelector('#id_admin').value;
      const reg_bus = document.querySelector('#reg_bus').value;    
      const reg_inp = document.querySelector('#reg_inp').value;    
      if(espacioFacturas){
        const mes_fact = document.querySelector('#mes_fact').value;
        const anho_fact = document.querySelector('#anho_fact').value;
        const tipo_clienteE = document.querySelector('#tipo_clienteE').value; 
        consultaFacturas(id_admin,reg_bus,'0',reg_inp,anho_fact,mes_fact,tipo_clienteE);
      } 
    }
  });
}

// const paginas = document.querySelector('.paginas');
// if(paginas){
//   paginas.addEventListener('click', e=>{
//     if(e.target.value){
//       const id_admin = document.querySelector('#id_admin').value;
//       const reg_bus = document.querySelector('#reg_bus').value;   
//       const reg_inp = document.querySelector('#reg_inp').value; 
//       const offset = parseInt(e.target.value) - 1;
//       if(espacioClientes){
//         consultaClientes(id_admin,reg_bus,offset,reg_inp); 
//       }else if(espacioEnlazados){
//         const factura = document.querySelector('#factura').value; 
//         const tipo_clienteE = document.querySelector('#tipo_clienteE').value; 
//         consultaEnlazados(id_admin,reg_bus,offset,reg_inp,factura,tipo_clienteE);
//       }else if(espacioFacturas){
//         const mes_fact = document.querySelector('#mes_fact').value;
//         const anho_fact = document.querySelector('#anho_fact').value;
//         const tipo_clienteE = document.querySelector('#tipo_clienteE').value; 
//         consultaFacturas(id_admin,reg_bus,offset,reg_inp,anho_fact,mes_fact,tipo_clienteE);
//       }    
//     }
//   });
// }

/*
const consultaClientes = async (id_admin,reg_bus,offset,reg_inp) => {
  espacioClientes.innerHTML = ``;
  divSpinner.style.display="block";  
  const clientes = await axios.post(`/consultaClientes`,{id_admin,reg_bus,offset,reg_inp});
  let tabla = `<table class="tabla-colapse">
                <thead>
                  <tr>
                    <th>E</th>
                    <th>Nombre</th>
                    <th>Razón social</th>
                    <th>RFC</th>                   
                    <th>Detalles</th>
                    <th>Enlace</th>
                  </tr>
                </thead>
               <tbody>`;
  let correspondencia;
  for(let cliente of clientes.data[0]){
    if(cliente.cat_correspondencia){
      correspondencia = 1;
    }else{
      correspondencia = 0;
    }
    tabla += `<tr>
                <td>${correspondencia}</td>
                <td>${cliente.nombre}</td>
                <td>${cliente.nombre_legal}</td>
                <td>${cliente.rfc}</td>
                <td> 
                  <button data-idbind = ${cliente.id_bind} class="botn detalleCliente" data-target="#detalleCliente" data-toggle="modal">
                  <img src="/img/ojo.png" class="iconoChico detalleCliente" data-idbind = ${cliente.id_bind}>
                  </button>
                </td>
                <td> 
                  <button  data-idbind = ${cliente.id_bind} class="botn enlace" data-target="#enlazar" data-toggle="modal">
                  <img src="/img/enlace.png" class="iconoChico enlace" data-idbind = ${cliente.id_bind}>
                  </button>
                </td>
              </tr>`;
    }
    tabla += `</tbody>
            </table>`;
    const actualReg =  clientes.data[1] /parseInt(reg_bus) ;
    const entero = Math.trunc(actualReg);
    const residuo = clientes.data[1] % parseInt(reg_bus);
    let paginacion =``;
    let r;
    if(residuo > 0){
      r = 1;
      }else{
      r = 0;
      }
    for(let i=0;i<entero+r;i++){
        if(i == offset){
            paginacion += `<input type="text" class="botonPagina rojo" value="${i+1}" disabled>`;
        }else{
            paginacion += `<input type="text" class="botonPagina" value="${i+1}" disabled>`;
            }  
        }
    document.querySelector('.paginas').innerHTML = `<p>${paginacion}</p>`;
    document.querySelector('#reg_tot').value = clientes.data[1];
    setTimeout(
      function(){ 
        if(divSpinner){
          divSpinner.style.display="none";
        }
        espacioClientes.innerHTML = tabla;
      }, 500)
  }*/

if(espacioClientes){
  espacioClientes.addEventListener('click', async e=>{     
    if(e.target.classList.contains('detalleCliente')){    
          document.querySelector(".spinnerCliente").style.display="block";              
          document.querySelector(".espacioCliente").innerHTML = ``;    
          const valor =e.target;
          const id_bind = valor.dataset.idbind;
          const resultado = await axios.post(`/consultaCliente`,{id_bind});
          let tabla = `<table class="table table-striped">
                          <thead>
                              <tr>
                                <th>Nombre comercial</th>
                                <th>Ciudad</th>
                                <th>Email</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                <th>${resultado.data.data.CommercialName}</th>
                                <th>${resultado.data.data.City}</th>
                                <th>${resultado.data.data.Email}</th>
                              </tr>
                          </tbody>
                          <thead>
                          <tr>
                            <th>Nombre legal</th>
                            <th>Locación</th>
                            <th>Método de pago</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                            <th>${resultado.data.data.LegalName}</th>
                            <th>${resultado.data.data.Loctaion}</th>
                            <th>${resultado.data.data.PaymentMethod}</th>
                          </tr>
                      </tbody>
                      <thead>
                          <tr>
                            <th>PriceList</th>
                            <th>RFC</th>
                            <th>Estado</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                            <th>${resultado.data.data.PriceList}</th>
                            <th>${resultado.data.data.RFC}</th>
                            <th>${resultado.data.data.State}</th>
                          </tr>
                      </tbody>
                      <thead>
                        <tr>
                          <th>Estatus</th>
                          <th>Telefonos</th>
                        </tr>
                      </thead>
                      <tbody>
                          <tr>
                            <th>${resultado.data.data.Status}</th>
                            <th>${resultado.data.data.Telephones}</th>
                          </tr>
                      </tbody>
                        </table>`
          setTimeout(
            function(){              
              document.querySelector(".spinnerCliente").style.display="none";              
              document.querySelector(".espacioCliente").innerHTML = tabla;
            }, 500)
    }else if(e.target.classList.contains('enlace')){        
      const valor =e.target;
      const id_bind = valor.dataset.idbind;   
      const clienteBind = await axios.post(`/consultaClienteBase`,{id_bind});
      const nombre = clienteBind.data.nombre;
      document.querySelector('#id_bind').value = id_bind;
      document.querySelector('#nombrebind').value = nombre;
      if(clienteBind.data.cat_correspondencia){
        document.querySelector('.botonEnlace').innerHTML = ``;    
        document.querySelector('#tipo_cliente').value = clienteBind.data.cat_correspondencia.tipo_cliente;
        document.querySelector('.comboAdminWialon').innerHTML = 
        `<select class="form-control" id="id_admin">
          <option value="non">${clienteBind.data.cat_correspondencia.cat_wialoncliente.cat_admin.nombre}</option>
        </select>`; 
        document.querySelector('.comboClientes').innerHTML = 
        `<select class="form-control" id="id_wialon">
          <option value="non">${clienteBind.data.cat_correspondencia.cat_wialoncliente.nombre}</option>
        </select>`;     
        document.querySelector('#unidades').value = clienteBind.data.cat_correspondencia.cat_wialoncliente.unidades;    
      }else{
        document.querySelector('.comboClientes').innerHTML = 
        `<select class="form-control cuentaWialon" id="id_wialon">
          <option value="non">Seleccionar administrador</option>
        </select>`;
        document.querySelector('.comboAdminWialon').innerHTML = await comboAdminWialon();
        document.querySelector('#unidades').value = '';    
        const botonEnlace = `<button type="submit" class="btn btn-primary">Enlazar</button>`;
        document.querySelector('.botonEnlace').innerHTML = botonEnlace;
        document.querySelector('#tipo_cliente').value = "non";
        const admin = document.getElementById('id_admin').value;     
        document.querySelector('.comboAlmacenes').innerHTML = await comboAlmacenes(admin);
        document.querySelector('.comboProductos').innerHTML = await comboProductos(admin);
        document.querySelector('.comboServicios').innerHTML = await comboServicios(admin);
      }      
    }
  })
}

const comboAdmin = async () => {
  const admins = await axios.post(`/consultaAdmins`);  
  let comboAdmins = `<select class="form-control comboAdmins" id="id_admin">
                      <option value="non">Seleccionar</option>`;
  for(let admin of admins.data){
    comboAdmins += `<option value="${admin.id_admin}">${admin.nombre}</option>`;
  }
  comboAdmins += `</select>`;    
  return comboAdmins;
}

const comboAdminWialon = async () => {
  const admins = await axios.post(`/consultaAdminsWialons`);  
  let comboAdmins = `<select class="form-control comboAdminsWialon" id="id_adminWialon">
                      <option value="non">Seleccionar</option>`;
  for(let admin of admins.data){
    comboAdmins += `<option value="${admin.id_admin}">${admin.nombre}</option>`;
  }
  comboAdmins += `</select>`;    
  return comboAdmins;
}

const comboWialon = async (id_admin) => {
  let comboWialons;
  let clientes;
  if(id_admin === 'non'){
    comboWialons = `<select class="form-control cuentaWialon" id="id_wialon">
                    <option value="non">Seleccionar administrador</option>
                  </select>`;
  }else{
    clientes = await axios.post(`/consultaWialons`,{id_admin});  
    comboWialons = `<select class="form-control cuentaWialon" id="id_wialon">
                        <option value="non">Seleccionar</option>`;
    for(let cliente of clientes.data){
      comboWialons += `<option value="${cliente.id_wialon}">${cliente.nombre}</option>`;
    }
    comboWialons += `</select>`;    
  }  
  return comboWialons;
}

const consultaUnidades = async (id_wialon) => {  
    const clientes = await axios.post(`/consultaWialon`,{id_wialon});  
    return clientes.data;
}

const enlazarCuentas = async (id_bind,id_wialon,tipo_cliente,id_almacen,id_producto,id_servicio,precio,id_uso,unidadesF) => {
  const respuesta = await axios.post(`/enlazarCuentas`,{
    id_bind,
    id_wialon,
    tipo_cliente,
    id_almacen,
    id_producto,
    id_servicio,
    precio,
    id_uso,
    unidadesF
  });
  if(respuesta.status === 200){
    alertify.success(respuesta.data);
    setTimeout(
      function(){ 
        const id_admin = document.querySelector('#id_admin').value;
        const reg_bus = document.querySelector('#reg_bus').value;    
        const reg_inp = document.querySelector('#reg_inp').value;    
        consultaClientes(id_admin,reg_bus,'0',reg_inp);
        $('#enlazar').modal('hide');
        document.querySelector('#formularioEnlace').reset();
      }, 1000)    
  }else{
    alertify.error(respuesta.data);
  }   
}
const comboAlmacenes = async (id_admin) => {
  let comboAlmacenes;
  let almacenes;
  if(id_admin === 'non'){
    comboAlmacenes = `<select class="form-control" id="id_almacen">
                    <option value="non">Seleccionar administrador</option>
                  </select>`;
  }else{
    almacenes = await axios.post(`/consultaAlmacen`,{id_admin});  
    comboAlmacenes = `<select class="form-control" id="id_almacen">
                        <option value="non">Seleccionar</option>`;
    for(let almacen of almacenes.data){
      comboAlmacenes += `<option value="${almacen.id_almacen}">${almacen.nombre}</option>`;
    }
    comboAlmacenes += `</select>`;    
  }  
  return comboAlmacenes;
}
const comboProductos = async (id_admin,busqueda) => {
  if(!busqueda){
    busqueda = '';
  }
  let comboProductos;
  let productos;
  if(id_admin === 'non'){
    comboProductos = `<select class="form-control" id="id_producto">
                    <option value="non">Seleccionar administrador</option>
                  </select>`;
  }else{
    productos = await axios.post(`/consultaProducto`,{id_admin,busqueda});  
    comboProductos = `<select class="form-control" id="id_producto">
                        <option value="non">Seleccionar</option>`;
    for(let producto of productos.data){
      comboProductos += `<option value="${producto.id_producto}">${producto.nombre}</option>`;
    }
    comboProductos += `</select>`;    
  }  
  return comboProductos;
}

const comboServicios = async (id_admin) => {
  let comboServicios;
  let servicios;
  if(id_admin === 'non'){
    comboServicios = `<select class="form-control" id="id_servicio" disabled>
                    <option value="non">Seleccionar administrador</option>
                  </select>`;
  }else{
    servicios = await axios.post(`/consultaServicio`,{id_admin});  
    comboServicios = `<select class="form-control" id="id_servicio" disabled>
                        <option value="non">Seleccionar</option>`;
    for(let servicio of servicios.data){
      comboServicios += `<option value="${servicio.id_servicio}">${servicio.nombre}</option>`;
    }
    comboServicios += `</select>`;    
  }  
  return comboServicios;
}

const formularioEnlace = document.querySelector('#formularioEnlace');
if(formularioEnlace){    
    formularioEnlace.addEventListener('change', async e=>{ 
      if(e.target.classList.contains('comboAdminsWialon')){ 
        const id_admin = document.querySelector('#id_adminWialon').value;
        //const id_wialon = document.querySelector('#id_wialon').value;
        document.querySelector('.comboClientes').innerHTML = await comboWialon(id_admin);
        document.querySelector('#unidades').value = '';        
      }else if(e.target.classList.contains('cuentaWialon')){ 
        const id_wialon = document.querySelector('#id_wialon').value;
        const unidades = await consultaUnidades(id_wialon);
        document.querySelector('#unidades').value = unidades.unidades;
        document.querySelector('#unidadesD').value = unidades.unidades_disponibles;
        document.querySelector('#unidadesF').value = unidades.unidades_disponibles;
      }
    });
    formularioEnlace.addEventListener('keyup', async e=>{ 
      if(e.target.classList.contains('busc_producto')){ 
        const id_admin = document.querySelector('#id_admin').value;
        const busqueda = document.querySelector('#busc_producto').value;
        document.querySelector('.comboProductos').innerHTML = await comboProductos(id_admin,busqueda)
      }
    });
    formularioEnlace.addEventListener('submit', async e=>{ 
      e.preventDefault();
      const tipo = document.querySelector('#tipo_cliente');
      const wialon = document.querySelector('#id_wialon');
      const almacen = document.querySelector('#id_almacen');
      const producto = document.querySelector('#id_producto');
      const servicio = document.querySelector('#id_servicio');
      const unidadesF = document.querySelector('#unidadesF').value;
      const precio = document.querySelector('#precio').value;
      const uso = document.querySelector('#uso');
      const id_bind = document.querySelector('#id_bind').value;
      const tipo_str = tipo.options[tipo.selectedIndex].text;
      const wialon_str = wialon.options[wialon.selectedIndex].text;
      const almacen_str = almacen.options[almacen.selectedIndex].text;
      const producto_str = producto.options[producto.selectedIndex].text;
      const servicio_str = servicio.options[servicio.selectedIndex].text;
      const uso_str = uso.options[uso.selectedIndex].text;
      const bind_str = document.querySelector('#nombrebind').value;
      const id_almacen = almacen.value;
      const id_producto = producto.value;
      const id_servicio = servicio.value;
      const tipo_cliente = tipo.value;
      const id_wialon = wialon.value;
      const id_uso = uso.value;
      if(id_bind === "non" || id_wialon === "non" || tipo_cliente === "non" || id_almacen === "non"){
        alertify.error('Todos los campos son obligatorios');
        return;
      }
      if(id_producto === "non" && id_servicio === "non"){
        alertify.error('Debe de estar seleccionado un producto o un servicio');
        return;
      }
      if(!precio || isNaN(precio)){
        alertify.error('Debe de escribir un precio válido');
        return;
      }
      if(!unidadesF || parseInt(unidadesF) <= 0 ){
        alertify.error('Debe de escribir unidades a facturar');
        return;
      }
      alertify.confirm( `Enlazar cuentas`,`Está seguro de enlazar las cuentas: <br>
      Bind : <strong>${bind_str}</strong> <br>
      Wialon : <strong>${wialon_str}</strong> <br>
      Tipo : <strong>${tipo_str}</strong> <br>
      Almacén : <strong>${almacen_str}</strong> <br>
      Producto : <strong>${producto_str}</strong> <br>
      Servicio : <strong>${servicio_str}</strong> <br>
      Precio : <strong>${precio}</strong> <br>
      Uso CDFI : <strong>${id_uso}</strong> <br>
      Unidades a facturar : <strong>${unidadesF}</strong> <br>`,
      function(){ enlazarCuentas(id_bind,id_wialon,tipo_cliente,id_almacen,id_producto,id_servicio,precio,id_uso,unidadesF)}
        , function(){ alertify.error(`Se canceló`)} 
      );
      
   });
}

/* ENLAZADOS */
const factura = document.querySelector('#factura');
if(factura){
  factura.addEventListener('change', e=>{ 
    const id_admin = document.querySelector('#id_admin').value;
    const reg_bus = document.querySelector('#reg_bus').value;    
    const reg_inp = document.querySelector('#reg_inp').value;   
    const factura = document.querySelector('#factura').value; 
    const tipo_clienteE = document.querySelector('#tipo_clienteE').value; 
    consultaEnlazados(id_admin,reg_bus,'0',reg_inp,factura,tipo_clienteE);    
 });
}

const tipo_clienteE = document.querySelector('#tipo_clienteE');
if(tipo_clienteE){
  tipo_clienteE.addEventListener('change', e=>{ 
    const id_admin = document.querySelector('#id_admin').value;
    const reg_bus = document.querySelector('#reg_bus').value;    
    const reg_inp = document.querySelector('#reg_inp').value;   
    if(espacioEnlazados){
      const factura = document.querySelector('#factura').value; 
      const tipo_clienteE = document.querySelector('#tipo_clienteE').value; 
      consultaEnlazados(id_admin,reg_bus,'0',reg_inp,factura,tipo_clienteE);
    }else if(espacioFacturas){
      const mes_fact = document.querySelector('#mes_fact').value;
      const anho_fact = document.querySelector('#anho_fact').value;
      const tipo_clienteE = document.querySelector('#tipo_clienteE').value; 
      consultaFacturas(id_admin,reg_bus,'0',reg_inp,anho_fact,mes_fact,tipo_clienteE);
    } 
 });
}

const consultaEnlazados = async (id_admin,reg_bus,offset,reg_inp,factura,tipo_cliente) => {
  const enlazados = await axios.post(`/consultaEnlazados`,{id_admin,reg_bus,offset,reg_inp,factura,tipo_cliente});
  const actualizacion = await axios.post(`/consultaActUni`);
  document.querySelector('#ult_act').value = actualizacion.data;
  let tabla = `<table class="tabla-colapse">
                <thead>
                  <tr>
                    <th style="width:20%">Nombre</th>
                    <th style="width:15%">Wialon</th>
                    <th style="width:10%">RFC</th>
                    <th style="width:10%">Almacén</th>         
                    <th style="width:10%">U/E</th>
                    <th style="width:10%">U/T</th>
                    <th style="width:10%">Precio</th>          
                    <th style="width:10%">Facturar</th>
                    <th style="width:5%">Detalles</th>
                  </tr>
                </thead>
               <tbody>`;
  let valorSwitch;
  let precio;
  let totUni = 0;
  for(let enlazado of enlazados.data[0]){
    if(enlazado.estatus == "1"){
      totUni += parseInt(enlazado.unidades);
    }
    if(enlazado.tipo_cliente === "1"){
      precio = `${enlazado.precio} USD`;
    }else{
      precio = `$ ${enlazado.precio}`
    }
    if(enlazado.estatus === '1'){
      valorSwitch = "checked";
    }else{
      valorSwitch = '';
    }
    tabla += `<tr>
                <td>${enlazado.cat_bindcliente.nombre}</td>
                <td>${enlazado.cat_wialoncliente.nombre}</td>
                <td>${enlazado.cat_bindcliente.rfc}</td>
                <td>${enlazado.cat_almacene.nombre}</td>
                <td>${enlazado.unidades}</td>
                <td>${enlazado.cat_wialoncliente.unidades}</td>
                <td>${precio}</td>
                <td>                 
                <label class="switch">
                    <input ${valorSwitch} type="checkbox" data-idcor = ${enlazado.id_correspondencia}  class="selector" id="selector${enlazado.id_correspondencia}">
                    <span class="slider round"></span>
                </label>
                </td>
                <td> 
                  <button  data-idcor = ${enlazado.id_correspondencia} class="botn detallesEnlace" data-target="#detalleEnlace" data-toggle="modal">
                  <img src="/img/ojo.png" class="iconoChico detallesEnlace" data-idcor = ${enlazado.id_correspondencia}>
                  </button>
                </td>
              </tr>`;
    }
    tabla += `</tbody>
            </table>`;
    const actualReg =  enlazados.data[1] /parseInt(reg_bus) ;
    const entero = Math.trunc(actualReg);
    const residuo = enlazados.data[1] % parseInt(reg_bus);
    let paginacion =``;
    let r;
    if(residuo > 0){
      r = 1;
      }else{
      r = 0;
      }
    for(let i=0;i<entero+r;i++){
        if(i == offset){
            paginacion += `<input type="text" class="botonPagina rojo" value="${i+1}" disabled>`;
        }else{
            paginacion += `<input type="text" class="botonPagina" value="${i+1}" disabled>`;
            }  
        }
    document.querySelector('.paginas').innerHTML = `<p>${paginacion}</p>`;
    document.querySelector('#reg_tot').value = enlazados.data[1];
    document.querySelector('#tot_uni').value = totUni;
    setTimeout(
      function(){ 
        espacioEnlazados.innerHTML = tabla;
      }, 500)
  }
  const cambioEstadoFactura = async (id_correspondencia,estatus) => {
    const respuesta = await axios.post(`/cambioEstadoFactura`,{id_correspondencia,estatus});
    if(respuesta.status === 200){
      alertify.success(respuesta.data);
      setTimeout(
        function(){ 
          const id_admin = document.querySelector('#id_admin').value;
          const reg_bus = document.querySelector('#reg_bus').value;    
          const reg_inp = document.querySelector('#reg_inp').value;  
          const factura = document.querySelector('#factura').value;  
          const tipo_clienteE = document.querySelector('#tipo_clienteE').value;   
          consultaEnlazados(id_admin,reg_bus,'0',reg_inp,factura,tipo_clienteE);
        }, 1000)    
     }
  }
  const actualizarEnlazados = async () => {
    const id_correspondencia =document.querySelector('#id_correspondencia').value;
    const precio =document.querySelector('#precioBind').value;
    const unidades =document.querySelector('#unidadesEnlazadas').value;
    const respuesta = await axios.post(`/actualizarEnlazados`,{id_correspondencia,precio,unidades});
    if(respuesta.status === 200){
      alertify.success(respuesta.data);
      setTimeout(
        function(){ 
          const id_admin = document.querySelector('#id_admin').value;
          const reg_bus = document.querySelector('#reg_bus').value;    
          const reg_inp = document.querySelector('#reg_inp').value;  
          const factura = document.querySelector('#factura').value;  
          const tipo_clienteE = document.querySelector('#tipo_clienteE').value;   
          consultaEnlazados(id_admin,reg_bus,'0',reg_inp,factura,tipo_clienteE);
        }, 1000)    
     }else{
        alertify.error(respuesta.data);
     }
  }
  const consultaEnlazado = async (id_correspondencia) => {
    const respuesta = await axios.post(`/consultaEnlazado`,{id_correspondencia});
    let tipo_cliente;
    if(respuesta.data.tipo_cliente === '1'){
      tipo_cliente=`Distribuidor`;
    }else{
      tipo_cliente=`Cliente final`;
    }
    document.querySelector('#id_correspondencia').value = respuesta.data.id_correspondencia;
    document.querySelector('#nombrebind').value = respuesta.data.cat_bindcliente.nombre;
    document.querySelector('#legalBind').value = respuesta.data.cat_bindcliente.nombre_legal;
    document.querySelector('#tipoCliente').value = tipo_cliente;
    document.querySelector('#rfcBind').value = respuesta.data.cat_bindcliente.rfc;
    document.querySelector('#almacenBind').value = respuesta.data.cat_almacene.nombre;
    document.querySelector('#productoBind').value = respuesta.data.cat_producto.nombre;
    document.querySelector('#precioBind').value = respuesta.data.precio;
    document.querySelector('#nombreWialon').value = respuesta.data.cat_wialoncliente.nombre;
    document.querySelector('#unidadesEnlazadas').value = respuesta.data.unidades;
    document.querySelector('#unidadesTotales').value = respuesta.data.cat_wialoncliente.unidades;
  }
  if(espacioEnlazados){
    espacioEnlazados.addEventListener('click', async e=>{    
      if(e.target.classList.contains('selector')){      
            let valorEstatus ;            
            const valor = e.target;
            const id_correspondencia = valor.dataset.idcor;
            const estado  = document.querySelector(`#selector${id_correspondencia}`).checked;
            if(estado){
              valorEstatus = '1';
            }else{
              valorEstatus = '2';
            }
            cambioEstadoFactura(id_correspondencia,valorEstatus);               
      }else if(e.target.classList.contains('detallesEnlace')){           
        const valor = e.target;
        const id_correspondencia = valor.dataset.idcor;
            consultaEnlazado(id_correspondencia);
      }
    })
  }
  const botonActualizarEnlazado = document.querySelector('.botonActualizarEnlazado');
  if(botonActualizarEnlazado){
    botonActualizarEnlazado.addEventListener('click', e=>{    
      alertify.confirm( `Actualizar`,`Está seguro de actualizar?`,
      function(){ actualizarEnlazados();}
        , function(){ alertify.error(`Se canceló`)} 
      );
    })
  }
  const botonFactura = document.querySelector('.botonFactura');
  if(botonFactura){
    botonFactura.addEventListener('click', e=>{    
      alertify.confirm( `Facturar cuentas`,`Está seguro de empezar el proceso de facturación?`,
      function(){ procesoFacturacion();}
        , function(){ alertify.error(`Se canceló`)} 
      );
    })
  }
  const botonDesglosado = document.querySelector('.botonDesglosado');
  if(botonDesglosado){
    botonDesglosado.addEventListener('click',async e=>{
      const id_admin = document.querySelector('#id_admin').value;  
      const tipo_cliente = document.querySelector('#tipo_clienteE').value;  
      const unidades = await axios.post(`/consultaUnidadesDesglose`,{id_admin,tipo_cliente}); 
      let lista = `<ul class="list-group">`;
      let total = 0;
      for(let unidad of unidades.data){
        lista += `<li class="list-group-item">${unidad.nombre} : ${unidad.unidades}</li>`;
        total += unidad.unidades;
      }
      lista += `<li class="list-group-item">Total : ${total}</li>
                </ul>`;

      document.querySelector('.espacioDesglose').innerHTML = lista;   
      $('#verDesglose').modal('show');
    });
  }
  const procesoFacturacion = async (vuelta,id_correspondencia,error) => {    
    if(!vuelta){
    const id_admin = document.querySelector('#id_admin').value;
    const reg_inp = document.querySelector('#reg_inp').value;   
    const factura = document.querySelector('#factura').value; 
    const tipo_cliente = document.querySelector('#tipo_clienteE').value; 
    let enlazados = await axios.post(`/consultaAFacturar`,{id_admin,reg_inp,factura,tipo_cliente});    
    for(let enlazado of enlazados.data){
        enlazado.bitacoraEstatus = '0';
        enlazado.bitacoraError = '';
        enlazado.bitacoraId_bitacora_factura= '';
    }
    const enlazadoText = JSON.stringify(enlazados.data);
    sessionStorage.setItem("facturacion", enlazadoText);
    }else{
      let recuperacion = JSON.parse(sessionStorage.getItem("facturacion"));
      for(let recu of recuperacion){
        if (recu.id_correspondencia === id_correspondencia){
          recu.bitacoraError = error;
          recu.bitacoraEstatus = '1';
        }
      }
      const enlazadoText = JSON.stringify(recuperacion);
      sessionStorage.setItem("facturacion", enlazadoText);
    }
      
    let tabla = `<table class="tabla-colapse">
                  <thead>
                    <tr>
                      <th style="width:5%">#</th>  
                      <th style="width:25%">Nombre</th>
                      <th style="width:25%">Razón social</th>
                      <th style="width:10%">Wialon</th>
                      <th style="width:10%">RFC</th>         
                      <th style="width:5%">Unidades</th>
                      <th style="width:10%">Precio</th>          
                      <th style="width:10%">Facturado</th>          
                    </tr>
                  </thead>
                 <tbody>`;
    const enlazados = JSON.parse(sessionStorage.getItem("facturacion"));
    let precio;
    let totUni = 0;
    let i=0
    let partidas= [];
    let partidasObj;
    let facturado;
    for(let enlazado of enlazados){                       
        if(enlazado.bitacoraEstatus === '1'){
          if(enlazado.bitacoraError === "0"){
            facturado = `<td class="azul">Sí</td>`;
          }else{
            facturado = `<td class="rojo">No</td>`;
          }
        }else{
          facturado = `<td>Pendiente</td>` ;
        }
      i+=1;
      if(enlazado.estatus == "1"){
        totUni += parseInt(enlazado.unidades);
      }
      if(enlazado.tipo_cliente === "1"){
        precio = `${enlazado.precio} USD`;
      }else{
        precio = `$ ${enlazado.precio}`
      }
      tabla += `<tr>
                  <td>${i}</td>
                  <td>${enlazado.cat_bindcliente.nombre}</td>
                  <td>${enlazado.cat_bindcliente.nombre_legal}</td>
                  <td>${enlazado.cat_wialoncliente.nombre}</td>
                  <td>${enlazado.cat_bindcliente.rfc}</td>
                  <td>${enlazado.unidades}</td>
                  <td>${precio}</td>
                  ${facturado}
                </tr>`;
      partidas.push(enlazado.id_correspondencia);
      }
      partidasObj = JSON.stringify(partidas);      
      tabla += `</tbody>
              </table>`;
      document.querySelector('#tot_uniF').value = totUni;
      document.querySelector('#tot_parF').value = i;
      document.querySelector('#partidasObj').value = partidasObj;
      document.querySelector('.espacioFacturacion').innerHTML = tabla;    
      if(!vuelta){
        document.querySelector('#botonFacturar').disabled = false;
        $('#detalleFacturacion').modal('show');
      } 
  }

  const botonFacturar = document.querySelector('#botonFacturar');
  if(botonFacturar){
    botonFacturar.addEventListener('click', e=>{    
     const lista = document.querySelector('#partidasObj').value;
     const tipo_cliente = document.querySelector('#tipo_clienteE').value; 
     if(tipo_cliente === "1"){
       generarRemision(lista);
     }else{
       generarFactura(lista);
     }
    })
  }

  const generarRemision = async (lista) =>{
    document.querySelector('#botonFacturar').disabled = true;
    const listaJSON = JSON.parse(lista);
    for(let list of listaJSON){      
      const respuesta = await axios.post(`/generarRemision`,{list});
      console.log(respuesta);
      if(respuesta.data[0] != '1'){
        alertify.error('Error en la petición');
        procesoFacturacion('1',respuesta.data[1],'1');
      }else{
        alertify.success('Se regresó la petición satisfactoriamente');
        procesoFacturacion('1',respuesta.data[1],respuesta.data[2]);
      }
      
    }    
  }

  const generarFactura = async (lista) =>{
    document.querySelector('#botonFacturar').disabled = true;
    const listaJSON = JSON.parse(lista);
    for(let list of listaJSON){      
      const respuesta = await axios.post(`/generarFactura`,{list});
      console.log(respuesta);
      if(respuesta.data[0] != '1'){
        alertify.error('Error en la petición');
        procesoFacturacion('1',respuesta.data[1],'1');
      }else{
        alertify.success('Se regresó la petición satisfactoriamente');
        procesoFacturacion('1',respuesta.data[1],respuesta.data[2]);
      }
      
    }    
  }
/*------------------------------*/

/*DASHBOARD*/
const cambioDolarFuncion = async () => {
  const cambio = await axios.post(`/cambioDolar`);
  return cambio.data;
}
const ultimoTCFacturar = async () => {
  const tc = await axios.post(`/tcfacturar`);
  return tc.data;
}
const consultaTC = async () => {
      const tcfacturar = await ultimoTCFacturar();      
      const lista = `<ul class="list-group">
      <li class="list-group-item">Última actualización : ${tcfacturar.actualizacion}</li>
      <li class="list-group-item">TC bmx : $ ${tcfacturar.tcbmx}</li>
      <li class="list-group-item">TC ajustado 3% : $ ${tcfacturar.tcajustado}</li>
      </ul>`;
      const listaFacturar = `<ul class="list-group">
        <li class="list-group-item">Actualización : ${tcfacturar.fecha_a}</li>
        <li class="list-group-item">Porcentaje : ${tcfacturar.porcentaje} %</li>
      </ul>`;  
      const totalFacturar = `<h4>A facturar : <strong>$ ${(tcfacturar.afacturar).toFixed(2)}</strong></h4>`; 
      document.querySelector('.lista').innerHTML = lista;
      document.querySelector('.listaDatosFacturar').innerHTML = listaFacturar;
      document.querySelector('.listaFacturar').innerHTML = totalFacturar;

}
const cambioDolar = document.querySelector('#cambioDolar');
if(cambioDolar){  
    consultaTC();
}
const cambiotc = document.querySelector('#cambiotc');
if(cambiotc){   
  cambiotc.addEventListener('click', async e=>{ 
    if(e.target.classList.contains('ajustarPorcentaje')){ 
      const porcentaje = document.querySelector('#porcentajeValor').value;
      if(isNaN(porcentaje) || !porcentaje){
        alertify.error('Ingrese un valor numérico válido');
        return;
      }
      const cambio = await cambioDolarFuncion();
      //console.log(cambio);
      const resultado = await axios.post(`/ajustePorcentaje`,{
        porcentaje,
        tcbmx : cambio.valor_bmx,
        tcajustado : cambio.valor_ajustado,
        actualizacion : cambio.fecha_ultima_actualizacion
      });
      if(resultado.status === 200){
        alertify.success(resultado.data);
        setTimeout(
          function(){ 
            consultaTC();
          }, 1000)    
       }
    }
  })
}
/*------------*/

/*FACTURA*/
const consultaFacturas = async (id_admin,reg_bus,offset,reg_inp,anho_fact,mes_fact,tipo_cliente) => {
  const facturas = await axios.post(`/consultaFacturas`,{id_admin,reg_bus,offset,reg_inp,anho_fact,mes_fact,tipo_cliente});
  let tabla = `<table class="tabla-colapse">
                <thead>
                  <tr>
                    <th style="width:20%">Nombre</th>
                    <th style="width:20%">Razón social</th>
                    <th style="width:20%">Wialon</th>   
                    <th style="width:20%">Fecha</th>
                    <th style="width:10%">Estatus</th>
                    <th style="width:10%">Descargar</th>
                  </tr>
                </thead>
               <tbody>`;
  let estatus=``;
  let boton=``;
  for(let factura of facturas.data[0]){
    if(factura.error == "0"){
      estatus = '<td class="azul">Generada</td>';
      if(factura.cat_correspondencia.tipo_cliente === "1"){       
        boton = `<td> 
                    <button  data-idfactura = ${factura.id_bitacora_factura} class="botn descargaFactura">
                      <img src="/img/tickets.png" class="iconoChico descargaFactura" data-idfactura = ${factura.id_bitacora_factura}>
                    </button>
                 </td>`;
      }else{
        boton = `<td> 
                    <button  data-idfactura = ${factura.id_bitacora_factura} class="botn descargaFactura" data-target="#seleccion" data-toggle="modal">
                      <img src="/img/tickets.png" class="iconoChico descargaFactura" data-idfactura = ${factura.id_bitacora_factura}>
                    </button>
                </td>`;
      }     
    }else{
      boton =   `<td> 
                  <button  data-idfactura = ${factura.id_bitacora_factura} class="botn verError" data-target="#verError" data-toggle="modal">
                  <img src="/img/ojo.png" class="iconoChico verError" data-idfactura = ${factura.id_bitacora_factura}>
                  </button>
                </td>`;
      estatus = '<td class="rojo">Error</td>';
    }
    tabla += `<tr>
                <td>${factura.cat_correspondencia.cat_bindcliente.nombre}</td>
                <td>${factura.cat_correspondencia.cat_bindcliente.nombre_legal}</td>
                <td>${factura.cat_correspondencia.cat_wialoncliente.nombre}</td>
                <td>${factura.fecha_a}</td>
                ${estatus}
                ${boton}
              </tr>`;
    }
    tabla += `</tbody>
            </table>`;
    const actualReg =  facturas.data[1] /parseInt(reg_bus) ;
    const entero = Math.trunc(actualReg);
    const residuo = facturas.data[1] % parseInt(reg_bus);
    let paginacion =``;
    let r;
    if(residuo > 0){
      r = 1;
      }else{
      r = 0;
      }
    for(let i=0;i<entero+r;i++){
        if(i == offset){
            paginacion += `<input type="text" class="botonPagina rojo" value="${i+1}" disabled>`;
        }else{
            paginacion += `<input type="text" class="botonPagina" value="${i+1}" disabled>`;
            }  
        }
    document.querySelector('.paginas').innerHTML = `<p>${paginacion}</p>`;
    document.querySelector('#reg_tot').value = facturas.data[1];
    setTimeout(
      function(){ 
        espacioFacturas.innerHTML = tabla;
      }, 500)
  }

  const descargaFactura = async id_bitacora_factura => {
    const respuesta = await axios.post(`/descargaFactura`,{
      id_bitacora_factura
    }); 
    if(respuesta.data.tipo==="1"){
      window.open(`http://201.150.1.66/apifacturas/descargar/remision?admin=${respuesta.data.admin}&factura_id=${respuesta.data.id_factura}`, "_blank")
    }else{
      document.querySelector('#id_factura').value = respuesta.data.id_factura;
      document.querySelector('#admin').value = respuesta.data.admin;
    }
  }

  const verError = async id_bitacora_factura => {
    const respuesta = await axios.post(`/VerErrorFactura`,{
      id_bitacora_factura
    }); 
    const mensaje = `<p>${respuesta.data.message}</p>`
    document.querySelector('.errorDes').innerHTML = mensaje
  }

  if(espacioFacturas){
    espacioFacturas.addEventListener('click', async e=>{    
      if(e.target.classList.contains('descargaFactura')){        
            const valor = e.target;
            const id_bitacora_factura = valor.dataset.idfactura;
            await descargaFactura(id_bitacora_factura);        
      }if(e.target.classList.contains('verError')){        
        const valor = e.target;
        const id_bitacora_factura = valor.dataset.idfactura;
        await verError(id_bitacora_factura);        
      }
    })
  }

  const espacioEleccionFactura = document.querySelector('.espacioEleccionFactura');
  if(espacioEleccionFactura){
    espacioEleccionFactura.addEventListener('click', async e=>{ 
      const id_factura = document.querySelector('#id_factura').value;
      const admin = document.querySelector('#admin').value;
      if(e.target.classList.contains('xml')){ 
        window.open(`http://201.150.1.66/apifacturas/descargar/factura?admin=${admin}&factura_id=${id_factura}&formato=0`, "_blank")
      }else if(e.target.classList.contains('pdf')){ 
        window.open(`http://201.150.1.66/apifacturas/descargar/factura?admin=${admin}&factura_id=${id_factura}&formato=1`, "_blank")
      }
    });
  }
/*--------*/