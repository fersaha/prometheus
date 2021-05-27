const express = require('express');
const router = express.Router();
//const peticion = require('../controllers/peticionesController');
//const soporte = require('../controllers/soporteController');
const recursos = require('../controllers/recursosController');
const catalogos = require('../controllers/catalogosController');
const facturas = require('../controllers/facturacionController');
//const reportes = require('../controllers/reportesController');
//const documentos = require('../controllers/documentosController');
const path = require('path');
const multer = require('multer');
//const webpush = require('../src/webpush');

const storage = multer.diskStorage({
	destination : path.join(__dirname, '../src/evidencias'),
    filename: (req, file, cb) =>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});
const upload = multer({
	storage,
	limits:{fileSize : 4000000},
	fileFilter: (req, file, cb)=>{
		const filetypes = /xlsx|jpeg|jpg|png|gif|pdf|/;
		const mimetype = filetypes.test(file.mimetype);
		const extname =filetypes.test(path.extname(file.originalname).toLocaleLowerCase());
		if(mimetype && extname){
			return cb(null,true);
		}else{
			cb("Error: Archivo no válido");
		}
	}
});
module.exports = function() {
    //GESTION 
    router.get('/',recursos.index); 
    router.post('/login',recursos.login); 
    router.get('/panel',recursos.panel); 
    router.get('/cerrarSesion',recursos.cerrarSesion);
    //CLIENTES
    router.get('/clientes',catalogos.clientes); 
    router.get('/consultaClientesBind',catalogos.consultaClientesBind); 
    router.get('/consultaClientes/:registros/:busqueda/:offset',catalogos.consultaClientes); 
    router.get('/consultaCliente/:id_bind',catalogos.consultaCliente); 
    //PRODUCTOS
    router.get('/productos',catalogos.productos); 
    router.get('/consultaProductoId/:id_producto',catalogos.consultaProductoId);
    router.post('/crearProducto',catalogos.crearProducto);
    router.post('/eliminarProducto',catalogos.eliminarProducto);
    router.get('/consultaComboProductos',catalogos.consultaComboProductos);
    router.get('/busquedaProducto/:busqueda',catalogos.busquedaProducto);
    router.get('/consultaProductos/:registros/:busqueda/:offset',catalogos.consultaProductos);
    //VENTAS
    router.get('/cotizaciones',facturas.cotizaciones); 
    router.post('/generarCotizacion',facturas.generarCotizacion); 
    router.post('/actualizarCotizacion',facturas.actualizarCotizacion); 
    router.get('/consultaCotizaciones/:registros/:busqueda/:offset',facturas.consultaCotizaciones);
    router.get('/consultaCotizacion/:id_cotizacion',facturas.consultaCotizacion); 
    router.post('/generarPdfCotizacion',facturas.generarPdfCotizacion); 
    router.get('/consultaPDFcotizacion/:id_cotizacion',facturas.consultaPDFcotizacion); 
    router.get('/descargarReporte/:id',facturas.descargarReporte);
    //ALMACENES 
    /*
    router.post('/consultaClientes',peticion.consultaClientes);
    
    router.post('/consultaCliente',peticion.consultaCliente); 
    router.post('/consultaClienteBase',peticion.consultaClienteBase); 
    router.get('/consultaClientesWialon',peticion.consultaClientesWialon);
    router.get('/ingresaBinds',peticion.ingresaBinds); 
    router.post('/consultaEnlace',peticion.consultaEnlace);
    router.post('/consultaUsuarios',peticion.consultaUsuarios);     
    router.post('/consultaAdmins',peticion.consultaAdmins); 
    router.post('/consultaAdminsWialons',peticion.consultaAdminsWialons); 
    router.post('/consultaWialons',peticion.consultaWialons);
    router.post('/consultaWialon',peticion.consultaWialon); 
    router.post('/enlazarCuentas',peticion.enlazarCuentas);
    router.post('/consultaAlmacen',peticion.consultaAlmacen); 
    router.post('/consultaProducto',peticion.consultaProducto); 
    router.post('/consultaServicio',peticion.consultaServicio); 

    router.get('/enlazados',facturas.enlazados);
    router.post('/consultaEnlazados',facturas.consultaEnlazados);
    router.post('/consultaEnlazado',facturas.consultaEnlazado);
    router.post('/actualizarEnlazados',facturas.actualizarEnlazados);
    router.post('/cambioEstadoFactura',facturas.cambioEstadoFactura);
    router.post('/consultaActUni',peticion.consultaActUni);
    router.post('/consultaAFacturar',facturas.consultaAFacturar);
    router.post('/generarRemision',facturas.generarRemision);
    router.post('/generarFactura',facturas.generarFactura);
    router.post('/cambiarEstatusBitacora',facturas.cambiarEstatusBitacora);
    router.get('/reportes',reportes.reportes);
    router.get('/8899',facturas.generarRemision);


    router.get('/dashboard',facturas.dashboard);
    router.post('/cambioDolar',facturas.cambioDolar);
    router.post('/tcfacturar',facturas.tcfacturar);
    router.post('/ajustePorcentaje',facturas.ajustePorcentaje);

    router.post('/consultaUnidadesDesglose',facturas.consultaUnidadesDesglose);    
    router.get('/facturas',facturas.facturas);
    router.post('/consultaFacturas',facturas.consultaFacturas);
    router.post('/descargaFactura',facturas.descargaFactura);
    router.post('/verErrorFactura',facturas.verErrorFactura);


    router.post('/ordenarCuentas',peticion.ordenarCuentas);     
    router.get('/tickets',soporte.tickets); 
    router.post('/generarTicket',soporte.generarTicket);  
    router.post('/consultaMonitoreo',soporte.consultaMonitoreo);    
    router.post('/agregarCheck',soporte.agregarCheck);  
    router.get('/perfiles',recursos.perfiles); 
    router.post('/consultaPerfiles',recursos.consultaPerfiles); 
    router.get('/usuarios',recursos.usuarios); 
    router.post('/consultaUsuariosSis',recursos.consultaUsuariosSis);  
    router.post('/consultaComboPerfiles',recursos.consultaComboPerfiles); 
    router.post('/agregarUsuario',recursos.agregarUsuario); 
    router.post('/modificarUsuario',recursos.modificarUsuario);  
    router.post('/agregarPerfil',recursos.agregarPerfil);  
    router.post('/modificarPerfil',recursos.modificarPerfil);
    router.post('/modificarPassword',recursos.modificarPassword);
    router.post('/guardarComentario',soporte.guardarComentario);  
    router.post('/levantarMonitoreo',soporte.levantarMonitoreo);  
    router.get('/consultaCoordinador',soporte.consultaCoordinador);  
    router.get('/consultaMonitoreoTicket/:id_ticket',soporte.consultaMonitoreoTicket); 
    router.get('/comboTecnicos',soporte.comboTecnicos); 
    router.post('/asignarTecnico',soporte.asignarTecnico);  
    router.get('/consultaHistorial/:id_unidad',soporte.consultaHistorial); 
    router.get('/servicios',soporte.servicios); 
    router.post('/subirEvidencia',upload.single('archivo'),soporte.subirEvidencia); 
    router.post('/consultaTicket',soporte.consultaTicket); 
    router.post('/consultaEvidencias',soporte.consultaEvidencias); 
    router.post('/consultaEvidencias',soporte.consultaEvidencias);
    router.post('/consultaNotificacion',recursos.consultaNotificacion); */
    //router.post('/subscripcion',recursos.subscripcion);
    //router.post('/notificacion',recursos.notificacion);
    //router.post('/cerrarTicket',soporte.cerrarTicket); 

    //REPORTES//
    //router.post('/consultaReporteUnidades',reportes.consultaReporteUnidades); 
    //XLXS///
    //router.get('/cargaxlsx',documentos.cargaxlsx);
    //router.get('/PDFTruck',documentos.PDFTruck);
    //router.post('/subirArchivo',upload.single('archivo'),documentos.subirArchivo);
    return router   
}