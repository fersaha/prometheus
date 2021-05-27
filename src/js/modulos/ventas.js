import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const espacioCotizaciones = document.querySelector('.espacioCotizaciones');
const espacioProductosCotizacion = document.querySelector('.espacioProductosCotizacion');
const espacioProductosCotizacionM = document.querySelector('.espacioProductosCotizacionM');
const botonNuevaCotizacion = document.querySelector('#botonNuevaCotizacion');
const botonAgregarProducto = document.querySelector('.botonAgregarProducto');
const botonAgregarProductoM = document.querySelector('.botonAgregarProductoM');
const divSpinnerCotizaciones = document.querySelector('.divSpinnerCotizaciones');
const formularioNuevaCotizacion = document.querySelector('#formularioNuevaCotizacion');
const formularioActualizarCotizacion = document.querySelector('#formularioActualizarCotizacion');
const buscarProducto = document.querySelector('#buscarProducto');
const buscarProductoM = document.querySelector('#buscarProductoM');
const espacioProductosPDF = document.querySelector('.espacioProductosPDF');

const reg_num = document.querySelector('#reg_num');
const reg_bus = document.querySelector('#reg_bus');
const reg_tot = document.querySelector('#reg_tot');
const paginas = document.querySelector('.paginas');
const offset = document.querySelector('#offset');
//COTIZACIONES
if(paginas){
    paginas.addEventListener('click', e=>{
      if(e.target.value){
        offset.value = parseInt(e.target.value) - 1;
        if(espacioCotizaciones){
          consultaCotizaciones(); 
        }
      }
    });
  }
const consultaCotizaciones = async () =>{
    espacioCotizaciones.innerHTML = '';
    divSpinnerCotizaciones.style.display = "block";
    const registros = reg_num.value;
    let busqueda = reg_bus.value;
    if(!busqueda){
        busqueda = '-';
    }
    const off = parseInt(offset.value) * parseInt(reg_num.value);
    const cotizaciones = await axios.get(`/consultaCotizaciones/${registros}/${busqueda}/${off}`);
    reg_tot.value = cotizaciones.data[1];
    if(cotizaciones.data[0].length){
        let paginacion =``;
        let r;
        let tabla = `<table class="tabla-colapse">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Folio</th>
                            <th>Cliente</th>
                            <th>Fecha</th>
                            <th>PDF</th>
                            <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>`;
        const actualReg =  cotizaciones.data[1] /parseInt(reg_num.value) ;
        const entero = Math.trunc(actualReg);
        const residuo = cotizaciones.data[1] % parseInt(reg_num.value);
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
        for(let cotizacion of cotizaciones.data[0]){
            j+=1;
            tabla += `<tr><td>${j + off}</td>
            <td>${cotizacion.serie}-${String(cotizacion.folio).padStart(4,"0")}</td>
            <td>${cotizacion.nombre_cliente}</td>
            <td>${cotizacion.fecha_a}</td>
            <td> 
                <button  data-idcotizacion = ${cotizacion.id_cotizacion} class="botn generarPdf">
                    <img src="/img/pdf.png" class="iconoMediano generarPdf" data-idcotizacion = ${cotizacion.id_cotizacion}>
                </button>
            </td>
            <td> 
                <i data-idcotizacion = ${cotizacion.id_cotizacion} class="fas fa-edit botn editarCotizacion" data-target="#editarCotizacion" data-toggle="modal"></i>
            </td></tr>`;
        }
        tabla += `</tbody>
                    </table>`;
        divSpinnerCotizaciones.style.display="none"; 
        espacioCotizaciones.innerHTML = tabla;
        paginas.innerHTML = `<p>${paginacion}</p>`;
    }else{
        divSpinnerCotizaciones.style.display="none"; 
        espacioCotizaciones.innerHTML = `<ul class="list-group">
        <li class="list-group-item">No se encontró.</li>
        </ul>`;
        paginas.innerHTML = `-`;
    }
}

