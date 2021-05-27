const axios = require('axios');
const bcrypt = require('bcryptjs');
const requestIp = require('request-ip');
const Tablas = require('../models/Tablas');
const  Sequelize  = require('sequelize');
const recursos = require('./recursosController');

exports.reportes = async (req,res) => {
    if(!req.session.userId){  
        res.redirect('/');
    }else{       
        const usuario = req.session.userId ;
        const privilegios = req.session.privilegios;
        const priv = privilegios.split('');
        if(priv[23] !== '0'){ 
            res.render('reportes', {
                nombrePagina: 'Reportes',
                usuario,
                priv,
                titulo: 'Reportes'
            }); 
        }else{
            res.redirect('/');
        }         
    }
}

exports.consultaReporteUnidades = async (req,res) => {
    const Op = Sequelize.Op;
    let enlazados = [];
    const {id_admin} = (req.body);
    const {fecha_ini} = (req.body);
    const {fecha_fin} = (req.body);
    const reporte = await Tablas.HistorialWialon.findAll({
        where : {
            id_admin
        },
        attributes : ['fecha_m','registro','nombre','unidades'],
        order : ['fecha_m','id_cuenta']
    });
    for(let report of reporte){
        const existe = await Tablas.Correspondencia.findOne({
            include : [{
                model : Tablas.ClienteWialon,
                where : {
                    registro : report.registro
                }
            }]           
        });
        if(existe){
            enlazados.push(report);
        }
    }
    res.send(enlazados);
}