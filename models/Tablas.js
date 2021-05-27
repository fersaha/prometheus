const Sequelize = require('sequelize');
const db = require('../config/db');
/* exports.Distribuidor = db.define('cat_distribuidores',{
    id_distribuidor : {
        type: Sequelize.INTEGER(10),
        primaryKey : true,
        autoIncrement: true
    },
        region : Sequelize.STRING(50),
        nombre : Sequelize.STRING(50),
        estatus : Sequelize.STRING(1),
        usuario_a : Sequelize.STRING(5),
        fecha_a : Sequelize.STRING(16),
        usuario_m : Sequelize.STRING(5),
        fecha_m : Sequelize.STRING(16)
},{
        timestamps : false
});
exports.Contacto = db.define('cat_contactos',{
    id_contacto : {
        type: Sequelize.INTEGER(10),
        primaryKey : true,
        autoIncrement: true
    },
        nombre : Sequelize.STRING(100),
        telefono1 : Sequelize.STRING(20),
        telefono2 : Sequelize.STRING(20),
        correo : Sequelize.STRING(50),
        calle : Sequelize.STRING(50),
        numero : Sequelize.STRING(10),
        int : Sequelize.STRING(15),
        referencia : Sequelize.STRING(75),
        instrucciones : Sequelize.STRING(100),
        estatus : Sequelize.STRING(1),
        usuario_a : Sequelize.STRING(5),
        fecha_a : Sequelize.STRING(16),
        usuario_m : Sequelize.STRING(5),
        fecha_m : Sequelize.STRING(16)

},{
    timestamps : false
});

exports.Cuenta = db.define('cat_cuentas',{
    id_cuenta : {
        type: Sequelize.INTEGER(10),
        primaryKey : true,
        autoIncrement: true
    },
        nombre : Sequelize.STRING(50),
        apellido_p : Sequelize.STRING(50),
        apellido_m : Sequelize.STRING(50),        
        razon_social : Sequelize.STRING(100),
        rfc : Sequelize.STRING(25),
        nombre_comercial : Sequelize.STRING(50),
        calle : Sequelize.STRING(50),
        numero : Sequelize.STRING(10),
        int : Sequelize.STRING(15),
        estatus : Sequelize.STRING(1),
        usuario_a : Sequelize.STRING(5),
        fecha_a : Sequelize.STRING(16),
        usuario_m : Sequelize.STRING(5),
        fecha_m : Sequelize.STRING(16)

},{
    timestamps : false
});

exports.UsuarioWialon = db.define('cat_w_usuarios',{
    id_w_usuario : {
        type: Sequelize.INTEGER(10),
        primaryKey : true,
        autoIncrement: true
    },
        nombre : Sequelize.STRING(50),
        estatus : Sequelize.STRING(1),
        usuario_a : Sequelize.STRING(5),
        fecha_a : Sequelize.STRING(16),
        usuario_m : Sequelize.STRING(5),
        fecha_m : Sequelize.STRING(16)

},{
    timestamps : false
});

exports.Unidad = db.define('cat_unidades',{
    id_unidad : {
        type: Sequelize.INTEGER(10),
        primaryKey : true,
        autoIncrement: true
    },
        alias : Sequelize.STRING(50),
        imei : Sequelize.STRING(50),
        tipo_dispositivo : Sequelize.STRING(50),
        ultimo_mensaje : Sequelize.STRING(20),
        estatus : Sequelize.STRING(1),
        usuario_a : Sequelize.STRING(5),
        fecha_a : Sequelize.STRING(16),
        usuario_m : Sequelize.STRING(5),
        fecha_m : Sequelize.STRING(16)

},{
    timestamps : false
});

exports.Ticket = db.define('cat_tickets',{
    id_ticket : {
        type: Sequelize.INTEGER(8),
        primaryKey : true,
        autoIncrement: true
    },
        folio : Sequelize.STRING(20),
        id_unidad : Sequelize.STRING(10),
        alias : Sequelize.STRING(50),
        id_coordinador : Sequelize.STRING(4),
        id_tecnico : Sequelize.STRING(4),
        fecha_servicio : Sequelize.STRING(10),
        hora_servicio : Sequelize.STRING(5),
        referencia : Sequelize.STRING(128),
        direccion : Sequelize.STRING(256),
        ubicacion : Sequelize.STRING(75),
        estatus : Sequelize.STRING(1),
        usuario_a : Sequelize.STRING(5),
        fecha_a : Sequelize.STRING(16),
        usuario_m : Sequelize.STRING(5),
        fecha_m : Sequelize.STRING(16)

},{
    timestamps : false
});


exports.Monitoreo = db.define('cat_monitoreos',{
    id_monitoreo : {
        type: Sequelize.INTEGER(8),
        primaryKey : true,
        autoIncrement: true
    },
        id_unidad : Sequelize.STRING(10),
        alias : Sequelize.STRING(50),
        fecha_hora1 : Sequelize.STRING(16),
        fecha_hora2 : Sequelize.STRING(16),
        fecha_hora3 : Sequelize.STRING(16),
        fecha_hora4 : Sequelize.STRING(16),
        observaciones : Sequelize.STRING(256),
        estatus : Sequelize.STRING(1),
        usuario_a : Sequelize.STRING(5),
        fecha_a : Sequelize.STRING(16),
        usuario_m : Sequelize.STRING(5),
        fecha_m : Sequelize.STRING(16)

},{
    timestamps : false
}); */