const consultaCarritoCotizacion = async () =>{
    const productos = await axios.get('/consultaComboProductos');
    let combo = `<select  class="form-control" id="id_producto">`;
    for(let producto of productos.data){
        combo += `<option value="${producto.id_producto}">${producto.nombre}</option>`;
    }
    let subtotal = 0;
    combo += `</select>`;
    document.querySelector('#comboProductos').innerHTML = combo;
    let contenido;
    const carrito = localStorage.getItem('carrito');
    if(carrito){
        if(JSON.parse(carrito).length){
            const carritoObj = JSON.parse(carrito);
            contenido = `<table class="tabla-colapse">
                         <thead>
                             <tr>
                                 <th>Producto</th>
                                 <th>Precio</th>
                                 <th>Cantidad</th>
                                 <th>Subtotal</th>
                                 <th>Editar</th>
                                 <th>Borrar</th>
                             </tr>
                         </thead>
                         <tbody>`;
            for(let producto of carritoObj){
                subtotal += parseFloat(producto.costo) * parseFloat(producto.cantidad);
             contenido += `<tr>
                                 <td>${producto.nombre}</td>
                                 <td>$ ${producto.costo}</td>
                                 <td>${producto.cantidad}</td>
                                 <td>${(producto.cantidad * producto.costo).toFixed(2)}</td>
                                 <td>
                                    <i class="fas fa-pen amarillo editarProducto" data-key=${producto.key}>
                                 </td>
                                 <td>
                                    <i class="fas fa-trash rojo quitarPartida" data-key=${producto.key}>
                                 </td>
                             </tr>`;
            }
            contenido += `</tbody></table>`;
         }else{
             contenido = `<div class="card">
             <div class="card-body">
               Aún no hay productos.
             </div>
           </div>`;
           const esqueleto  = [];
           const esqueletoStr = JSON.stringify(esqueleto);
           localStorage.setItem('carrito',esqueletoStr);
         }
    }else{
        contenido = `<div class="card">
        <div class="card-body">
          Aún no hay productos.
        </div>
      </div>`;
      const esqueleto  = [];
      const esqueletoStr = JSON.stringify(esqueleto);
      localStorage.setItem('carrito',esqueletoStr);
    }
    document.querySelector('#subTotalCotizacion').value = `$ ${subtotal.toFixed(2)}`;
    const iva = subtotal * 0.16
    document.querySelector('#iva').value = `$ ${iva.toFixed(2)}`;
    document.querySelector('#totalCotizacion').value = `$ ${(subtotal + iva).toFixed(2)}`;
    espacioProductosCotizacion.innerHTML = contenido;
};

const consultaCarritoCotizacionM = async () =>{
    const productos = await axios.get('/consultaComboProductos');
    let combo = `<select  class="form-control" id="id_productoM">`;
    for(let producto of productos.data){
        combo += `<option value="${producto.id_producto}">${producto.nombre}</option>`;
    }
    let subtotal = 0;
    combo += `</select>`;
    document.querySelector('#comboProductosM').innerHTML = combo;
    let contenido;
    const carrito = localStorage.getItem('carrito');
    if(carrito){
        if(JSON.parse(carrito).length){
            const carritoObj = JSON.parse(carrito);
            contenido = `<table class="tabla-colapse">
                         <thead>
                             <tr>
                                 <th>Producto</th>
                                 <th>Precio</th>
                                 <th>Cantidad</th>
                                 <th>Subtotal</th>
                                 <th>Editar</th>
                                 <th>Borrar</th>
                             </tr>
                         </thead>
                         <tbody>`;
            for(let producto of carritoObj){
                subtotal += parseFloat(producto.costo) * parseFloat(producto.cantidad);
             contenido += `<tr>
                                 <td>${producto.nombre}</td>
                                 <td>$ ${producto.costo}</td>
                                 <td>${producto.cantidad}</td>
                                 <td>${(producto.cantidad * producto.costo).toFixed(2)}</td>
                                 <td>
                                    <i class="fas fa-pen amarillo editarProductoM" data-key=${producto.key}>
                                 </td>
                                 <td>
                                    <i class="fas fa-trash rojo quitarPartidaM" data-key=${producto.key}>
                                 </td>
                             </tr>`;
            }
            contenido += `</tbody></table>`;
         }else{
             contenido = `<div class="card">
             <div class="card-body">
               Aún no hay productos.
             </div>
           </div>`;
           const esqueleto  = [];
           const esqueletoStr = JSON.stringify(esqueleto);
           localStorage.setItem('carrito',esqueletoStr);
         }
    }else{
        contenido = `<div class="card">
        <div class="card-body">
          Aún no hay productos.
        </div>
      </div>`;
      const esqueleto  = [];
      const esqueletoStr = JSON.stringify(esqueleto);
      localStorage.setItem('carrito',esqueletoStr);
    }
    document.querySelector('#subTotalCotizacionM').value = `$ ${subtotal.toFixed(2)}`;
    const iva = subtotal * 0.16
    document.querySelector('#ivaM').value = `$ ${iva.toFixed(2)}`;
    document.querySelector('#totalCotizacionM').value = `$ ${(subtotal + iva).toFixed(2)}`;
    espacioProductosCotizacionM.innerHTML = contenido;
};

