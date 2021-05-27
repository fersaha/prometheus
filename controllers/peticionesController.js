const axios = require('axios');
const bcrypt = require('bcryptjs');
const requestIp = require('request-ip');
const Tablas = require('../models/Tablas');
const  Sequelize  = require('sequelize');
const recursos = require('./recursosController');

exports.clientes = async (req,res) => {
    if(!req.session.userId){  
        res.redirect('/');
    }else{       
        const usuario = req.session.userId ;
        const privilegios = req.session.privilegios;
        const priv = privilegios.split('');
        if(priv[20] !== '0'){ 
            res.render('clientes', {
                nombrePagina: 'Clientes',
                usuario,
                priv,
                titulo: 'Clientes'
            }); 
        }else{
            res.redirect('/');
        }         
    }
}

exports.consultaClientesWialon = async (req,res) => {
    const fecha_a = `${(await recursos.pedirFecha()).fecha} ${(await recursos.pedirFecha()).horario}`;
    const admin1 = await Tablas.Admin.findOne({
        where : {
            id_admin : '1'
        }
    })
    const admin2 = await Tablas.Admin.findOne({
        where : {
            id_admin : '2'
        }
    })
    const admin3 = await Tablas.Admin.findOne({
        where : {
            id_admin : '3'
        }
    })
    const admin4 = await Tablas.Admin.findOne({
        where : {
            id_admin : '4'
        }
    })
    const admin5 = await Tablas.Admin.findOne({
        where : {
            id_admin : '5'
        }
    })
    const clientes1 = await axios.get(`http://201.150.1.66/apifacturas/wialon/accounts?admin=${admin1.nombre}`,{ 
        headers : {'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + process.env.TOKEN}
    });   
    for(let cliente of clientes1.data.data){
        const existe = await Tablas.ClienteWialon.findOne({
            where : {
                registro : cliente.id
            }
        });   
        if(!existe){
            await Tablas.ClienteWialon.create({
                nombre : cliente.cuenta_nombre,
                id_cuenta : cliente.id_cuenta,
                unidades : cliente.total_unidades,
                registro : cliente.id,
                id_admin : admin1.id_admin,
                estatus : '1',
                usuario_a : '1',
                fecha_a 
            });
        }else{
            await Tablas.ClienteWialon.update({
                nombre : cliente.cuenta_nombre,
                id_cuenta : cliente.id_cuenta,
                unidades : cliente.total_unidades,
                registro : cliente.id,
                id_admin : admin1.id_admin,
                estatus : '1',
                usuario_m : '1',
                fecha_m : fecha_a 
            },{
                where : {
                    registro : cliente.id
                }
            });
        }     
            
    }

    const clientes2 = await axios.get(`http://201.150.1.66/apifacturas/wialon/accounts?admin=${admin2.nombre}`,{ 
        headers : {'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + process.env.TOKEN}
    });   
    for(let cliente of clientes2.data.data){
        const existe = await Tablas.ClienteWialon.findOne({
            where : {
                registro : cliente.id
            }
        });   
        if(!existe){
            await Tablas.ClienteWialon.create({
                nombre : cliente.cuenta_nombre,
                id_cuenta : cliente.id_cuenta,
                unidades : cliente.total_unidades,
                registro : cliente.id,
                id_admin : admin2.id_admin,
                estatus : '1',
                usuario_a : '1',
                fecha_a 
            });
        }else{
            await Tablas.ClienteWialon.update({
                nombre : cliente.cuenta_nombre,
                id_cuenta : cliente.id_cuenta,
                unidades : cliente.total_unidades,
                registro : cliente.id,
                id_admin : admin2.id_admin,
                estatus : '1',
                usuario_m : '1',
                fecha_m : fecha_a 
            },{
                where : {
                    registro : cliente.id
                }
            });
        }     
            
    }

    const clientes3 = await axios.get(`http://201.150.1.66/apifacturas/wialon/accounts?admin=${admin3.nombre}`,{ 
        headers : {'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + process.env.TOKEN}
    });   
    for(let cliente of clientes3.data.data){
        const existe = await Tablas.ClienteWialon.findOne({
            where : {
                registro : cliente.id
            }
        });   
        if(!existe){
            await Tablas.ClienteWialon.create({
                nombre : cliente.cuenta_nombre,
                id_cuenta : cliente.id_cuenta,
                unidades : cliente.total_unidades,
                registro : cliente.id,
                id_admin : admin3.id_admin,
                estatus : '1',
                usuario_a : '1',
                fecha_a 
            });
        }else{
            await Tablas.ClienteWialon.update({
                nombre : cliente.cuenta_nombre,
                id_cuenta : cliente.id_cuenta,
                unidades : cliente.total_unidades,
                registro : cliente.id,
                id_admin : admin3.id_admin,
                estatus : '1',
                usuario_m : '1',
                fecha_m : fecha_a 
            },{
                where : {
                    registro : cliente.id
                }
            });
        }     
            
    }

    const clientes4 = await axios.get(`http://201.150.1.66/apifacturas/wialon/accounts?admin=${admin4.nombre}`,{ 
        headers : {'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + process.env.TOKEN}
    });   
    for(let cliente of clientes4.data.data){
        const existe = await Tablas.ClienteWialon.findOne({
            where : {
                registro : cliente.id
            }
        });   
        if(!existe){
            await Tablas.ClienteWialon.create({
                nombre : cliente.cuenta_nombre,
                id_cuenta : cliente.id_cuenta,
                unidades : cliente.total_unidades,
                registro : cliente.id,
                id_admin : admin4.id_admin,
                estatus : '1',
                usuario_a : '1',
                fecha_a 
            });
        }else{
            await Tablas.ClienteWialon.update({
                nombre : cliente.cuenta_nombre,
                id_cuenta : cliente.id_cuenta,
                unidades : cliente.total_unidades,
                registro : cliente.id,
                id_admin : admin4.id_admin,
                estatus : '1',
                usuario_m : '1',
                fecha_m : fecha_a 
            },{
                where : {
                    registro : cliente.id
                }
            });
        }     
            
    }

    const clientes5 = await axios.get(`http://201.150.1.66/apifacturas/wialon/accounts?admin=${admin5.nombre}`,{ 
        headers : {'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + process.env.TOKEN}
    });   
    for(let cliente of clientes5.data.data){
        const existe = await Tablas.ClienteWialon.findOne({
            where : {
                registro : cliente.id
            }
        });   
        if(!existe){
            await Tablas.ClienteWialon.create({
                nombre : cliente.cuenta_nombre,
                id_cuenta : cliente.id_cuenta,
                unidades : cliente.total_unidades,
                registro : cliente.id,
                id_admin : admin5.id_admin,
                estatus : '1',
                usuario_a : '1',
                fecha_a 
            });
        }else{
            await Tablas.ClienteWialon.update({
                nombre : cliente.cuenta_nombre,
                id_cuenta : cliente.id_cuenta,
                unidades : cliente.total_unidades,
                registro : cliente.id,
                id_admin : admin5.id_admin,
                estatus : '1',
                usuario_m : '1',
                fecha_m : fecha_a 
            },{
                where : {
                    registro : cliente.id
                }
            });
        }     
            
    }

    res.send(':)')
}
exports.consultaClientes = async (req,res) => {
    const Op = Sequelize.Op;
    const {id_admin} = (req.body);
    const {reg_bus} = (req.body);
    const {offset} = (req.body);
    const {reg_inp} = (req.body);
    const offs = parseInt(offset);
    const limit = parseInt(reg_bus);
    const resultado = await Tablas.ClienteBind.findAll({
        attributes : ['nombre','nombre_legal','rfc','id_bind'],
        where : {
            estatus : '1',
            id_admin,
            nombre : {
                [Op.like] : [`%${reg_inp}%`]
            }
        },
        limit,
        offset : offs,
        include : [{
            model : Tablas.Correspondencia,
            attributes : ['id_correspondencia']
        }]
    });
    const resultado2 = await Tablas.ClienteBind.findAll({
        attributes : ['nombre','nombre_legal','rfc','id_bind'],
        where : {
            estatus : '1',
            id_admin,
            nombre : {
                [Op.like] : [`%${reg_inp}%`]
            }
        },
        include : [{
            model : Tablas.Correspondencia,
            attributes : ['id_correspondencia']
        }]
    });
    res.send([resultado,resultado2.length])
}
exports.consultaCliente = async (req,res) => {
    const { id_bind } = (req.body);
    const bind = await Tablas.ClienteBind.findOne({
        where : {
            id_bind
        },
        include : [{
            model : Tablas.Admin
        }]
    })
    const resultado = await axios.get(`http://201.150.1.66/apifacturas/bind/clientinformation?admin=${bind.cat_admin.nombre}&client_id=${bind.id_cliente}`,{ 
        headers : {'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + process.env.TOKEN}
    });
    res.send(resultado.data)
}
exports.consultaEnlace = async (req,res) => {
    const Op = Sequelize.Op;
    const {id_bind} = (req.body);   
    const resultado = await Tablas.ClienteBind.findAll({
        where : {
            id_bind
        },
        include : [{
            model : Tablas.Correspondencia
        }]
    });
    res.send(resultado)
}
exports.consultaAdmins = async (req,res) => {
    const Op = Sequelize.Op;
    const privilegios = req.session.privilegios;
    const priv = privilegios.split('');
    let admins;
    if(priv[20] === '1'){
    admins =  await Tablas.Admin.findAll({
        where : {
            estatus : '1',
            id_admin : 1        }
    });
    }else if(priv[20] === '2'){
        admins =  await Tablas.Admin.findAll({
            where : {
                estatus : '1',
                id_admin : 2
            }
        });
    }else if(priv[20] === '6'){
        admins =  await Tablas.Admin.findAll({
            where : {
                estatus : '1',
                id_admin : {
                    [Op.in] : [1,2,6]
                }
            }
        });
    }
    res.send(admins)
}
exports.consultaAdminsWialons = async (req,res) => {
    const Op = Sequelize.Op;
    const privilegios = req.session.privilegios;
    console.log(privilegios);
    const priv = privilegios.split('');
    let admins;
    if(priv[21] === '1'){
    admins =  await Tablas.Admin.findAll({
        where : {
            estatus : '1',
            id_admin : 1        }
    });
    }else if(priv[21] === '2'){
        admins =  await Tablas.Admin.findAll({
            where : {
                estatus : '1',
                id_admin : 2
            }
        });
    }else if(priv[21] === '3'){
        admins =  await Tablas.Admin.findAll({
            where : {
                estatus : '1',
                id_admin : 3
            }
        });
    }else if(priv[21] === '4'){
        admins =  await Tablas.Admin.findAll({
            where : {
                estatus : '1',
                id_admin : 4
            }
        });
    }else if(priv[21] === '5'){
        admins =  await Tablas.Admin.findAll({
            where : {
                estatus : '1',
                id_admin : 5
            }
        });
    }else if(priv[21] === '6'){
        admins =  await Tablas.Admin.findAll({
            where : {
                estatus : '1',
                id_admin : {
                    [Op.in] : [1,2,3,4,5]
                }
            }
        });
    }
    res.send(admins)
}
exports.consultaWialons = async (req,res) => {
    const { id_admin } = (req.body);
    const wialons =  await Tablas.ClienteWialon.findAll({
        where : {
            id_admin
        }
    });
    res.send(wialons)
}
exports.consultaWialon = async (req,res) => {
    const { id_wialon } = (req.body);
    let wialon;
    let unidadD = 0;
    wialon =  await Tablas.ClienteWialon.findOne({
        where : {
            id_wialon
        },
        include :[{
            model : Tablas.Admin
        }]
    });
    const unidadesdisponibles = await Tablas.Correspondencia.findAll({
        where : {
            id_Wialon : id_wialon
        }
    });
    if(unidadesdisponibles.length){
        for(let unidad of unidadesdisponibles){
            unidadD  += parseInt(unidad.unidades);
        }
    }
    wialon.dataValues.unidades_disponibles = parseInt(wialon.unidades) - unidadD;
    res.send(wialon)
}
exports.consultaClienteBase = async (req,res) => {
    const { id_bind } = (req.body);
    const clientebind = await Tablas.ClienteBind.findOne({
        where : {
            id_bind
        },
        include : [{
            model : Tablas.Correspondencia,
            include : [{
                model : Tablas.ClienteWialon,
                include :[{
                    model : Tablas.Admin
                }]
            }]
        }]
    })
    res.send(clientebind);
}

exports.enlazarCuentas = async (req,res,next) => {
    const usuario_a = req.session.userId;
    const fecha_a = `${(await recursos.pedirFecha()).fecha} ${(await recursos.pedirFecha()).horario}`;
    const {id_bind} = (req.body);
    const {tipo_cliente} = (req.body);
    const {id_wialon} = (req.body);
    const {id_almacen} = (req.body);
    const {id_producto} = (req.body);
    const {id_servicio} = (req.body);
    const {unidadesF} = (req.body);
    const {id_uso} = (req.body);
    const {precio} = (req.body);
    //console.log(`${id_producto} ------- ${id_servicio}-----`);
    let producto;
    let servicio;
    let unidadesD = 0;
    const wialon = await Tablas.ClienteWialon.findOne({
        where : {
            id_wialon
        }
    });
    const existe = await Tablas.Correspondencia.findAll({
        where : {
            id_wialon
        },
        include : [{
            model : Tablas.ClienteBind
        },{
            model : Tablas.ClienteWialon
        }]
    });
    if(existe.length){
        for(let exis of existe){
            unidadesD += parseInt(exis.unidades);
        }
        if(parseInt(wialon.unidades) < (parseInt(unidadesF) + unidadesD)){
            //res.send(`Ya se encuentra enlazado a Cliente bind : ${existe.cat_bindcliente.nombre}`);
            res.send(`Las unidades totales : ${parseInt(wialon.unidades)} 
            son menores a las que se van a facturar : ${parseInt(unidadesF) + unidadesD}`);
            return next();
        }
    }else{       
        if(parseInt(wialon.unidades) < parseInt(unidadesF)){
            //res.send(`Ya se encuentra enlazado a Cliente bind : ${existe.cat_bindcliente.nombre}`);
            res.send(`Las unidades totales : ${parseInt(wialon.unidades)} 
            son menores a las que se van a facturar : ${parseInt(unidadesF)}`);
            return next();
        }
    }
    if(id_producto === "non"){
        producto = 167
    }else{
        producto = id_producto
    }
    if(id_servicio === "non"){
        servicio = 86
    }else{
        servicio = id_servicio
    }
    const resultado = await Tablas.Correspondencia.create({
        id_bind,
        id_Wialon : id_wialon,
        tipo_cliente,
        unidades : unidadesF,
        id_almacen,
        id_producto : producto,
        id_servicio : servicio,
        uso : id_uso,
        precio,
        estatus : '1',
        usuario_a,
        fecha_a
        });
    if(!resultado) return next();
    res.status(200).send('Se enlazo satizfactoriamente');
 }
 const peticionBindGet = async (concepto,admin) => {
    const resultado = await axios.get(`http://201.150.1.66/apifacturas/bind/${concepto}?admin=${admin}`,{ 
        headers : {'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + process.env.TOKEN}
    });
    return resultado;
 }
 exports.ingresaBinds = async (req,res) => {

    const wialon = await Tablas.ClienteWialon.findAll();
    for(let unidad of wialon){
        await Tablas.Correspondencia.update({
            unidades : unidad.unidades
        },{
            where :{
                id_wialon : unidad.id_wialon
        }
    })
    }
    res.send(':)')
     /*
    const fecha_a = `${(await recursos.pedirFecha()).fecha} ${(await recursos.pedirFecha()).horario}`;
    const bind1 = '1';
    const bind2 = '2';       
    const admin1 = await Tablas.Admin.findOne({
        where : {
            id_admin : bind1
        }
    });
    const admin2 = await Tablas.Admin.findOne({
        where : {id_admin : bind2}
    });
    const almacen1 = await peticionBindGet('almacen',admin1.nombre);
    for(let resultad of almacen1.data.data){
        const existe = await Tablas.Almacen.findOne({
            where : {
                id : resultad.ID
            }
        });
        if(!existe){
            await Tablas.Almacen.create({
                id : resultad.ID,
                nombre : resultad.Name,
                id_locacion : resultad.LocationID,
                disponibleEnOtraLocacion : resultad.AvailableInOtherLoc,
                id_admin : bind1,
                usuario_a : '1',
                fecha_a,
            })
        }else{
            await Tablas.Almacen.update({               
                nombre : resultad.Name,
                id_locacion : resultad.LocationID,
                disponibleEnOtraLocacion : resultad.AvailableInOtherLoc,
                id_admin : bind1,
                usuario_m : '1',
                fecha_m : fecha_a,
            },{
                where : {
                    id : resultad.ID
                }
            })
        }      
    }
    const producto1 = await peticionBindGet('products',admin1.nombre); 
    for(let resultad of producto1.data.data){
        const existe = await Tablas.Producto.findOne({
            where : {
                id : resultad.product_id
            }
        });
        if(!existe){
            await Tablas.Producto.create({
                id : resultad.product_id,
                id_currency : resultad.currency_id,
                codigo : resultad.code,
                nombre : resultad.title,
                costo : resultad.cost,
                inventario : resultad.current_inventory,
                numero : resultad.number,
                tipo: resultad.type_text,
                estatus : 1,
                usuario_a : '1',
                fecha_a, 
                id_admin : bind1
            })
        }else{
            await Tablas.Producto.update({  
                id_currency : resultad.currency_id,              
                codigo : resultad.code,
                nombre : resultad.title,
                costo : resultad.cost,
                inventario : resultad.current_inventory,
                numero : resultad.number,
                tipo: resultad.type_text,
                estatus : 1,
                usuario_m : '1',
                fecha_m : fecha_a, 
                id_admin : bind1
            },{
                where : {
                    id : resultad.product_id
                }
            })
        }      
    }
    const servicio1 = await peticionBindGet('servicios',admin1.nombre); 
    for(let resultad of servicio1.data.data){
        const existe = await Tablas.Servicio.findOne({
            where : {
                id : resultad.ID
            }
        });
        if(!existe){
            await Tablas.Servicio.create({
                id : resultad.ID,
                codigo : resultad.code,
                nombre : resultad.Title,
                costo : resultad.Cost,
                descripcion : resultad.Description,
                unidad : resultad.Unit,
                id_corriente : resultad.CurrencyID,
                codigo_corriente: resultad.CurrencyCode,
                concepto_variable: resultad.VariableConcept,
                codigo_sat: resultad.SATCode,
                unidad_sat: resultad.SATUnit,
                estatus : 1,
                usuario_a : '1',
                fecha_a, 
                id_admin : bind1
            })
        }else{
            await Tablas.Servicio.update({   
                codigo : resultad.code,
                nombre : resultad.Title,
                costo : resultad.Cost,
                descripcion : resultad.Description,
                unidad : resultad.Unit,
                id_corriente : resultad.CurrencyID,
                codigo_corriente: resultad.CurrencyCode,
                concepto_variable: resultad.VariableConcept,
                codigo_sat: resultad.SATCode,
                unidad_sat: resultad.SATUnit,
                estatus : 1,
                usuario_m : '1',
                fecha_m : fecha_a, 
                id_admin : bind1
            },{
                where : {
                    id : resultad.ID,
                }
            })
        }           
    }
    const almacen2 = await peticionBindGet('almacen',admin2.nombre);
    for(let resultad of almacen2.data.data){
        const existe = await Tablas.Almacen.findOne({
            where : {
                id : resultad.ID
            }
        });
        if(!existe){
            await Tablas.Almacen.create({
                id : resultad.ID,
                nombre : resultad.Name,
                id_locacion : resultad.LocationID,
                disponibleEnOtraLocacion : resultad.AvailableInOtherLoc,
                id_admin : bind2,
                usuario_a : '1',
                fecha_a,
            })
        }else{
            await Tablas.Almacen.update({               
                nombre : resultad.Name,
                id_locacion : resultad.LocationID,
                disponibleEnOtraLocacion : resultad.AvailableInOtherLoc,
                id_admin : bind2,
                usuario_m : '1',
                fecha_m : fecha_a,
            },{
                where : {
                    id : resultad.ID
                }
            })
        }         
    }
    const producto2 = await peticionBindGet('products',admin2.nombre); 
    for(let resultad of producto2.data.data){
        const existe = await Tablas.Producto.findOne({
            where : {
                id : resultad.product_id
            }
        });
        if(!existe){
            await Tablas.Producto.create({
                id : resultad.product_id,
                id_currency : resultad.currency_id,
                codigo : resultad.code,
                nombre : resultad.title,
                costo : resultad.cost,
                inventario : resultad.current_inventory,
                numero : resultad.number,
                tipo: resultad.type_text,
                estatus : 1,
                usuario_a : '1',
                fecha_a, 
                id_admin : bind2
            })
        }else{
            await Tablas.Producto.update({   
                id_currency : resultad.currency_id,             
                codigo : resultad.code,
                nombre : resultad.title,
                costo : resultad.cost,
                inventario : resultad.current_inventory,
                numero : resultad.number,
                tipo: resultad.type_text,
                estatus : 1,
                usuario_m : '1',
                fecha_m : fecha_a, 
                id_admin : bind2
            },{
                where : {
                    id : resultad.product_id
                }
            })
        }           
    }

    const servicio2 = await peticionBindGet('servicios',admin2.nombre); 
    for(let resultad of servicio2.data.data){
        const existe = await Tablas.Servicio.findOne({
            where : {
                id : resultad.ID
            }
        });
        if(!existe){
            await Tablas.Servicio.create({
                id : resultad.ID,
                codigo : resultad.code,
                nombre : resultad.Title,
                costo : resultad.Cost,
                descripcion : resultad.Description,
                unidad : resultad.Unit,
                id_corriente : resultad.CurrencyID,
                codigo_corriente: resultad.CurrencyCode,
                concepto_variable: resultad.VariableConcept,
                codigo_sat: resultad.SATCode,
                unidad_sat: resultad.SATUnit,
                estatus : 1,
                usuario_a : '1',
                fecha_a, 
                id_admin : bind2
            })
        }else{
            await Tablas.Servicio.update({   
                codigo : resultad.code,
                nombre : resultad.Title,
                costo : resultad.Cost,
                descripcion : resultad.Description,
                unidad : resultad.Unit,
                id_corriente : resultad.CurrencyID,
                codigo_corriente: resultad.CurrencyCode,
                concepto_variable: resultad.VariableConcept,
                codigo_sat: resultad.SATCode,
                unidad_sat: resultad.SATUnit,
                estatus : 1,
                usuario_m : '1',
                fecha_m : fecha_a, 
                id_admin : bind2
            },{
                where : {
                    id : resultad.ID,
                }
            })
        }           
    }
    res.send(':)');*/
}

 exports.consultaAlmacen = async (req,res) => {
    const { id_admin } = (req.body);       
    const almacenes = await Tablas.Almacen.findAll({
        where : {id_admin}
    });    
    res.send(almacenes)
}

exports.consultaProducto = async (req,res) => {
    const Op = Sequelize.Op;
    const { id_admin } = (req.body);
    const { busqueda } = (req.body);   
    const productos = await Tablas.Producto.findAll({
        where : {
            id_admin,
            nombre : {
                [Op.like] : [`%${busqueda}%`]
            }
        }
    });    
    res.send(productos)
}

exports.consultaServicio = async (req,res) => {
    const { id_admin } = (req.body);  
    const servicios = await Tablas.Servicio.findAll({
        where : {id_admin}
    }); 
    res.send(servicios)
    
}















exports.ordenarCuentas= async (req,res) => {
    const {id_usuario} = (req.body);
    const {nombre_usuario} = (req.body);
    const {valor} = (req.body);
    const {columna} = (req.body);
    let g = '0';
    let f = '0';
    let e = '0';
    let d = '0';
    let c = '0';
    let b = '0';
    let a = '0';
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiZDVhZmViNTNhYmY0NDk5NTdjYzY4OTQyOThlNGNiNGQ3ZDViNTI5NjlhNDFmMjI1ODRlNDA5ZDE1Y2VmNmE5ZjNmZjcxMzE1OGQ3NmE0MWIiLCJpYXQiOjE1OTc0MjMzNjAsIm5iZiI6MTU5NzQyMzM2MCwiZXhwIjoxNjI4OTU5MzU5LCJzdWIiOiIiLCJzY29wZXMiOltdfQ.gkGwM9RGH7jF0LIUobXIX7-UxTNgTg0friiKokeM3fniWztm--BCd6nRm6H4C7mrWOnG5-riq_d4LqHPlyG3zN2CMB2cbET4miNCdO7S_fzo8CHtUwDZXflHN0jcSq3lJm4f_Jfd0LG5RowYXMMo38IALh171f3O7x2FFNfTkESsq7NfU7kWvpB0PC1KyzeaNHMP0zt-hLhh6LBFnQkur_4JNSSFvF8HXDxcUVYptYsDGN_eHdpSz_4-hmPXdeLkS4RSu01r-V1qGWBSiqXP1cwiAfxEjreDkdQBHbC_aK9Xm_6L8QyQjwfGUcNOvgegyF_TL3AL6h7ZaNqaTmSSrkKey6rANtPYzIm1OzQyWjMgWccOSh9yDZ8yoIZ6ye6pmF9bEHDWy8p9wmnatqtRSUYGSU8VzqNTIOhL0siYLyI6Q1Cw5G1Ln4cD-mQhVfwLI-BPmviNpPbU7oMqTQPLfPs2If1HIquwenfdfCF5T6u-aXO7gabjOqQTBRtBPOnO-7AP1Iyox5XYsUqz2s931x1ANg3IbiLQstqmzvfxhpWQ2Q-XyfGDAeD5snDyMcb1X6Zyh862zbDlfAYE-YKrhJuT99xWACGweo_lycHzsarKi-uAky2drf6VrSB_N2izlgOOBUsYD_CsQWEG7QWcDe6Vg1GPDP-1T4nBWH_6S9k';  
    /*const resultado = await axios.get(`http://201.150.1.66:80/administrator/cuentas?=${id_usuario}`,{ 
                    headers : {'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token}
    });
    console.log(resultado.data);*/
    axios.get(`http://201.150.1.66:80/administrator/cuentas?id_usuario=${id_usuario}`,{ 
        headers : {'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token}
    })
    .then(function (response) {
        // handle success
        const resultado = response.data.data;
        if(columna === 'g'){
            if(valor === '0'){
                resultado.sort((a,b) =>
                a.porcentaje_reportando - b.porcentaje_reportando
                );
                g = '1';
            }else if(valor === '1'){
                resultado.sort((a,b) =>
                b.porcentaje_reportando - a.porcentaje_reportando
                );
                g = '2';
            }else if(valor === '2'){
                resultado.sort((a,b) =>
                a.porcentaje_reportando - b.porcentaje_reportando
                );
                g = '1';
            }
        }if(columna === 'f'){
            if(valor === '0'){
                resultado.sort((a,b) =>
                a.porcentaje_sin_rep - b.porcentaje_sin_rep
                );
                f = '1';
            }else if(valor === '1'){
                resultado.sort((a,b) =>
                b.porcentaje_sin_rep - a.porcentaje_sin_rep
                );
                f = '2';
            }else if(valor === '2'){
                resultado.sort((a,b) =>
                a.porcentaje_sin_rep - b.porcentaje_sin_rep
                );
                f = '1';
            }
        }if(columna === 'e'){
            if(valor === '0'){
                resultado.sort((a,b) =>
                a.unidades_sin_reportar - b.unidades_sin_reportar
                );
                e = '1';
            }else if(valor === '1'){
                resultado.sort((a,b) =>
                b.unidades_sin_reportar - a.unidades_sin_reportar
                );
                e = '2';
            }else if(valor === '2'){
                resultado.sort((a,b) =>
                a.unidades_sin_reportar - b.unidades_sin_reportar
                );
                e = '1';
            }
        }if(columna === 'd'){
            if(valor === '0'){
                resultado.sort((a,b) =>
                a.mayor_24 - b.mayor_24
                );
                d = '1';
            }else if(valor === '1'){
                resultado.sort((a,b) =>
                b.mayor_24 - a.mayor_24
                );
                d = '2';
            }else if(valor === '2'){
                resultado.sort((a,b) =>
                a.mayor_24 - b.mayor_24
                );
                d = '1';
            }
        }if(columna === 'c'){
            if(valor === '0'){
                resultado.sort((a,b) =>
                a.mayor_12 - b.mayor_12
                );
                c = '1';
            }else if(valor === '1'){
                resultado.sort((a,b) =>
                b.mayor_12 - a.mayor_12
                );
                c = '2';
            }else if(valor === '2'){
                resultado.sort((a,b) =>
                a.mayor_12 - b.mayor_12
                );
                c = '1';
            }
        }if(columna === 'b'){
            if(valor === '0'){
                resultado.sort((a,b) =>
                a.unidades_reportando - b.unidades_reportando
                );
                b = '1';
            }else if(valor === '1'){
                resultado.sort((a,b) =>
                b.unidades_reportando - a.unidades_reportando
                );
                b = '2';
            }else if(valor === '2'){
                resultado.sort((a,b) =>
                a.unidades_reportando - b.unidades_reportando
                );
                b = '1';
            }
        }if(columna === 'a'){
            if(valor === '0'){
                resultado.sort((a,b) =>
                a.total_unidades - b.total_unidades
                );
                a = '1';
            }else if(valor === '1'){
                resultado.sort((a,b) =>
                b.total_unidades - a.total_unidades
                );
                a = '2';
            }else if(valor === '2'){
                resultado.sort((a,b) =>
                a.total_unidades - b.total_unidades
                );
                a = '1';
            }
        }
        //console.log(respuesta);
        const usuario = req.session.userId ;
        const privilegios = req.session.privilegios;
        const priv = privilegios.split('');
        res.render('usuario', {
            nombrePagina: `Cuenta : ${nombre_usuario} `,
            resultado,
            usuario,
            priv,
            usuarioW : nombre_usuario,
            id_usuario,
            g,
            f,
            e,
            d,
            c,
            b,
            a
        }); 
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });
}

exports.consultaUsuarios = async (req,res) => {
    const {id_usuario} = (req.body);
    const {idcuenta} = (req.body);
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiZDVhZmViNTNhYmY0NDk5NTdjYzY4OTQyOThlNGNiNGQ3ZDViNTI5NjlhNDFmMjI1ODRlNDA5ZDE1Y2VmNmE5ZjNmZjcxMzE1OGQ3NmE0MWIiLCJpYXQiOjE1OTc0MjMzNjAsIm5iZiI6MTU5NzQyMzM2MCwiZXhwIjoxNjI4OTU5MzU5LCJzdWIiOiIiLCJzY29wZXMiOltdfQ.gkGwM9RGH7jF0LIUobXIX7-UxTNgTg0friiKokeM3fniWztm--BCd6nRm6H4C7mrWOnG5-riq_d4LqHPlyG3zN2CMB2cbET4miNCdO7S_fzo8CHtUwDZXflHN0jcSq3lJm4f_Jfd0LG5RowYXMMo38IALh171f3O7x2FFNfTkESsq7NfU7kWvpB0PC1KyzeaNHMP0zt-hLhh6LBFnQkur_4JNSSFvF8HXDxcUVYptYsDGN_eHdpSz_4-hmPXdeLkS4RSu01r-V1qGWBSiqXP1cwiAfxEjreDkdQBHbC_aK9Xm_6L8QyQjwfGUcNOvgegyF_TL3AL6h7ZaNqaTmSSrkKey6rANtPYzIm1OzQyWjMgWccOSh9yDZ8yoIZ6ye6pmF9bEHDWy8p9wmnatqtRSUYGSU8VzqNTIOhL0siYLyI6Q1Cw5G1Ln4cD-mQhVfwLI-BPmviNpPbU7oMqTQPLfPs2If1HIquwenfdfCF5T6u-aXO7gabjOqQTBRtBPOnO-7AP1Iyox5XYsUqz2s931x1ANg3IbiLQstqmzvfxhpWQ2Q-XyfGDAeD5snDyMcb1X6Zyh862zbDlfAYE-YKrhJuT99xWACGweo_lycHzsarKi-uAky2drf6VrSB_N2izlgOOBUsYD_CsQWEG7QWcDe6Vg1GPDP-1T4nBWH_6S9k';  
    axios.get(`http://201.150.1.66:80/administrator/cuentas?id_usuario=${id_usuario}`,{ 
        headers : {'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token}
    })
    .then(function (response) {
        // handle success
        const resultado = response.data.data;
        const filtrado = resultado.filter(cuenta => cuenta.id == idcuenta);
        res.send(filtrado); 
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });
}

exports.consultaActUni = async (req,res) => {  
    const fecha = await Tablas.ClienteWialon.findOne({
        attributes: [
            [Sequelize.fn('max', Sequelize.col('fecha_m')),
                'fecha_maxima'
            ]
        ],
        raw: true
    }); 
    res.send(fecha.fecha_maxima)
}

