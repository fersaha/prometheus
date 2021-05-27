const axios = require('axios');
const bcrypt = require('bcryptjs');
const requestIp = require('request-ip');
const Tablas = require('../models/Tablas');
const  Sequelize  = require('sequelize');
const recursos = require('./recursosController');
const cron = require('node-cron');


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

exports.clientes = async (req,res) => {
    if(!req.session.userId){  
        res.redirect('/');
    }else{       
        const usuario = req.session.userId ;
        const privilegios = req.session.privilegios;
        const priv = privilegios.split('');
        const nombre = req.session.nombre;
        const usuarioReducido = await reduccionNombre(nombre);
        if(priv[23] !== '0'){ 
            res.render('clientes', {
                nombrePagina: 'Clientes',
                usuario,
                priv,
                titulo: 'Clientes',
                usuarioReducido
            }); 
        }else{
            res.redirect('/');
        }         
    }
}

exports.consultaClientesBind = async (req,res) => {
    console.log(process.env.TOKEN);
    const fecha_a = `${(await recursos.pedirFecha()).fecha} ${(await recursos.pedirFecha()).horario}`;
    const clientes = await axios.get(`http://201.150.1.66/apifacturas/bind/clients?admin=syegps&almacen=prometheus`,{ 
        headers : {'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + process.env.TOKEN}
    });  
    console.log(clientes);
    let infoDetallada;
    for(let cliente of clientes.data.data){
        const existe = await Tablas.Cliente.findOne({
            where : {
                id_cliente : cliente.client_id
            }
        });       
        if(!existe){ 
            infoDetallada = await axios.get(`http://201.150.1.66/apifacturas/bind/clientinformation?admin=syegps&client_id=${cliente.client_id}`,{ 
            headers : {'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + process.env.TOKEN}
            }); 
            const clienteBind = await Tablas.Cliente.create({
                id_cliente : cliente.client_id,
                numero : cliente.number,
                nombre : cliente.client_name,
                nombre_legal : cliente.legal_name,
                rfc : cliente.rfc,
                email : cliente.email,
                telefono : cliente.phone,
                locacion : cliente.location_id,
                id_admin : 1,
                estatus : '1',
                usuario_a : '1',
                fecha_a ,
                usuario_m : '-',
                fecha_a : '-'
            });        
            await Tablas.InformacionCliente.create({
                ID : infoDetallada.data.data.ID,
                RFC : infoDetallada.data.data.RFC,
                LegalName : infoDetallada.data.data.LegalName,
                CommercialName : infoDetallada.data.data.CommercialName,
                CreditDays : infoDetallada.data.data.CreditDays,
                CreditAmount : infoDetallada.data.data.CreditAmount,
                PaymentMethod : infoDetallada.data.data.PaymentMethod,
                CreationDate : infoDetallada.data.data.CreationDate,
                Status : infoDetallada.data.data.Status,
                SalesContact : infoDetallada.data.data.SalesContact,
                CreditContact : infoDetallada.data.data.CreditContact,
                Loctaion : infoDetallada.data.data.Loctaion,
                LoctaionID : infoDetallada.data.data.LoctaionID,
                Comments : infoDetallada.data.data.Comments,
                PriceList : infoDetallada.data.data.PriceList,
                PriceListID : infoDetallada.data.data.PriceListID,
                PaymentTermType : infoDetallada.data.data.PaymentTermType,
                Email : infoDetallada.data.data.Email,
                Telephones : infoDetallada.data.data.Telephones,
                Number : infoDetallada.data.data.Number,
                AccountNumber : infoDetallada.data.data.AccountNumber,
                DefaultDiscount : infoDetallada.data.data.DefaultDiscount,
                ClientSource : infoDetallada.data.data.ClientSource,
                Account : infoDetallada.data.data.Account,
                City : infoDetallada.data.data.City,
                State : infoDetallada.data.data.State,
                id_clientebind : clienteBind.id_bind
            });

        }/*else{
            await Tablas.ClienteBind.update({
                numero : cliente.number,
                nombre : cliente.client_name,
                nombre_legal : cliente.legal_name,
                rfc : cliente.rfc,
                email : cliente.email,
                telefono : cliente.phone,
                locacion : cliente.location_id,
                id_admin : admin1.id_admin,
                estatus : '1',
                usuario_m : '1',
                fecha_m : fecha_a 
            },{
                where : {
                    id_cliente : cliente.client_id
                }
            });
            await Tablas.InformacionCliente.update({
                ID : infoDetallada.data.data.ID,
                RFC : infoDetallada.data.data.RFC,
                LegalName : infoDetallada.data.data.LegalName,
                CommercialName : infoDetallada.data.data.CommercialName,
                CreditDays : infoDetallada.data.data.CreditDays,
                CreditAmount : infoDetallada.data.data.CreditAmount,
                PaymentMethod : infoDetallada.data.data.PaymentMethod,
                CreationDate : infoDetallada.data.data.CreationDate,
                Status : infoDetallada.data.data.Status,
                SalesContact : infoDetallada.data.data.SalesContact,
                CreditContact : infoDetallada.data.data.CreditContact,
                Loctaion : infoDetallada.data.data.Loctaion,
                LoctaionID : infoDetallada.data.data.LoctaionID,
                Comments : infoDetallada.data.data.Comments,
                PriceList : infoDetallada.data.data.PriceList,
                PriceListID : infoDetallada.data.data.PriceListID,
                PaymentTermType : infoDetallada.data.data.PaymentTermType,
                Email : infoDetallada.data.data.Email,
                Telephones : infoDetallada.data.data.Telephones,
                Number : infoDetallada.data.data.Number,
                AccountNumber : infoDetallada.data.data.AccountNumber,
                DefaultDiscount : infoDetallada.data.data.DefaultDiscount,
                ClientSource : infoDetallada.data.data.ClientSource,
                Account : infoDetallada.data.data.Account,
                City : infoDetallada.data.data.City,
                State : infoDetallada.data.data.State
            },{
                where : {
                    id_clientebind : existe.id_bind
                }
            });
        }*/
    }
    res.send(`SYEGPS = ${clientes.data.data.length}`);
}   

exports.consultaClientes = async (req,res) => {
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
    const clientes = await Tablas.Cliente.findAll({
        attributes : ['id_bind','nombre','nombre_legal','rfc','telefono'],
       where : {
           estatus : '1',
           nombre : {
               [Op.like] : [`%${buscar}%`]
           }
       },
       offset : parseInt(offset),
       limit : registrosInt
   })
   const total = await Tablas.Cliente.count({  
       where : {
            estatus : '1',
            nombre : {
                [Op.like] : [`%${buscar}%`]
            }
        }
        });
   res.send([clientes,total]);
}

exports.consultaCliente = async (req,res) => {
    const Op = Sequelize.Op;
    const {id_bind} = (req.params);
    const cliente = await Tablas.Cliente.findOne({
        include : [{
            attributes : ['PaymentMethod','City','State'],
            model : Tablas.InformacionCliente
        }], 
       attributes : ['id_bind','nombre','nombre_legal','rfc','telefono','email'],
       where : {
          id_bind
       }
   })
   res.send(cliente);
}

exports.productos = async (req,res) => {
    if(!req.session.userId){  
        res.redirect('/');
    }else{       
        const usuario = req.session.userId ;
        const privilegios = req.session.privilegios;
        const priv = privilegios.split('');
        const nombre = req.session.nombre;
        const usuarioReducido = await reduccionNombre(nombre);
        if(priv[23] !== '0'){ 
            res.render('productos', {
                nombrePagina: 'Productos',
                usuario,
                priv,
                titulo: 'Productos',
                usuarioReducido
            }); 
        }else{
            res.redirect('/');
        }         
    }
}

exports.consultaProductosBind = async (req,res) => {
    const resultado = await axios.get(`http://201.150.1.66/apifacturas/bind/products?admin=syegps`,{ 
        headers : {'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + process.env.TOKEN}
    });
    const fecha_a = `${(await recursos.pedirFecha()).fecha} ${(await recursos.pedirFecha()).horario}`;
    for(let resultad of resultado.data.data){
        console.log(resultad);
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
                estatus : '1',
                usuario_a : '1',
                fecha_a, 
                id_admin : 1,
                usuario_m : '-',
                fecha_m : '-'
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
                estatus : '1',
                usuario_m : '1',
                fecha_m : fecha_a, 
                id_admin : 1
            },{
                where : {
                    id : resultad.product_id
                }
            })
        }      
    }
    console.log('Productos actualizados');
 }

 exports.consultaProductos = async (req,res) => {
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
    const productos = await Tablas.Producto.findAll({
        attributes : ['codigo','nombre','costo','inventario','tipo','id_producto'],
       where : {
           estatus : '1',
           nombre : {
               [Op.like] : [`%${buscar}%`]
           }
       },
       offset : parseInt(offset),
       limit : registrosInt
   })
   const total = await Tablas.Producto.count({  
       where : {
            estatus : '1',
            nombre : {
                [Op.like] : [`%${buscar}%`]
            }
        }
        });
   res.send([productos,total]);
}

