import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


const reg_num = document.querySelector('#reg_num');
const reg_bus = document.querySelector('#reg_bus');
const reg_tot = document.querySelector('#reg_tot');
const divSpinnerClientes = document.querySelector('.divSpinnerClientes');
const divSpinnerProductos = document.querySelector('.divSpinnerProductos');
const divSpinnerClienteDetalle = document.querySelector('.divSpinnerClienteDetalle');
const divSpinnerModalPN = document.querySelector('.divSpinnerModalPN');
const inputsPN = document.querySelector('.inputsPN');
const espacioClienteDetalle = document.querySelector('.espacioClienteDetalle');
const paginas = document.querySelector('.paginas');
const offset = document.querySelector('#offset');
const espacioCatClientes = document.querySelector('.espacioCatClientes');
const espacioCatProductos = document.querySelector('.espacioCatProductos');
const formularioCrearProducto = document.querySelector('#formularioCrearProducto');
const botonCrearProducto = document.querySelector('.botonCrearProducto');




if(paginas){
  paginas.addEventListener('click', e=>{
    if(e.target.value){
      offset.value = parseInt(e.target.value) - 1;
      if(espacioCatClientes){
        consultaCatClientes(); 
      }else if(espacioCatProductos){
        consultaCatProductos();
      }
      /*else if(espacioFacturas){
        const mes_fact = document.querySelector('#mes_fact').value;
        const anho_fact = document.querySelector('#anho_fact').value;
        const tipo_clienteE = document.querySelector('#tipo_clienteE').value; 
        consultaFacturas(id_admin,reg_bus,offset,reg_inp,anho_fact,mes_fact,tipo_clienteE);
      } */   
    }
  });
}

