//Fichero de la configuracion de la ruta del controlador
//project

'use strict'
//Crgamos express
let express = require('express');

//Importamos el controlador de Project
let ProjectController = require('../controllers/controller.project');

let router = express.Router();//Cargamos el router

//Configuramos un middleware(ejecuta antes que el controlador)
let mulipart = require('connect-multiparty'); //Para trabajar con archivos

let multipartMiddleware = mulipart({uploadDir: './uploads'}); //Indicamos donde se van a guardar las imagenes que subamos

//En la ruta /home, cargamos el metodo home que viene del controlador
router.get('/home', ProjectController.home);

router.post('/test', ProjectController.test);
router.post('/save', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.put('/update/:id', ProjectController.updateProject); //Actualizar
router.delete('/remove/:id', ProjectController.deleteProject);//Borrar

//Ejecutamos el middleware antes del metodo, asi la subida del archivo se hace antes
router.post('/upload-image/:id', multipartMiddleware ,ProjectController.uploadImage);
router.get('/get-image/:image', ProjectController.getImageFile);

//Exportamos el router, con toda su configuracion de rutas
module.exports = router;