exports.Perfiles = db.define('cat_perfiles',{
    id_perfil : {
        type: Sequelize.INTEGER(3),
        primaryKey : true,
        autoIncrement: true
    },
        nombre : Sequelize.STRING(50),
        privilegios : Sequelize.STRING(50),
        estatus : Sequelize.STRING(1),
        usuario_a : Sequelize.STRING(5),
        fecha_a : Sequelize.STRING(16),
        usuario_m : Sequelize.STRING(5),
        fecha_m : Sequelize.STRING(16)

},{
    timestamps : false
});

exports.Usuarios = db.define('cat_usuario',{
    id_usuario : {
        type: Sequelize.INTEGER(4),
        primaryKey : true,
        autoIncrement: true
    },
        nickname : Sequelize.STRING(25),
        password : Sequelize.STRING(60),
        nombre : Sequelize.STRING(75),
        email : Sequelize.STRING(75),
        telefono : Sequelize.STRING(20),
        estatus : Sequelize.STRING(1),
        usuario_a : Sequelize.STRING(5),
        fecha_a : Sequelize.STRING(16),
        usuario_m : Sequelize.STRING(5),
        fecha_m : Sequelize.STRING(16)
},{
    timestamps : false
});

exports.Admin = db.define('cat_admins',{
    id_admin : {
        type: Sequelize.INTEGER(8),
        primaryKey : true,
        autoIncrement: true
    },
        nombre : Sequelize.STRING(128),
        estatus : Sequelize.STRING(1),
        usuario_a : Sequelize.STRING(5),
        fecha_a : Sequelize.STRING(16),
        usuario_m : Sequelize.STRING(5),
        fecha_m : Sequelize.STRING(16)
},{
    timestamps : false
});

exports.Cliente = db.define('cat_clientes',{
    id_bind : {
        type: Sequelize.INTEGER(8),
        primaryKey : true,
        autoIncrement: true
    },
        id_cliente : Sequelize.STRING(75),
        numero : Sequelize.STRING(75),
        nombre : Sequelize.STRING(128),
        nombre_legal : Sequelize.STRING(128),
        rfc : Sequelize.STRING(20),
        email : Sequelize.STRING(256),
        telefono : Sequelize.STRING(256),
        locacion : Sequelize.STRING(75),
        estatus : Sequelize.STRING(1),
        usuario_a : Sequelize.STRING(5),
        fecha_a : Sequelize.STRING(16),
        usuario_m : Sequelize.STRING(5),
        fecha_m : Sequelize.STRING(16)
},{
    timestamps : false
});