if(espacioCotizaciones){    
    reg_bus.addEventListener('keyup', async e=>{ 
        offset.value = '0';
        consultaCotizaciones();
    });
    reg_num.addEventListener('change', async e=>{ 
        offset.value = '0';
        consultaCotizaciones();
    });
    espacioCotizaciones.addEventListener('click', async e =>{
        if(e.target.classList.contains('generarPdf')){ 
            const valor = e.target;
            const id_cotizacion = valor.dataset.idcotizacion; 
            alertify.success('Generando PDF...');
            
            await axios.post('/generarPdfCotizacion',{
                id_cotizacion
              })
                 .then(function (res) {   
                setTimeout(function(){ 
                    alertify.confirm( `Recordatorio`,
                `Recuerde revisar que su navegador no tenga bloqueo de ventanas emergentes`,
                function(){ 
                    
                },function(){ alertify.error(`OK`)} );
                  window.open(`/descargarReporte/${res.data}`,'_blank');
                }, 1000);      
            });
        }else  if(e.target.classList.contains('editarCotizacion')){ 
            const valor = e.target;
            const id_cotizacion = valor.dataset.idcotizacion; 
            const cotizacion = await axios.get(`/consultaCotizacion/${id_cotizacion}`);
            document.querySelector('#id_cotizacion').value = cotizacion.data.id_cotizacion;
            document.querySelector('#clienteCotM').value = cotizacion.data.nombre_cliente;
            document.querySelector('#folioCotM').value = `${cotizacion.data.serie}-${String(cotizacion.data.folio).padStart(4,"0")}`;
            document.querySelector('#observacionesCotM').value = cotizacion.data.observaciones;
            let carritoN = [];
            if(cotizacion.data.cat_partidas){
                for(let objeto of cotizacion.data.cat_partidas){
                    const productoObj  = {
                        nombre : objeto.descripcion,
                        key : uuidv4(),
                        costo : objeto.costo,
                        id : objeto.id_producto,
                        cantidad : objeto.cantidad
                    }
                    carritoN.push(productoObj);
                }
            }         
            localStorage.setItem('carrito',JSON.stringify(carritoN));
            consultaCarritoCotizacionM();
        }
    });
    consultaCotizaciones();
}

if(botonNuevaCotizacion){
    botonNuevaCotizacion.addEventListener('click', e=>{
        consultaCarritoCotizacion();
    });
}

if(botonAgregarProducto){
    botonAgregarProducto.addEventListener('click', async e=>{
        const producto = document.querySelector('#id_producto').value;
        const cantidad = document.querySelector('#cantidad').value;
        if(parseInt(cantidad)<1){
            alertify.error('La cantidad debe ser mayor a 0');
            return;
        }
        if(producto === 'non'){
            alertify.error('Seleccione un producto');
            return;
        }
        const detalles  = await axios.get(`/consultaProductoId/${producto}`);
        const carrito = localStorage.getItem('carrito');
        const carritoObj = JSON.parse(carrito);
        let carritoN = [];
        if(carritoObj.length){
            for(let objeto of carritoObj){
                carritoN.push(objeto);
            }
            const productoObj  = {
                nombre : detalles.data.nombre,
                key : uuidv4(),
                costo : detalles.data.costo,
                id : detalles.data.id_producto,
                cantidad 
            }
            carritoN.push(productoObj);
            localStorage.setItem('carrito',JSON.stringify(carritoN));
            consultaCarritoCotizacion();
            document.querySelector('#cantidad').value = '0';
        }else{
            const productoObj  = {
                nombre : detalles.data.nombre,
                key : uuidv4(),
                costo : detalles.data.costo,
                id : detalles.data.id_producto,
                cantidad 
            }
            carritoN.push(productoObj);
            localStorage.setItem('carrito',JSON.stringify(carritoN));
            consultaCarritoCotizacion();
            document.querySelector('#cantidad').value = '0';
        }
    });
}