const consultaCatClientes = async () => {
    espacioCatClientes.innerHTML = '';
    divSpinnerClientes.style.display="block"; 
    const registros = reg_num.value;
    let busqueda = reg_bus.value;
    if(!busqueda){
        busqueda = '-';
    }
    const off = parseInt(offset.value) * parseInt(reg_num.value);
    const clientes = await axios.get(`/consultaClientes/${registros}/${busqueda}/${off}`);
    reg_tot.value = clientes.data[1];
    if(clientes.data[0].length){
        let paginacion =``;
        let r;
        let tabla = `<table class="tabla-colapse">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Razón social</th>
                            <th>RFC</th>
                            <th>Teléfono</th>
                            <th>Detalles</th>
                            </tr>
                        </thead>
                        <tbody>`;
        const actualReg =  clientes.data[1] /parseInt(reg_num.value) ;
        const entero = Math.trunc(actualReg);
        const residuo = clientes.data[1] % parseInt(reg_num.value);
        if(residuo > 0){
            r = 1;
            }else{
            r = 0;
            }
        for(let i=0;i<entero+r;i++){
            if(i == offset.value){
                  paginacion += `<input type="text" class="botonPagina rojo" value="${i+1}" disabled>`;
            }else{
                  paginacion += `<input type="text" class="botonPagina" value="${i+1}" disabled>`;
                }  
        }
        let j = 0;
        for(let cliente of clientes.data[0]){
            j+=1;
            tabla += `<tr><td>${j + off}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.nombre_legal}</td>
            <td>${cliente.rfc}</td>
            <td>${cliente.telefono}</td>
            <td> 
                <button  data-idbind = ${cliente.id_bind} class="botn detallesCliente" data-target="#detalleCliente" data-toggle="modal">
                  <img src="/img/ojo.png" class="iconoChico detallesCliente" data-idbind = ${cliente.id_bind}>
                </button>
            </td></tr>`;
        }
        tabla += `</tbody>
                    </table>`;
                   // console.log(clientes.data[1]);
        divSpinnerClientes.style.display="none"; 
        espacioCatClientes.innerHTML = tabla;
        paginas.innerHTML = `<p>${paginacion}</p>`;
    }else{
        divSpinnerClientes.style.display="none"; 
        espacioCatClientes.innerHTML = `<ul class="list-group">
        <li class="list-group-item">No se encontró.</li>
        </ul>`;
        paginas.innerHTML = `-`;
    }
}
if(espacioCatClientes){
    reg_bus.addEventListener('keyup', async e=>{ 
        offset.value = '0';
        consultaCatClientes();
    });
    reg_num.addEventListener('change', async e=>{ 
        offset.value = '0';
        consultaCatClientes();
    });
    espacioCatClientes.addEventListener('click', async e=>{     
        if(e.target.classList.contains('detallesCliente')){    
              espacioClienteDetalle.innerHTML = ``;   
              divSpinnerClienteDetalle.style.display="block";             
              const valor =e.target;
              const id_bind = valor.dataset.idbind;
              const cliente = await axios.get(`/consultaCliente/${id_bind}`);
              divSpinnerClienteDetalle.style.display="none"; 
              espacioClienteDetalle.innerHTML = `<ul class="list-group">
              <li class="list-group-item">Nombre : ${cliente.data.nombre}</li>
              <li class="list-group-item">Razón social : ${cliente.data.nombre_legal}</li>
              <li class="list-group-item">RFC : ${cliente.data.rfc}</li>
              <li class="list-group-item">Teléfono : ${cliente.data.telefono}</li>
              <li class="list-group-item">E-mail : ${cliente.data.email}</li>
              <li class="list-group-item">Método de pago : ${cliente.data.cat_informacioncliente.PaymentMethod}</li>
              <li class="list-group-item">Ciudad : ${cliente.data.cat_informacioncliente.City}</li>
              <li class="list-group-item">Estado : ${cliente.data.cat_informacioncliente.State}</li>
              </ul>`;
          
        }
    })
    consultaCatClientes();
}
const consultaCatProductos = async () => {
    espacioCatProductos.innerHTML = '';
    divSpinnerProductos.style.display="block"; 
    divSpinnerModalPN.style.display="none";
    const registros = reg_num.value;
    let busqueda = reg_bus.value;
    if(!busqueda){
        busqueda = '-';
    }
    const off = parseInt(offset.value) * parseInt(reg_num.value);
    const productos = await axios.get(`/consultaProductos/${registros}/${busqueda}/${off}`);
    reg_tot.value = productos.data[1];
    if(productos.data[0].length){
        let clase;
        let paginacion =``;
        let r;
        let tabla = `<table class="tabla-colapse">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Código</th>
                            <th>Tipo</th>
                            <th>Costo</th>
                            <th>Inventario</th>
                            <th>Detalle</th>
                            <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>`;
        const actualReg =  productos.data[1] /parseInt(reg_num.value) ;
        const entero = Math.trunc(actualReg);
        const residuo = productos.data[1] % parseInt(reg_num.value);
        if(residuo > 0){
            r = 1;
            }else{
            r = 0;
            }
        for(let i=0;i<entero+r;i++){
            if(i == offset.value){
                  paginacion += `<input type="text" class="botonPagina rojo" value="${i+1}" disabled>`;
            }else{
                  paginacion += `<input type="text" class="botonPagina" value="${i+1}" disabled>`;
                }  
        }
        let j = 0;
        for(let producto of productos.data[0]){
            if(producto.inventario === 0){
                clase = 'rojo';
            }else{
                clase = 'azul';
            }
            j+=1;
            tabla += `<tr><td>${j + off}</td>
            <td>${producto.nombre}</td>
            <td>${producto.codigo}</td>
            <td>${producto.tipo}</td>
            <td>$ ${producto.costo}</td>
            <td class="${clase}">${producto.inventario}</td>
            <td>
                <i class="fas fa-eye amarillo detalleProducto" data-toggle="modal" data-target="#detalleProducto" data-idproducto=${producto.id_producto}>
            </td>
            <td>
                <i class="fas fa-bomb rojo eliminarProducto" data-idproducto=${producto.id_producto}>
            </td>
            </tr>`;
        }
        tabla += `</tbody>
                    </table>`;
                   // console.log(clientes.data[1]);
        divSpinnerProductos.style.display="none"; 
        espacioCatProductos.innerHTML = tabla;
        paginas.innerHTML = `<p>${paginacion}</p>`;
    }else{
        divSpinnerProductos.style.display="none"; 
        espacioCatProductos.innerHTML = `<ul class="list-group">
        <li class="list-group-item">No se encontró.</li>
        </ul>`;
        paginas.innerHTML = `-`;
    }
}

