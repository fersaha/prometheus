require('dotenv').config();
const express = require('express');
const app = express();
const fs = require('fs');
const http = require('http').createServer(app);
const session = require('express-session');
const routes = require('./routes');
const path = require('path');
const Sequelize = require('sequelize');
const db = require('./config/db'); 
const bodyParser = require('body-parser');
const Tablas = require('./models/Tablas');

db.sync()
    .then(() => console.log('BD'))
    .catch(error => console.log(error))

app.use(session({
    name: 'Prometheus',
    resave:false,
	//rolling : false,
	saveUninitialized : true,
	secret: 'ssh!quiet,it\'asecret!'
}));

Tablas.Perfiles.hasMany(Tablas.Usuarios,{
	foreignKey: 'id_perfil'
});
Tablas.Usuarios.belongsTo(Tablas.Perfiles,{
	foreignKey: 'id_perfil'
});
Tablas.Admin.hasMany(Tablas.Cliente,{
	foreignKey: 'id_admin'
});
Tablas.Cliente.belongsTo(Tablas.Admin,{
	foreignKey: 'id_admin'
});

Tablas.Admin.hasMany(Tablas.Almacen,{
	foreignKey: 'id_admin'
});
Tablas.Almacen.belongsTo(Tablas.Admin,{
	foreignKey: 'id_admin'
});

Tablas.Admin.hasMany(Tablas.Producto,{
	foreignKey: 'id_admin'
});
Tablas.Producto.belongsTo(Tablas.Admin,{
	foreignKey: 'id_admin'
});

Tablas.Admin.hasMany(Tablas.Servicio,{
	foreignKey: 'id_admin'
});
Tablas.Servicio.belongsTo(Tablas.Admin,{
	foreignKey: 'id_admin'
});
Tablas.Cliente.hasOne(Tablas.InformacionCliente,{
	foreignKey: 'id_clientebind'
});
Tablas.InformacionCliente.belongsTo(Tablas.Cliente,{
	foreignKey: 'id_clientebind'
});

Tablas.Cotizacion.hasMany(Tablas.Partida,{
	foreignKey: 'id_cotizacion'
});
Tablas.Partida.belongsTo(Tablas.Cotizacion,{
	foreignKey: 'id_cotizacion'
});

/*


Tablas.Ticket.hasOne(Tablas.Evidencia,{
	foreignKey: 'id_ticket'
});
Tablas.Evidencia.belongsTo(Tablas.Ticket,{
	foreignKey: 'id_ticket'
});


Tablas.ClienteBind.hasOne(Tablas.Correspondencia,{
	foreignKey: 'id_bind'
});
Tablas.Correspondencia.belongsTo(Tablas.ClienteBind,{
	foreignKey: 'id_bind'
});

Tablas.ClienteWialon.hasOne(Tablas.Correspondencia,{
	foreignKey: 'id_Wialon'
});
Tablas.Correspondencia.belongsTo(Tablas.ClienteWialon,{
	foreignKey: 'id_Wialon'
});

Tablas.Almacen.hasMany(Tablas.Correspondencia,{
	foreignKey: 'id_almacen'
});
Tablas.Correspondencia.belongsTo(Tablas.Almacen,{
	foreignKey: 'id_almacen'
});

Tablas.Producto.hasMany(Tablas.Correspondencia,{
	foreignKey: 'id_producto'
});
Tablas.Correspondencia.belongsTo(Tablas.Producto,{
	foreignKey: 'id_producto'
});

Tablas.Servicio.hasOne(Tablas.Correspondencia,{
	foreignKey: 'id_servicio'
});
Tablas.Correspondencia.belongsTo(Tablas.Servicio,{
	foreignKey: 'id_servicio'
});



Tablas.Admin.hasOne(Tablas.ClienteWialon,{
	foreignKey: 'id_admin'
});
Tablas.ClienteWialon.belongsTo(Tablas.Admin,{
	foreignKey: 'id_admin'
});



Tablas.Correspondencia.hasMany(Tablas.BitacoraFactura,{
	foreignKey: 'id_correspondencia'
});
Tablas.BitacoraFactura.belongsTo(Tablas.Correspondencia,{
	foreignKey: 'id_correspondencia'
});


Tablas.TCinformacion.hasOne(Tablas.BitacoraFactura,{
	foreignKey: 'id_tc'
});
Tablas.BitacoraFactura.belongsTo(Tablas.TCinformacion,{
	foreignKey: 'id_tc'
});*/

const {
	PORT= 3000,
} = process.env

app.use(bodyParser.urlencoded({
	extended : true
}));

app.use(express.static(path.join(__dirname,'src')));

app.set('view engine','pug');

app.set('views',path.join(__dirname, './views'));

app.use(express.json({extended: true}));

app.use('/',routes());

/*https.createServer({
	key : fs.readFileSync('SSL/key.pem','utf8') ,
	cert : fs.readFileSync('SSL/certificate.crt','utf8') 
	});*/

http.listen(PORT, function(){
		console.log("My http server listening on port " + PORT + "...");
	});

//app.listen(PORT);