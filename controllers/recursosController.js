const axios = require('axios');
const Sequelize = require('sequelize');
const Tablas = require('../models/Tablas');
const bcrypt = require('bcryptjs');
//const webpush = require('../src/webpush');
//let pushSubscription;
//const requestIp = require('request-ip');
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
exports.usuarios = async (req,res) => {
    if(!req.session.userId){  
        res.redirect('/');
    }else{
        const usuario = req.session.userId ;
        const privilegios = req.session.privilegios;
        const priv = privilegios.split('');
        if(priv[3] !== '1'){ 
            res.render('usuarios', {
                nombrePagina: 'Usuarios',
                usuario,
                priv,
                titulo : 'Usuarios'
            }); 
        }else{
            res.redirect('/');
        }  
    }    
}
exports.consultaUsuariosSis = async (req,res) => {
  const usuarios = await Tablas.Usuarios.findAll({
      attributes : ['id_usuario','nickname','nombre','email','telefono','estatus','id_perfil']
  });
  res.send(usuarios);
}
exports.consultaComboPerfiles = async (req,res) => {
    const Op = Sequelize.Op;
    const perfiles = await Tablas.Perfiles.findAll({
        where :{
            estatus : {
                [Op.notIn] : ['3','2']
            }
        }
    });
    res.send(perfiles);
  }
  exports.agregarUsuario = async (req,res) => {
    const {nickname} = (req.body);
    const {password} = (req.body);
    const {nombre} = (req.body);
    const {email} = (req.body);
    const {telefono} = (req.body);
    const {id_perfil} = (req.body);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password,salt);    
    const resultado = await Tablas.Usuarios.create({
       nickname,
       password : hash,
       nombre,
       email,
       telefono,
       estatus : '1',
       id_perfil,
       usuario_a : '1'
    });
    if(!resultado) return next();
    res.status(200).send(`Se genero el usuario ${nickname} exitosamente`);
  }
  exports.modificarUsuario = async (req,res) => {
    const {id_usuario} = (req.body);
    const {nickname} = (req.body);
    const {nombre} = (req.body);
    const {email} = (req.body);
    const {telefono} = (req.body);
    const {id_perfil} = (req.body);    
    const resultado = await Tablas.Usuarios.update({
       nickname,
       nombre,
       email,
       telefono,
       id_perfil,
       usuario_m :'1'
    },{
        where : {
            id_usuario
        }
    });
    if(!resultado) return next();
    res.status(200).send(`Se actualizo el usuario ${nickname} exitosamente`);
  }
  exports.modificarPassword = async (req,res) => {
    const {id_usuario} = (req.body);
    const {password} = (req.body);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password,salt);  
    const resultado = await Tablas.Usuarios.update({
       password : hash,
       usuario_m :'1'
    },{
        where : {
            id_usuario
        }
    });
    if(!resultado) return next();
    res.status(200).send(`El password se actualizó exitosamente`);
  }
exports.perfiles = async (req,res) => {
    if(!req.session.userId){  
        res.redirect('/');
    }else{
        const usuario = req.session.userId ;
        const privilegios = req.session.privilegios;
        const priv = privilegios.split('');
        if(priv[2] !== '1'){ 
            res.render('perfiles', {
                nombrePagina: 'Perfiles',
                usuario,
                priv,
                titulo:'Perfiles'    
            }); 
        }else{            
            res.redirect('/');
        }
            
    }    
 }
 exports.agregarPerfil = async (req,res) => {
    const {nombrePerfil} = (req.body);
    const {pr1} = (req.body);
    const {pr2} = (req.body);
    const {pr3} = (req.body);
    const {pr4} = (req.body);
    const {pr5} = (req.body);  
    const privilegios = `${pr1}${pr2}${pr3}${pr4}${pr5}`;   
    const resultado = await Tablas.Perfiles.create({
       nombre : nombrePerfil,
       privilegios,
       estatus : '1',
       usuario_a : '1'
    });
    if(!resultado) return next();
    res.status(200).send(`Se genero el perfil de nombre ${nombrePerfil} exitosamente`);
  }
  exports.modificarPerfil = async (req,res) => {
    const {id_perfil} = (req.body);
    const {nombrePerfil} = (req.body);
    const {pr1M} = (req.body);
    const {pr2M} = (req.body);
    const {pr3M} = (req.body);
    const {pr4M} = (req.body);
    const {pr5M} = (req.body);  
    const privilegios = `${pr1M}${pr2M}${pr3M}${pr4M}${pr5M}`;   
    const resultado = await Tablas.Perfiles.update({
       nombre : nombrePerfil,
       privilegios,
       usuario_m : '1'
    },{
        where : {
            id_perfil
        }
    });
    if(!resultado) return next();
    res.status(200).send(`Se actualizo el perfil de nombre ${nombrePerfil} exitosamente`);
  }
exports.consultaPerfiles = async (req,res) => {
   const perfiles = await Tablas.Perfiles.findAll();
   res.send(perfiles);
}