exports.Almacen = db.define('cat_almacenes',{
    id_almacen : {
        type: Sequelize.INTEGER(8),
        primaryKey : true,
        autoIncrement: true
    },
        id : Sequelize.STRING(128),
        nombre : Sequelize.STRING(128),
        id_locacion : Sequelize.STRING(128),
        disponibleEnOtraLocacion : Sequelize.STRING(128),
        estatus : Sequelize.STRING(1),
        usuario_a : Sequelize.STRING(5),
        fecha_a : Sequelize.STRING(16),
        usuario_m : Sequelize.STRING(5),
        fecha_m : Sequelize.STRING(16)
},{
    timestamps : false
});

exports.Producto = db.define('cat_productos',{
    id_producto : {
        type: Sequelize.INTEGER(8),
        primaryKey : true,
        autoIncrement: true
    },
        id : Sequelize.STRING(128),
        id_currency : Sequelize.STRING(128),
        codigo : Sequelize.STRING(128),
        nombre : Sequelize.STRING(256),
        costo : Sequelize.DECIMAL(9,2),
        inventario : Sequelize.DECIMAL(9,2),
        numero : Sequelize.STRING(10),
        tipo : Sequelize.STRING(128),
        estatus : Sequelize.STRING(1),
        usuario_a : Sequelize.STRING(5),
        fecha_a : Sequelize.STRING(16),
        usuario_m : Sequelize.STRING(5),
        fecha_m : Sequelize.STRING(16)
},{
    timestamps : false
});

exports.Servicio = db.define('cat_servicios',{
    id_servicio : {
        type: Sequelize.INTEGER(8),
        primaryKey : true,
        autoIncrement: true
    },
        id : Sequelize.STRING(128),
        codigo : Sequelize.STRING(128),
        nombre : Sequelize.STRING(128),
        costo : Sequelize.DECIMAL(9,2),
        descripcion : Sequelize.STRING(256),
        unidad : Sequelize.STRING(128),
        id_corriente : Sequelize.STRING(128),
        codigo_corriente : Sequelize.STRING(128),
        concepto_variable : Sequelize.BOOLEAN,
        codigo_sat : Sequelize.STRING(128),
        unidad_sat : Sequelize.STRING(128),
        estatus : Sequelize.STRING(1),
        usuario_a : Sequelize.STRING(5),
        fecha_a : Sequelize.STRING(16),
        usuario_m : Sequelize.STRING(5),
        fecha_m : Sequelize.STRING(16),
},{
    timestamps : false
});

exports.InformacionCliente = db.define('cat_informacionclientes',{
    id_infocliente : {
        type: Sequelize.INTEGER(8),
        primaryKey : true,
        autoIncrement: true
    },
    ID : Sequelize.STRING(128),
    RFC : Sequelize.STRING(128),
    LegalName : Sequelize.STRING(128),
    CommercialName : Sequelize.STRING(128),
    CreditDays : Sequelize.INTEGER(8),
    CreditAmount : Sequelize.INTEGER(8),
    PaymentMethod : Sequelize.STRING(128),
    CreationDate : Sequelize.STRING(128),
    Status : Sequelize.STRING(128),
    SalesContact : Sequelize.STRING(128),
    CreditContact : Sequelize.STRING(128),
    Loctaion : Sequelize.STRING(128),
    LoctaionID : Sequelize.STRING(128),
    Comments : Sequelize.STRING(128),
    PriceList : Sequelize.STRING(128),
    PriceListID : Sequelize.STRING(128),
    PaymentTermType : Sequelize.STRING(128),
    Email : Sequelize.STRING(128),
    Telephones : Sequelize.STRING(512),
    Number : Sequelize.INTEGER(8),
    AccountNumber : Sequelize.STRING(128),
    DefaultDiscount : Sequelize.STRING(128),
    ClientSource : Sequelize.STRING(128),
    Account : Sequelize.STRING(128),
    City : Sequelize.STRING(128),
    State : Sequelize.STRING(128)
},{
    timestamps : false
});
exports.Cotizacion = db.define('cat_cotizaciones',{
    id_cotizacion : {
        type: Sequelize.INTEGER(8),
        primaryKey : true,
        autoIncrement: true
    },
        folio : Sequelize.INTEGER(9),
        serie : Sequelize.STRING(75),
        observaciones : Sequelize.STRING(256),
        estatus : Sequelize.STRING(1),
        usuario_a : Sequelize.STRING(5),
        fecha_a : Sequelize.STRING(16),
        usuario_m : Sequelize.STRING(5),
        fecha_m : Sequelize.STRING(16),
        nombre_cliente : Sequelize.STRING(128)
},{
    timestamps : false
});