if(botonAgregarProductoM){
    botonAgregarProductoM.addEventListener('click', async e=>{
        const producto = document.querySelector('#id_productoM').value;
        const cantidad = document.querySelector('#cantidadM').value;
        if(parseInt(cantidad)<1){
            alertify.error('La cantidad debe ser mayor a 0');
            return;
        }
        if(producto === 'non'){
            alertify.error('Seleccione un producto');
            return;
        }
        const detalles  = await axios.get(`/consultaProductoId/${producto}`);
        const carrito = localStorage.getItem('carrito');
        const carritoObj = JSON.parse(carrito);
        let carritoN = [];
        if(carritoObj.length){
            for(let objeto of carritoObj){
                carritoN.push(objeto);
            }
            const productoObj  = {
                nombre : detalles.data.nombre,
                key : uuidv4(),
                costo : detalles.data.costo,
                id : detalles.data.id_producto,
                cantidad 
            }
            carritoN.push(productoObj);
            localStorage.setItem('carrito',JSON.stringify(carritoN));
            consultaCarritoCotizacionM();
            document.querySelector('#cantidadM').value = '0';
        }else{
            const productoObj  = {
                nombre : detalles.data.nombre,
                key : uuidv4(),
                costo : detalles.data.costo,
                id : detalles.data.id_producto,
                cantidad 
            }
            carritoN.push(productoObj);
            localStorage.setItem('carrito',JSON.stringify(carritoN));
            consultaCarritoCotizacion();
            document.querySelector('#cantidad').value = '0';
        }
    });
}

if(espacioProductosCotizacion){
    espacioProductosCotizacion.addEventListener('click', async e =>{
        if(e.target.classList.contains('quitarPartida')){ 
            const valor = e.target;
            const key = valor.dataset.key;  
            const carrito = JSON.parse(localStorage.getItem('carrito'));
            let nuevoCarrito=[];
            for(let producto of carrito){
                if(producto.key === key){
                    continue;
                }else{
                    nuevoCarrito.push(producto);
                }
            }
            localStorage.setItem('carrito',JSON.stringify(nuevoCarrito));
            consultaCarritoCotizacion();
        }else if(e.target.classList.contains('editarProducto')){ 
            const valor = e.target;
            const key = valor.dataset.key; 
            let precio, cantidad; 
            const carrito = JSON.parse(localStorage.getItem('carrito'));
            for(let producto of carrito){
                if(producto.key === key){
                    precio = producto.costo;
                    cantidad = producto.cantidad;
                    break;
                }
            }
            document.querySelector('#cantidadNueva').value=cantidad;
            document.querySelector('#precioNuevo').value=precio;
            document.querySelector('#id_key').value=key;
            $('#editarPrecio').modal('show');
        }
    });
}

if(espacioProductosCotizacionM){
    espacioProductosCotizacionM.addEventListener('click', async e =>{
        if(e.target.classList.contains('quitarPartidaM')){ 
            const valor = e.target;
            const key = valor.dataset.key;  
            const carrito = JSON.parse(localStorage.getItem('carrito'));
            let nuevoCarrito=[];
            for(let producto of carrito){
                if(producto.key === key){
                    continue;
                }else{
                    nuevoCarrito.push(producto);
                }
            }
            localStorage.setItem('carrito',JSON.stringify(nuevoCarrito));
            consultaCarritoCotizacionM();
        }else if(e.target.classList.contains('editarProductoM')){ 
            const valor = e.target;
            const key = valor.dataset.key; 
            let precio, cantidad; 
            const carrito = JSON.parse(localStorage.getItem('carrito'));
            for(let producto of carrito){
                if(producto.key === key){
                    precio = producto.costo;
                    cantidad = producto.cantidad;
                    break;
                }
            }
            document.querySelector('#cantidadNueva').value=cantidad;
            document.querySelector('#precioNuevo').value=precio;
            document.querySelector('#id_key').value=key;
            $('#editarPrecio').modal('show');
        }
    });
}

const cambiarPrecioBoton = document.querySelector('.cambiarPrecioBoton');
if(cambiarPrecioBoton){
    cambiarPrecioBoton.addEventListener('click', async e=>{
        const costo = document.querySelector('#precioNuevo').value;
        const cantidad = document.querySelector('#cantidadNueva').value;
        const key = document.querySelector('#id_key').value;
        if((parseFloat(cantidad) < 1)|| !cantidad){
            alertify.error('La cantidad debe ser mayor a 0');
            return;
        }
        if((parseFloat(costo) < 1)|| !costo){
            alertify.error('La precio debe ser mayor a 0');
            return;
        }
        const carrito = JSON.parse(localStorage.getItem('carrito'));
        let carritoN = [];
        for(let producto of carrito){
            if(producto.key === key){
                const productoObj  = {
                    nombre : producto.nombre,
                    key ,
                    costo,
                    id : producto.id,
                    cantidad 
                }
                carritoN.push(productoObj);
            }else{
                carritoN.push(producto);
            }         
            localStorage.setItem('carrito',JSON.stringify(carritoN));
        }
        consultaCarritoCotizacionM(); 
        consultaCarritoCotizacion();        
        $('#editarPrecio').modal('hide');
        alertify.success('Producto atualizado');
    });
}


