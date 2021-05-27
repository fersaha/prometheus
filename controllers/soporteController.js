const axios = require('axios');
const bcrypt = require('bcryptjs');
const requestIp = require('request-ip');
const Tablas = require('../models/Tablas');
const  Sequelize  = require('sequelize');
const recursos = require('./recursosController');
const { STRING } = require('sequelize');

exports.tickets = async (req,res) => {
    if(!req.session.userId){  
        res.redirect('/');
    }else{
        const usuario = req.session.userId ;
        const privilegios = req.session.privilegios;
        const perfil = req.session.perfil;
        const priv = privilegios.split('');
        if(priv[1] !== '1'){ 
            let tickets;
            if(perfil === 1){
                tickets = await Tablas.Ticket.findAll();
            }else{
                tickets = await Tablas.Ticket.findAll({
                    where : {
                        id_coordinador : usuario
                    }
                });
            }
            for(let ticket of tickets){
                if(ticket.id_tecnico){
                    const nombre = await Tablas.Usuarios.findOne({
                        where : {
                            id_usuario : ticket.id_tecnico
                        },
                        attributes : ['nombre']
                    });
                    ticket.nombre = nombre.nombre;
                }               
            }
            res.render('tickets', {
                nombrePagina: 'Tickets' ,
                usuario,
                priv,
                tickets,
                titulo : 'Tickets'      
            }); 
        }else{            
            res.redirect('/');
        }
            
    }
 }

 exports.generarTicket = async (req,res) => {
    const {id_monitoreo} = (req.body);
    const {id_unidad} = (req.body);
    const {alias2} = (req.body);
    const {id_coordinador} = (req.body);
    const usuario_m = req.session.userId;
    const fecha_m = `${(await recursos.pedirFecha()).fecha} ${(await recursos.pedirFecha()).horario}`;
    await Tablas.Monitoreo.update({
            fecha_m,
            usuario_m,
            estatus : '1'
        },{
            where :{
                id_monitoreo
            }
        });
    const resultado = await Tablas.Ticket.create({
        id_unidad,
        alias : alias2,
        estatus : '4',
        fecha_a : fecha_m,
        usuario_a : usuario_m,
        id_coordinador,
        id_monitoreo});
    const fechaFolio = `${(await recursos.pedirFecha()).anho2}${(await recursos.pedirFecha()).mes}${(await recursos.pedirFecha()).dia}${(await recursos.pedirFecha()).hora}${(await recursos.pedirFecha()).minuto}`;
    //console.log(`------------${resultado.id_ticket}----------`);
    const llena = (String(resultado.id_ticket)).padStart(5,'0');
    const folio = `${llena}-${fechaFolio}`;
    await Tablas.Ticket.update({
        folio},{
            where :{
                id_ticket : resultado.id_ticket
            }
        }
    );
        if(!resultado) return next();
        res.status(200).send('Se genero el ticket exitosamente');
}

exports.consultaCoordinador = async (req,res) => {
    const coordinadores =await Tablas.Usuarios.findAll({         
            where :{
                estatus : '1',
                id_perfil : 2
            },
            attributes : ['nombre','id_usuario']
        });    
    res.send(coordinadores);
}

exports.consultaMonitoreo = async (req,res) => {
    const {id_unidad} = (req.body);
    const {alias2} = (req.body);
    let monitoreo;
    const existe = await Tablas.Monitoreo.findOne({
        where :{
            id_unidad,
            estatus : '4'
        } });
    if(!existe){
        const usuario_a = req.session.userId;
        const fecha_a = `${(await recursos.pedirFecha()).fecha} ${(await recursos.pedirFecha()).horario}`
        monitoreo = await Tablas.Monitoreo.create({
            id_unidad,
            estatus : '4',
            fecha_a,
            usuario_a,
            alias : alias2,
            fecha_hora1 : '0',
            fecha_hora2 : '0',
            fecha_hora3 : '0',
            fecha_hora4 : '0',
            observaciones : ''
        });
    }else{
        monitoreo = existe;
    } 
    res.send(monitoreo);
}
exports.guardarComentario = async (req,res) => {
    const {id_monitoreo} = (req.body);
    const {observacion} = (req.body);
    const usuario_m = req.session.userId;
    const fecha_m = `${(await recursos.pedirFecha()).fecha} ${(await recursos.pedirFecha()).horario}`
    const resultado = await Tablas.Monitoreo.update({
            fecha_m,
            usuario_m,
            observaciones : observacion
        },{
            where :{
                id_monitoreo
            }
        });
        if(!resultado) return next();
        res.status(200).send('Se guardo la observacion exitosamente');
}
exports.levantarMonitoreo = async (req,res) => {
    const {id_monitoreo} = (req.body);
    const usuario_m = req.session.userId;
    const fecha_m = `${(await recursos.pedirFecha()).fecha} ${(await recursos.pedirFecha()).horario}`
    const resultado = await Tablas.Monitoreo.update({
            fecha_m,
            usuario_m,
            estatus : '1'
        },{
            where :{
                id_monitoreo
            }
        });
        if(!resultado) return next();
        res.status(200).send('Se levanto el monitoreo satisfactoriamente');
}
exports.agregarCheck = async (req,res) => {
    const {id_monitoreo} = (req.body);
    const {actividad} = (req.body);
    let fecha_hora;
    if(actividad === '1'){
        fecha_hora = `fecha_hora1`;
    }else if(actividad === '2'){
        fecha_hora = `fecha_hora2`;
    }else if(actividad === '3'){
        fecha_hora = `fecha_hora3`;
    }
    const usuario_m = req.session.userId;
    const fecha_m = `${(await recursos.pedirFecha()).fecha} ${(await recursos.pedirFecha()).horario}`
    const resultado = await Tablas.Monitoreo.update({           
            fecha_m,
            usuario_m,
            [fecha_hora] : fecha_m
        },{
            where :{
                id_monitoreo
            }
        });
    if(!resultado) return next();
    res.status(200).send(`Se completo la actividad ${actividad} exitosamente`);
}
exports.consultaMonitoreoTicket = async (req,res) => {
    const {id_ticket} = (req.params);
    const id_monitoreo = await Tablas.Ticket.findOne({
            where :{
                id_ticket
            }
        });
    const resultado = await Tablas.Monitoreo.findOne({
        where :{
            id_monitoreo : id_monitoreo.id_monitoreo
        }
    });
    const usuario = await Tablas.Usuarios.findOne({
        where :{
            id_usuario : resultado.usuario_a
        },
        attributes : ['nombre']
    });
    res.send([resultado,usuario]);
}