exports.Partida = db.define('cat_partidas',{
    id_partida : {
        type: Sequelize.INTEGER(9),
        primaryKey : true,
        autoIncrement: true
    },
        descripcion : Sequelize.STRING(256),
        cantidad : Sequelize.DECIMAL(9,2),
        costo : Sequelize.STRING(9,2),
        id_producto : Sequelize.STRING(10),
        estatus : Sequelize.STRING(1),
        usuario_a : Sequelize.STRING(5),
        fecha_a : Sequelize.STRING(16),
        usuario_m : Sequelize.STRING(5),
        fecha_m : Sequelize.STRING(16)
},{
    timestamps : false
});
/* 

exports.Correspondencia = db.define('cat_correspondencias',{
    id_correspondencia : {
        type: Sequelize.INTEGER(8),
        primaryKey : true,
        autoIncrement: true
    },
        tipo_cliente : Sequelize.STRING(1),
        precio : Sequelize.DECIMAL(9,2),
        uso : Sequelize.STRING(10),
        unidades : Sequelize.STRING(8),
        estatus : Sequelize.STRING(1),
        usuario_a : Sequelize.STRING(5),
        fecha_a : Sequelize.STRING(16),
        usuario_m : Sequelize.STRING(5),
        fecha_m : Sequelize.STRING(16)
},{
    timestamps : false
});




exports.BitacoraFactura = db.define('cat_bitacora_facturas',{
    id_bitacora_factura : {
        type: Sequelize.INTEGER(8),
        primaryKey : true,
        autoIncrement: true
    },
        unidades : Sequelize.STRING(5),
        precio : Sequelize.DECIMAL(9,2),
        respuesta : Sequelize.STRING(1024),
        error : Sequelize.STRING(128),
        estatus : Sequelize.STRING(1),
        usuario_a : Sequelize.STRING(5),
        fecha_a : Sequelize.STRING(16),
        usuario_m : Sequelize.STRING(5),
        fecha_m : Sequelize.STRING(16),
},{
    timestamps : false
});



exports.TCinformacion = db.define('cat_tcinformaciones',{
    id_tcinformacion : {
        type: Sequelize.INTEGER(5),
        primaryKey : true,
        autoIncrement: true
    },
    tcbmx : Sequelize.DECIMAL(9,6),
    tcajustado : Sequelize.DECIMAL(9,6),
    actualizacion : Sequelize.DATEONLY,
    porcentaje : Sequelize.DECIMAL(5,2),
    afacturar : Sequelize.DECIMAL(5,2),
    estatus : Sequelize.STRING(1),
    usuario_a : Sequelize.STRING(5),
    fecha_a : Sequelize.STRING(16)    
},{
    timestamps : false
});

exports.HistorialWialon = db.define('cat_historialwialons',{
    id_historialwialon : {
        type: Sequelize.INTEGER(8),
        primaryKey : true,
        autoIncrement: true
    },
        id_cuenta : Sequelize.STRING(75),
        nombre : Sequelize.STRING(128),
        unidades : Sequelize.STRING(5),
        registro : Sequelize.STRING(10),
        estatus : Sequelize.STRING(1),
        usuario_a : Sequelize.STRING(5),
        fecha_a : Sequelize.STRING(16),
        usuario_m : Sequelize.STRING(5),
        fecha_m : Sequelize.STRING(16),
        id_admin : Sequelize.STRING(8),
},{
    timestamps : false
}); */