const axios = require('axios');
const bcrypt = require('bcryptjs');
const requestIp = require('request-ip');
const Tablas = require('../models/Tablas');
const  Sequelize  = require('sequelize');
const recursos = require('./recursosController');
//const formidable=require('formidable');
var XLSX = require("xlsx");

exports.cargaxlsx = async (req,res) => { 
            res.render('cargadocumento', {
                nombrePagina: 'Carga',
                titulo: 'Carga'
            });          
}

exports.subirArchivo = async (req,res) => { 
    const ruta = req.file.path;
    console.log(ruta);
    const excel = XLSX.readFile(ruta);
    const nombreHoja = excel.SheetNames;
    const datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);
    const retorno = JSON.stringify(datos);
    res.send(retorno);
}

exports.PDFTruck = async (req,res) => { 
    res.render('pdftruck', {
        nombrePagina: 'PDF',
        titulo: 'PDF'
    });          
}