const pedirFechal = () => {
  const hoy = new Date();
  const fecha = `${hoy.getFullYear()}-${(String(hoy.getMonth()+1)).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`;
  const horario = `${String(hoy.getHours()).padStart(2, '0')}:${String(hoy.getMinutes()).padStart(2, '0')}`
  let anho = hoy.getFullYear();
  let anho2 = String(hoy.getFullYear()).substr(-2);
  let mes = (String(hoy.getMonth()+1)).padStart(2, '0');
  let dia = String(hoy.getDate()).padStart(2, '0');
  let hora = String(hoy.getHours()).padStart(2, '0');
  let minuto = String(hoy.getMinutes()).padStart(2, '0');
  const fechaFull ={
      fecha,
      horario,
      anho,
      anho2,
      mes,
      dia,
      hora,
      minuto
  } 
  return(fechaFull);
}



const logger = (paq) => {
  const accion = paq.accion;
  const usuario = paq.usuario;
  const ip = paq.ip;
  const fecha  = `${pedirFechal().fecha} ${pedirFechal().horario}`;  
 // const ip = requestIp.getClientIp();
   Tablas.Loggeo.create({
      accion,
      usuario,
      fecha,
      ip
  });
 return;
}

exports.pedirFecha = (req,res) => {
    const hoy = new Date();
    const fecha = `${hoy.getFullYear()}-${(String(hoy.getMonth()+1)).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`;
    const horario = `${String(hoy.getHours()).padStart(2, '0')}:${String(hoy.getMinutes()).padStart(2, '0')}`
    let anho = hoy.getFullYear();
    let anho2 = String(hoy.getFullYear()).substr(-2);
    let mes = (String(hoy.getMonth()+1)).padStart(2, '0');
    let dia = String(hoy.getDate()).padStart(2, '0');
    let hora = String(hoy.getHours()).padStart(2, '0');
    let minuto = String(hoy.getMinutes()).padStart(2, '0');
    const fechaFull ={
        fecha,
        horario,
        anho,
        anho2,
        mes,
        dia,
        hora,
        minuto
    } 
    return(fechaFull);
  }

exports.index = async (req,res) => {
    res.render('acceso',{
        nombrePagina : 'Acceso',
        error : false
    });
}

exports.login = async (req,res) => {
      const { usuario } = req.body;
      const { password } = req.body;
      const usuarioCons = await Tablas.Usuarios.findOne({
          attributes : ['id_usuario','password','nombre','nickname','estatus'],
          include: [{
              model: Tablas.Perfiles,
              attributes : ['id_perfil','privilegios','estatus']
          }],
          where: {
              nickname: usuario
          }
      });
      if (usuarioCons) {
        if (usuarioCons.estatus === '1' || usuarioCons.estatus === '4') {          
            if (bcrypt.compareSync(password, usuarioCons.password)) {
                if (usuarioCons.cat_perfile.estatus === '1') {
                    const usuarioReducido = await reduccionNombre(usuarioCons.nombre);
                    const privilegios = usuarioCons.cat_perfile.privilegios;
                    const priv = privilegios.split('');
                    const nombre = usuarioCons.nombre;
                    req.session.nombre = nombre;
                    const usuario = usuarioCons.id_usuario;
                    req.session.userId = usuarioCons.id_usuario;
                    req.session.perfil = usuarioCons.id_perfil;
                    req.session.privilegios = privilegios;              
                    res.render('panel', {
                        nombrePagina: 'Panel',
                        usuario,
                        priv,
                        usuarioReducido                      
                    });

                }
            } else {
                res.render('acceso', {
                    nombrePagina: 'Acceso',
                    err: '1'
                });
            }
        } else {
            res.render('acceso', {
                nombrePagina: 'Acceso',
                err: '1'
            });
        }
    } else {
        res.render('acceso', {
            nombrePagina: 'Acceso',
            err: '1'
        });
    }

}

exports.panel = async (req,res) => {
    const usuario = req.session.userId ;
    const privilegios = req.session.privilegios;
    const priv = privilegios.split('');
    const nombre = req.session.nombre;
    const usuarioReducido = await reduccionNombre(nombre);      
    res.render('panel', {
        nombrePagina: 'Panel',
        usuario,
        priv,
        usuarioReducido                      
    });

      
}

exports.cerrarSesion = (req,res) => {   
    req.session.destroy(err =>{
       if(err){
           return res.redirect('/panel');
       }
       res.clearCookie('Monitoreo');
       res.redirect('/');
   })
}

exports.subscripcion = async (req,res) => {   
   pushSubscription = req.body;
   res.status(200).json();   
}

exports.notificacion = async (req,res) => {  
    const { mensaje } = req.body;
   const payload = JSON.stringify({
       title : 'Notificaciones',
       mensaje
   })
   //console.log(pushSubscription);
   try {
    await webpush.sendNotification(pushSubscription,payload);
   }catch(error){
       console.log(error);
   }
   
}
exports.consultaNotificacion = async (req,res) => {  
   const perfil = req.session.perfil;
   const usuario = req.session.userId;
   let existe;
   if(perfil === 2){
       existe = await Tablas.Ticket.findAll({
           where : {
               id_coordinador : usuario,
               estatus : '4'
           }
       });
       if(existe.length){
           res.send('1');
       }else{
           res.send('0');
       }
   }else if(perfil === 3){
    existe = await Tablas.Ticket.findAll({
        where : {
            id_tecnico : usuario,
            estatus : '5'
        }
    });
    if(existe.length){
        res.send('1');
    }else{
        res.send('0');
    }
    }else{
        res.send('0');
    }
   
}