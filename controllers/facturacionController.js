const axios = require('axios');
const bcrypt = require('bcryptjs');
const requestIp = require('request-ip');
const Tablas = require('../models/Tablas');
const  Sequelize  = require('sequelize');
const recursos = require('./recursosController');
const { v4: uuidv4 } = require('uuid');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const reduccionNombre = (nombreLargo) => {
    let usuario;
    const usuarios = nombreLargo.split(' ');
    if(usuarios.length > 1){
        usuario = `${usuarios[0]} ${usuarios[1].charAt(0)}.`;
    }else{
        usuario = usuarios[0];
    }
    return usuario;
  }
exports.cotizaciones = async (req,res) => {
    if(!req.session.userId){  
        res.redirect('/');
    }else{       
        const usuario = req.session.userId ;
        const privilegios = req.session.privilegios;
        const priv = privilegios.split('');
        const nombre = req.session.nombre;
        const usuarioReducido = await reduccionNombre(nombre);
        if(priv[23] !== '0'){ 
            res.render('cotizaciones', {
                nombrePagina: 'Cotizaciones',
                usuario,
                priv,
                titulo: 'Cotizaciones',
                usuarioReducido
            }); 
        }else{
            res.redirect('/');
        }         
    }
}

exports.generarCotizacion = async (req,res) => {
        const Op = Sequelize.Op;
        const {carrito} = (req.body);
        const {observaciones} = (req.body);
        const {nombre_cliente} = (req.body);
        const usuario_a = req.session.userId;
        const fecha_a = `${(await recursos.pedirFecha()).fecha} ${(await recursos.pedirFecha()).horario}`;
        const ultimoFolio = await Tablas.Cotizacion.max('folio');
        let folio;
        if(!ultimoFolio){
            folio = 1;
        }else{
            folio =ultimoFolio + 1;
        }
        const cotizacion = await Tablas.Cotizacion.create({
            folio,
            serie:'C',
            observaciones ,
            estatus : '1',
            usuario_a,
            fecha_a,
            usuario_m : '-',
            fecha_m :'-',
            nombre_cliente
        });
        if(cotizacion.id_cotizacion){
            for(let producto of carrito){
                await Tablas.Partida.create({
                    descripcion : producto.nombre,
                    cantidad : producto.cantidad,
                    costo : producto.costo,
                    id_producto : producto.id,
                    estatus : '1',
                    usuario_a,
                    fecha_a,
                    usuario_m : '-',
                    fecha_m : '-',
                    id_cotizacion : cotizacion.id_cotizacion
                })
            }
            res.send(['1'])
        }else{
            res.send(['2','Problemas en el servidor'])
        }
    
}

exports.consultaCotizaciones = async (req,res) => {
    const Op = Sequelize.Op;
    const {registros} = (req.params);
    const {busqueda} = (req.params);
    const {offset} = (req.params);
    let buscar;
    if(busqueda === "-"){
        buscar = '';
    }else{
        buscar = busqueda;
    }
    const registrosInt = parseInt(registros);
    const usuario = req.session.userId;
    let cotizaciones, total;
    if(usuario != 1){
        cotizaciones = await Tablas.Cotizacion.findAll({
            attributes : ['id_cotizacion','serie','folio','observaciones','fecha_a','nombre_cliente'],
            include:[{
                attributes : ['id_partida','descripcion','cantidad','costo'],
                model : Tablas.Partida,
            }],
            where : {
                usuario_a : usuario,
                estatus : '1',
                folio : {
                    [Op.like] : [`%${buscar}%`]
                }
            },
            offset : parseInt(offset),
            limit : registrosInt
        });
        total = await Tablas.Cotizacion.count({  
            where : {
                 usuario_a : usuario,
                 estatus : '1',
                 [Op.or] : {
                    folio : {
                        [Op.like] : [`%${buscar}%`]
                    },
                    nombre_cliente: {
                        [Op.like] : [`%${buscar}%`]
                    }
                }
             }
            });
    }else{
        cotizaciones = await Tablas.Cotizacion.findAll({
            attributes : ['id_cotizacion','serie','folio','observaciones','fecha_a','nombre_cliente'],
            include:[{
                attributes : ['id_partida','descripcion','cantidad','costo'],
                model : Tablas.Partida,
            }],
            where : {
                estatus : '1',
                [Op.or] : {
                    folio : {
                        [Op.like] : [`%${buscar}%`]
                    },
                    nombre_cliente: {
                        [Op.like] : [`%${buscar}%`]
                    }
                }
            },
            offset : parseInt(offset),
            limit : registrosInt
        });
        total = await Tablas.Cotizacion.count({  
            where : {
                 estatus : '1',
                 folio : {
                     [Op.like] : [`%${buscar}%`]
                 }
             }
        });        
    }    
    res.send([cotizaciones,total]);
}