if(formularioNuevaCotizacion){
    formularioNuevaCotizacion.addEventListener('submit', e=>{
        e.preventDefault();
        const carrito = JSON.parse(localStorage.getItem('carrito'));
        const observaciones = document.querySelector('#observacionesCot').value;
        const nombre_cliente = document.querySelector('#clienteCot').value;
        if(!carrito.length){
            alertify.error('No tiene productos en el carrito');
            return;
        }
        if(!nombre_cliente){
            alertify.error('Escriba un nombre de porspecto cliente');
            return;
        }
        alertify.confirm( `Generar cotización`,
            `Está seguro de generar la cotización: <br>`,
            async function(){ 
            const respuesta = await axios.post(`/generarCotizacion`,{
                carrito,
                observaciones,
                nombre_cliente
                });
                if(respuesta.data[0] === '2'){
                    alertify.error(respuesta.data[1]);
                    return;
                }else if(respuesta.data[0] === '1'){
                    //consultaClientes();
                    alertify.success('Cotización generada');
                    consultaCotizaciones();
                    localStorage.setItem('carrito','');
                    $('#nuevaCotizacion').modal('hide');
                    return;
                }else{
                    alertify.error('Problemas en el servidor');
                    return;
                }
            },function(){ alertify.error(`Se canceló`)} );
    });
}

if(formularioActualizarCotizacion){
    formularioActualizarCotizacion.addEventListener('submit', e=>{
        e.preventDefault();
        const id_cotizacion = document.querySelector('#id_cotizacion').value;
        const carrito = JSON.parse(localStorage.getItem('carrito'));
        const observaciones = document.querySelector('#observacionesCotM').value;
        const nombre_cliente = document.querySelector('#clienteCotM').value;
        if(!carrito.length){
            alertify.error('No tiene productos en el carrito');
            return;
        }
        if(!nombre_cliente){
            alertify.error('Escriba un nombre de prospecto cliente');
            return;
        }
        alertify.confirm( `Actualizar cotización`,
            `Está seguro de actualizar la cotización: <br>`,
            async function(){ 
            const respuesta = await axios.post(`/actualizarCotizacion`,{
                carrito,
                observaciones,
                nombre_cliente,
                id_cotizacion
                });
                if(respuesta.data[0] === '2'){
                    alertify.error(respuesta.data[1]);
                    return;
                }else if(respuesta.data[0] === '1'){
                    //consultaClientes();
                    alertify.success('Cotización actualizada');
                    consultaCotizaciones();
                    localStorage.setItem('carrito','');
                    $('#editarCotizacion').modal('hide');
                    return;
                }else{
                    alertify.error('Problemas en el servidor');
                    return;
                }
            },function(){ alertify.error(`Se canceló`)} );
    });
}

if(buscarProducto){    
    buscarProducto.addEventListener('keyup', async e=>{ 
        const busqueda = buscarProducto.value;
        let productos;
        if(busqueda){
            productos = await axios.get(`/busquedaProducto/${busqueda}`);            
            let combo = `<select  class="form-control" id="id_producto">`;
            if(productos.data.length){
                for(let producto of productos.data){
                    combo += `<option value="${producto.id_producto}">${producto.nombre}</option>`;
                }
            }else{
                combo += `<option value="non">No se encontró</option>`;
            }
           
            combo += `</select>`;
            document.querySelector('#comboProductos').innerHTML = combo;
        }
    });
}

if(buscarProductoM){    
    buscarProductoM.addEventListener('keyup', async e=>{ 
        const busqueda = buscarProductoM.value;
        let productos;
        if(busqueda){
            productos = await axios.get(`/busquedaProducto/${busqueda}`);            
            let combo = `<select  class="form-control" id="id_productoM">`;
            if(productos.data.length){
                for(let producto of productos.data){
                    combo += `<option value="${producto.id_producto}">${producto.nombre}</option>`;
                }
            }else{
                combo += `<option value="non">No se encontró</option>`;
            }
           
            combo += `</select>`;
            document.querySelector('#comboProductosM').innerHTML = combo;
        }
    });
}