exports.comboTecnicos = async (req,res) => {
    const tecnicos = await Tablas.Usuarios.findAll({
        where :{
            id_perfil : 3,
            estatus : '1'
        },
        attributes : ['nombre','id_usuario']
    });
    res.send(tecnicos);
}

exports.asignarTecnico = async (req,res,next) => {
    const {id_tecnico} = (req.body);
    const {id_ticket} = (req.body);
    const {referencia} = (req.body);
    const {direccion} = (req.body);
    const {fecha_servicio} = (req.body);
    const {hora_servicio} = (req.body);
    const {coordenadas} = (req.body);
    const usuario_m = req.session.userId;
    const fecha_m = `${(await recursos.pedirFecha()).fecha} ${(await recursos.pedirFecha()).horario}`
    const respuesta = await Tablas.Ticket.update({
        id_tecnico,
        usuario_m,
        fecha_m,
        referencia,
        direccion,
        fecha_servicio,
        hora_servicio,
        ubicacion : coordenadas,
        estatus : '5'
    },{
        where :{
           id_ticket
        }
    });
    if(!respuesta) return next();
    res.status(200).send('Se asigno el tecnico satisfactoriamente');
}

exports.consultaHistorial = async (req,res,next) => {
    const {id_unidad} = (req.params);
    const respuesta = await Tablas.Monitoreo.findAll({
        include : [{
            model : Tablas.Ticket
        }],
        where :{
            id_unidad
        }
    })
    res.send(respuesta);
}

exports.servicios = async (req,res) => {
    const Op = Sequelize.Op;
    if(!req.session.userId){  
        res.redirect('/');
    }else{
        const usuario = req.session.userId ;
        const privilegios = req.session.privilegios;
        const perfil = req.session.perfil;
        const priv = privilegios.split('');
        if(priv[4] !== '1'){ 
            let tickets;
            if(perfil === 1){
                tickets = await Tablas.Ticket.findAll({
                    where : {
                        id_tecnico : {
                            [Op.notIn] : ['']
                        }
                    }
                });
            }else{
                tickets = await Tablas.Ticket.findAll({
                    where : {
                        id_tecnico : usuario
                    }
                });
            }        
            for(let ticket of tickets){
                if(ticket.id_tecnico){
                    const nombre = await Tablas.Usuarios.findOne({
                        where : {
                            id_usuario : ticket.id_tecnico
                        },
                        attributes : ['nombre']
                    });
                    ticket.nombre = nombre.nombre;
                }                
            }    
            res.render('servicios', {
                nombrePagina: 'Servicios' ,
                usuario,
                priv,
                tickets,
                titulo : 'Servicios'      
            }); 
        }else{            
            res.redirect('/');
        }
            
    }
 }

 exports.consultaTicket = async (req,res) => {
    const {id_ticket} = (req.body);
    const ticket = await Tablas.Ticket.findOne({     
            include : [{
                model : Tablas.Monitoreo
            }],    
            where :{
                id_ticket
            }
        });    
    res.send(ticket);
}

 exports.subirEvidencia = async (req,res) => {
    const {id_servicio} = (req.body);
    const {nombreEvidencia} = (req.body);    
    const {observacionesEvidencia} = (req.body);    
    const ruta = req.file.filename;
    console.log(`${id_servicio} + ${nombreEvidencia} + ${observacionesEvidencia} + ${ruta}`);
    const usuario_a = req.session.userId;
    const fecha_a = `${(await recursos.pedirFecha()).fecha} ${(await recursos.pedirFecha()).horario}`
    const resultado = await Tablas.Evidencia.create({                 
        ruta,
        usuario_a,
        fecha_a,
        estatus : '1',
        nombre : nombreEvidencia,
        observaciones : observacionesEvidencia,
        id_ticket : id_servicio
        
    });
    if(!resultado) return next();
    res.status(200).send('La evidencia se subió exitosamente');
 }

 exports.consultaEvidencias = async (req,res) => {
    const {id_ticket} = (req.body);
    const evidencias = await Tablas.Evidencia.findAll({
        where : {
            id_ticket
        }
    });
    res.send(evidencias);
 }

 exports.cerrarTicket = async (req,res) => {
    const usuario_m = req.session.userId;
    const fecha_m = `${(await recursos.pedirFecha()).fecha} ${(await recursos.pedirFecha()).horario}`;
    const {id_ticket} = (req.body);
    const resultado = await Tablas.Ticket.update({
        estatus : '6',
        usuario_m,
        fecha_m
        },{ 
        where : {
            id_ticket
        }
    });
    if(!resultado) return next();
    res.status(200).send('Se cerro el ticket exitosamente');
 }