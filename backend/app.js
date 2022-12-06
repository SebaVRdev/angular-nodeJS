/* Archivo para la cnfiguracion de express */
'use strict'

//Cargamos los modulos para trabajar
let express = require('express');
let bodyParser = require('body-parser');

let app = express(); //Ejecutamos express

//cargar archivos rutas
let project_routes = require('./routes/route.project');

//middlewares: metodo que se ejecuta antes de ejecutar la accion de un controlador
//app.use : middleware global
app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json());//cualquier tipo de peticion la convertimos a json

//CORS
// Configurar cabeceras y cors
//Middleware que nos permite el acceso a cors y confiura las cabezeras
//Para no tener problemas a la hora de hacer peticiones ajax al backend
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //('*') en vez de eso, cuando lanzemos la pag, se pone el url
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//rutas
//Sobreescribimos la ruta para que la cargue dentro del APP
    //('agregamos / esto es opcional', ruta cargada)
app.use('/api',project_routes);



//exportamos el modulo "app" que es la que tendra la confi de los middlewares, rutas, etc
module.exports = app;