exports.generarPdfCotizacion = async (req,res) => {
    const usuario_m = req.session.userId;
    const fecha_m = `${(await recursos.pedirFecha()).fecha} ${(await recursos.pedirFecha()).horario}`;
    const { id_cotizacion } = (req.body);
    const aleatorio = uuidv4();
    const ruta1 = `./src/generados/${aleatorio}.pdf`;
    const ruta2 = `${aleatorio}.pdf`;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`http://localhost:3000/consultaPDFcotizacion/${id_cotizacion}`,{waitUntil:'networkidle2'});
    await page.waitForSelector('.tablaLista', {
        visible: true,
    });
    console.log(page.url()); // prints "https://savelist.co/about/en/"
    //await page.setContent(contenido);
    await page.pdf({
        path: ruta1,
        format: "Letter",
        printBackground: true,
        margin: {
          left: "10px",
          top: "50px",
          right: "10px",
          bottom: "10px"
        }
      });
    res.type('application/pdf');   
    await browser.close();
    res.send(ruta2);
}
exports.consultaPDFcotizacion = async (req,res) => {
    const {id_cotizacion} = (req.params);
    const cotizacion = await Tablas.Cotizacion.findOne({
        attributes : ['id_cotizacion','folio','serie','observaciones','fecha_a','usuario_a','nombre_cliente'],
        include : [{
            attributes : ['descripcion','cantidad','costo'],
            model : Tablas.Partida
        }],
        where : {
            id_cotizacion 
        }
    });
    const usuario =  await Tablas.Usuarios.findOne({
        attributes : ['nombre'],
        where : {
            id_usuario : cotizacion.usuario_a
        }
    })
    const folio = `${cotizacion.serie}-${String(cotizacion.folio).padStart(4,"0")}`;
    res.render('consultaCotizacion',{
        nombrePagina : 'Consultando...',
        cotizacion,
        folio ,
        fecha : cotizacion.fecha_a,
        usuario :  usuario.nombre
    });  
}

exports.descargarReporte = async(req,res) => {    
    const {id} = (req.params);
    const rutaRaiz = path.join(__dirname,'../')
    var pdf = fs.createReadStream(`${rutaRaiz}/src/generados/${id}`);
    const fecha_m = `${(await recursos.pedirFecha()).fecha}${(await recursos.pedirFecha()).horario}`;
    let filename = `cot${fecha_m}.pdf`; 
    filename = encodeURIComponent(filename);
   // res.download(`${rutaRaiz}/src/generados/${id}`);
    //res.type('application/pdf');
    //res.end(pdf, 'binary');
    res.setHeader('Content-disposition', 'inline; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');
    pdf.pipe(res);
    //res.sendFile(`${rutaRaiz}/src/generados/${id}`)
}

exports.consultaCotizacion = async (req,res) => {
    const Op = Sequelize.Op;
    const {id_cotizacion} = (req.params);
    const cotizacion = await Tablas.Cotizacion.findOne({
            attributes : ['id_cotizacion','serie','folio','observaciones','fecha_a','nombre_cliente'],
            include:[{
                attributes : ['id_partida','descripcion','cantidad','costo','id_producto'],
                model : Tablas.Partida,
                where : {
                    estatus : '1'
                }
            }],
            where : {
                id_cotizacion
            }
        });
    res.send(cotizacion);
}

exports.actualizarCotizacion = async (req,res) => {
    const Op = Sequelize.Op;
    const {carrito} = (req.body);
    const {observaciones} = (req.body);
    const {nombre_cliente} = (req.body);
    const {id_cotizacion} = (req.body);
    const usuario_m = req.session.userId;
    const fecha_m = `${(await recursos.pedirFecha()).fecha} ${(await recursos.pedirFecha()).horario}`;
    const actualizacion = await Tablas.Cotizacion.update({
        observaciones ,
        usuario_m ,
        fecha_m ,
        nombre_cliente
    },{
        where : {
            id_cotizacion
        }
    });
    if(actualizacion){
        await Tablas.Partida.update({
            estatus : '3',
            usuario_m,
            fecha_m
        },{
            where : {
                id_cotizacion
            }
        })
        for(let producto of carrito){
            await Tablas.Partida.create({
                descripcion : producto.nombre,
                cantidad : producto.cantidad,
                costo : producto.costo,
                id_producto : producto.id,
                estatus : '1',
                usuario_a : usuario_m,
                fecha_a : fecha_m,
                usuario_m : '-',
                fecha_m : '-',
                id_cotizacion
            })
        }
        res.send(['1'])
    }else{
        res.send(['2','Problemas en el servidor'])
    }

}