if(espacioCatProductos){
    reg_bus.addEventListener('keyup', async e=>{ 
        offset.value = '0';
        consultaCatProductos();
    });
    reg_num.addEventListener('change', async e=>{ 
        offset.value = '0';
        consultaCatProductos();
    });
    espacioCatProductos.addEventListener('click', async e=>{     
        if(e.target.classList.contains('detalleProducto')){    
              espacioClienteDetalle.style.display = 'none';   
              divSpinnerClienteDetalle.style.display="block"; 
              const valor =e.target;
              const id_producto = valor.dataset.idproducto;
              let tipo;
              const producto = await axios.get(`/consultaProductoId/${id_producto}`); 
              if(producto.data.tipo==="Producto Terminado"){
                tipo ="0";
                }else if(producto.data.tipo==="Materia Prima"){
                tipo ="1";
                }else if(producto.data.tipo==="Materia Prima y Producto Terminado"){
                tipo ="2";
                }
              document.querySelector('#tituloMP').value = producto.data.nombre;
              document.querySelector('#codigoMP').value = producto.data.codigo;
              document.querySelector('#costoMP').value = producto.data.costo;
              document.querySelector('#inventarioMP').value = producto.data.inventario;
              document.querySelector('#tipoMP').value = tipo;
              espacioClienteDetalle.style.display = 'block';   
              divSpinnerClienteDetalle.style.display="none";
              console.log(producto.data);
              /*           
              
              divSpinnerClienteDetalle.style.display="none"; 
              espacioClienteDetalle.innerHTML = `<ul class="list-group">
              <li class="list-group-item">Nombre : ${cliente.data.nombre}</li>
              <li class="list-group-item">Razón social : ${cliente.data.nombre_legal}</li>
              <li class="list-group-item">RFC : ${cliente.data.rfc}</li>
              <li class="list-group-item">Teléfono : ${cliente.data.telefono}</li>
              <li class="list-group-item">E-mail : ${cliente.data.email}</li>
              <li class="list-group-item">Método de pago : ${cliente.data.cat_informacioncliente.PaymentMethod}</li>
              <li class="list-group-item">Ciudad : ${cliente.data.cat_informacioncliente.City}</li>
              <li class="list-group-item">Estado : ${cliente.data.cat_informacioncliente.State}</li>
              </ul>`;
              [1:05 p. m., 17/5/2021] Fers: EDITAR PRODUCTO
/bind/editProduct

Parametros:

admin = string / requerido
id_producto = string / requerido
codigo = string / requerido
titulo = string / requerido
costo = double / requerido
currency_id = string / requerido
tipo_cambio = double / opcional
sku = string / opcional
descripcion = string / opcional
tipo_costo = int / opcional
numero = int / opcional
unidad = string / requerido
tipo = string / opcional
[1:06 p. m., 17/5/2021] Fers🤖: Hiciste lo correcto
[1:09 p. m., 17/5/2021] Fers: este me equivoque
[1:09 p. m., 17/5/2021] Fers: tipo = int / opcional
[1:10 p. m., 17/5/2021] Fers: es int no string
[1:11 p. m., 17/5/2021] Fers: y se espera lo siguiente:

Producto Terminado = 0
Materia Prima = 1
Materia Prima y Producto Terminado = 2*/

          
        }else if(e.target.classList.contains('eliminarProducto')){     
            const valor =e.target;
            const id_producto = valor.dataset.idproducto;
            const producto = await axios.get(`/consultaProductoId/${id_producto}`);     
            alertify.confirm( `Crear producto`,
            `Está seguro de eliminar el producto: <br>
             <p>Nombre : <strong>${producto.data.nombre}</strong></p>
             <p>Código : <strong>${producto.data.codigo}</strong></p>  `,
            async function(){ 
            const respuesta = await axios.post(`/eliminarProducto`,{
                id_producto,
                id : producto.data.id
                });
                if(respuesta.data[0] === '2'){
                    alertify.error(respuesta.data[1]);
                    return;
                }else if(respuesta.data[0] === '1'){
                    alertify.success('Producto eliminado');
                    consultaCatProductos();
                    return;
                }else{
                    alertify.error('Problemas en el servidor');
                    return;
                }
            },function(){ alertify.error(`Se canceló`)} );       
        
      }
    })
    consultaCatProductos();
}

if(formularioCrearProducto){
    formularioCrearProducto.addEventListener('submit', e=>{
        e.preventDefault();
        const titulo = document.querySelector('#tituloNP').value;
        const codigo = document.querySelector('#codigoNP').value;
        const costo = document.querySelector('#costoNP').value;
        const precio = document.querySelector('#precioNP').value;
        const currency_id = document.querySelector('#currency_id').value;
        if(!titulo){
            alertify.error('Escriba un título');
            return;
        }
        if(!codigo){
            alertify.error('Escriba un código');
            return;
        }
        if(!costo){
            alertify.error('Escriba un costo');
            return;
        }
        if(!precio){
            alertify.error('Escriba un precio');
            return;
        }
        alertify.confirm( `Crear producto`,
            `Está seguro de crear el producto: <br>`,
            async function(){ 
            divSpinnerModalPN.style.display = "block";
            inputsPN.style.display = "none";
            botonCrearProducto.disabled = true;
            const respuesta = await axios.post(`/crearProducto`,{
                titulo,
                codigo,
                costo,
                precio,
                currency_id
                });
                if(respuesta.data[0] === '2'){
                    alertify.error(respuesta.data[1]);
                    divSpinnerModalPN.style.display = "none";
                    inputsPN.style.display = "block";
                    botonCrearProducto.disabled = false;
                    return;
                }else if(respuesta.data[0] === '1'){
                    //consultaClientes();
                    divSpinnerModalPN.style.display = "none";
                    inputsPN.style.display = "block";
                    botonCrearProducto.disabled = false;
                    alertify.success('Producto generado');
                    document.querySelector('#tituloNP').value = null;
                    document.querySelector('#codigoNP').value = null;
                    document.querySelector('#costoNP').value = null;
                    document.querySelector('#precioNP').value = null;
                    consultaCatProductos();
                    $('#crearProducto').modal('hide');
                    return;
                }else{
                    divSpinnerModalPN.style.display = "none";
                    inputsPN.style.display = "block";
                    alertify.error('Problemas en el servidor');
                    botonCrearProducto.disabled = false;
                    return;
                }
            },function(){ alertify.error(`Se canceló`)} );
    });
}