exports.consultaAlmacenesBind = async (req,res) => {
    const resultado = await axios.get(`http://201.150.1.66/apifacturas/bind/almacen?admin=syegps`,{ 
        headers : {'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + process.env.TOKEN}
    });
    const fecha_a = `${(await recursos.pedirFecha()).fecha} ${(await recursos.pedirFecha()).horario}`;
    for(let resultad of resultado.data.data){
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
                id_admin : '1',
                usuario_a : '1',
                estatus : '1',
                fecha_a,
                usuario_m : '-',
                fecha_m : '-',
            })
        }else{
            await Tablas.Almacen.update({               
                nombre : resultad.Name,
                id_locacion : resultad.LocationID,
                disponibleEnOtraLocacion : resultad.AvailableInOtherLoc,
                id_admin : '1',
                usuario_m : '1',
                fecha_m : fecha_a,
            },{
                where : {
                    id : resultad.ID
                }
            })
        }         
    }
    res.send(resultado.data);
 }

 cron.schedule('*/2 * * * *', () => {
    this.consultaProductosBind();
    console.log('Programado');
  });


  exports.consultaComboProductos = async (req,res) => {
   const productos = await Tablas.Producto.findAll({
       attributes : ['nombre','id_producto'],
       where : {
           estatus : '1'
       }
   });
   res.send(productos);
}
exports.consultaProductoId = async (req,res) => {
    const {id_producto} = (req.params);
    const producto = await Tablas.Producto.findOne({
        attributes : ['id_producto','id','id_currency','nombre','inventario','numero','tipo','codigo','costo'],
        where : {
            id_producto
        }
    });
    res.send(producto);
 }

 exports.busquedaProducto = async (req,res) => {
    const Op = Sequelize.Op;
    const {busqueda} = (req.params);
    const productos = await Tablas.Producto.findAll({
        attributes : ['nombre','id_producto'],
        where : {
            estatus : '1',
            nombre : {
                [Op.like] : [`%${busqueda}%`]
            }
        }
    });
    res.send(productos);
 }

 exports.crearProducto = async (req,res) => {
    const {titulo} = (req.body);
    const {costo} = (req.body);
    const {precio} = (req.body);
    const {codigo} = (req.body);
    const {currency_id} = (req.body);
    const productoRes = await axios.post(`http://201.150.1.66/apifacturas/bind/newProduct`,{ 
        admin : 'syegps',
        titulo,
        costo : parseFloat(costo),
        precio : parseFloat(precio),
        codigo,
        currency_id,
        
    },{
        headers : {'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + process.env.TOKEN}
    });
    if(!productoRes.data.data.error){
        const fecha_a = `${(await recursos.pedirFecha()).fecha} ${(await recursos.pedirFecha()).horario}`;
        const usuario_a = req.session.userId;
        const producto = await Tablas.Producto.create({
            id : productoRes.data.data.respuesta,
            id_currency : currency_id,
            codigo ,
            nombre : titulo,
            costo : parseFloat(costo),
            estatus : '1',
            usuario_a,
            fecha_a, 
            id_admin : 1,
            usuario_m : '-',
            fecha_m : '-'
        })
        if(producto.id_producto){
            await this.consultaProductosBind();
            res.send(['1']);
            return;
        }
        }else{
            res.send(['2','No se pudo crear']);   
        }
 }

 exports.eliminarProducto = async (req,res) => {
    const {id_producto} = (req.body);
    const {id} = (req.body);
    const productoRes = await axios.get(`http://201.150.1.66/apifacturas/bind/deleteProduct?admin=syegps&id_producto=${id}  `,{
        headers : {'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + process.env.TOKEN}
    });
    console.log(productoRes.data)
    if(!productoRes.data.data.error){
        const fecha_m = `${(await recursos.pedirFecha()).fecha} ${(await recursos.pedirFecha()).horario}`;
        const usuario_m = req.session.userId;
        const producto = await Tablas.Producto.update({
            estatus : '3',
            usuario_m ,
            fecha_m 
        },{
            where : {
                id_producto
            }
        })
        if(producto){
            await this.consultaProductosBind();
            res.send(['1']);
            return;
        }
        }else{
            res.send(['2','No se pudo eliminar']);   
        }
 }