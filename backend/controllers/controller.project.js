/* Controlador de los projectos, que tendra una serie de metodos
para manejar la informacion de la entidad de project */ 
'use strict'

//Importamos el modelo para hacer peticiones o crear nuevo projecto, etc
var Project = require('../models/project');

//Libreria de node para borrar de una carpeta
let fs = require('fs');

//Importamos modulo para cargar rutas fisicas
let path = require('path');

let controller = {
    home: function(req, res){
        return res.status(200).send({
            message: 'SOY LA HOME'
        });
    },
    test: function(req, res){
        return res.status(200).send({
            message: 'Soy el metodo de test del controlador de project'
        });
    },
    //Guardar nuevo projecto
    saveProject: function(req,res){
        let project = new Project();
        let params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.langs = params.langs;
        project.year = params.year;
        project.image = null;

        //Lo guardamos en la base de datos 
        project.save((err, projectStored) => {
            //Si da error ejecutamos
            if(err) return res.status(500).send({message: 'error al guardar'});
            //Si no existe la variable projectSored significa que no se guardo nada
            if(!projectStored){
                return res.status(404).send({message: 'No se ha podido guardar el project'});
            };
            //Si no hubo ninguna excepcion significa que se guardo correctamente
            return res.status(200).send({
                project: projectStored,
            })
        });
    },
    //Recoger un projecto, en base a su id por url
    getProject: function(req, res){
        let projectId = req.params.id;
        //Validamos que haya un id
        if (projectId == null) {
            return res.status(404).send({message: 'No se ha encontrado el projecto'});
        }

        //Tomamos el objeto Project y buscamos por id
        Project.findById(projectId, (err, projectEncontrado)=>{
            if(err) return res.status(500).send({
                message: 'Error al devolver los datos'
            });
            if(!projectEncontrado){
                return res.status(404).send({
                    message: 'No se ha encontrado el projecto'
                });
            };
            //En caso de salir todo bien
            return res.status(200).send({
                project: projectEncontrado,
            });
        });
    },
    //Listar proyectos
    getProjects: function(req,res){
        //Recogemos todos los documentos find({year:2022})  .sort('year').exec ordena por año
        Project.find().exec((err, projects) => {
            if(err) return res.status(500).send({message: 'Erro al devolver los datos'});
            if(!projects) return res.status(404).send({message: 'No hay projectos que mostrar'});
            
            return res.status(200).send({
                projects
            });
        });
    },
    //Actualicar datos
    updateProject: function(req, res){
        //Recogemos un parametro para indicar que objeto queremos editar
        let projectId = req.params.id;
        let update = req.body; //Objeto completo con los datos ya actualizados
        
        //Actualizamos {new: true} para que en la respuesta de los datos actualizados
        Project.findByIdAndUpdate(projectId, update, {new: true} ,(err, actualizado) =>{
            if(err) return res.status(500).send({message: 'Erro al actualizar los datos'});
            if(!actualizado) return res.status(404).send({message: 'No se encontro projecto a actualizar'});
            
            return res.status(200).send({
                project: actualizado
            });
        });
    },
    deleteProject: function(req, res){
        //Recogemos un parametro para indicar que objeto queremos borrar
        let projectId = req.params.id;
        
        //Actualizamos {new: true} para que en la respuesta de los datos actualizados
        Project.findByIdAndRemove(projectId, (err, projectDelete) =>{
            if(err) return res.status(500).send({message: 'Erro al borrar los datos'});
            if(!projectDelete) return res.status(404).send({message: 'No se encontro projecto a borrar'});
            
            return res.status(200).send({
                project: projectDelete
            });
        });
    },
    uploadImage: function(req, res){
        //Recogemos id del projecto sobre el cual se va a guardar la imagen
        let projectId = req.params.id;
        let fileName = 'Imagen no subida...';
        if (req.files) {
            var filePath = req.files.image.path; //Ubicacion del archivo
            let fileSplit = filePath.split('\\'); //Split del path
            fileName = fileSplit[1]; //Tomamos solo el nombre 

            //Validamos que sea un archivo valido '.png' '.jpg' etc
            let extSplit = fileName.split('\.'); //Cortamos por el punto
            let fileExt = extSplit[1]; //Sacamos lo que venga despues del punto

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeng' || fileExt == 'gif'){
                //SI ESTA BIEN ENTONCES EJECUTAMOS EL UPLOAD
                Project.findByIdAndUpdate(projectId, {image: fileName}, {new:true},(err, projectUpdate) => {
                    if(err) return res.status(500).send({message: 'Error al subir la imagen'});
                    if(!projectUpdate) return res.status(404).send({message: 'No se encontro projecto a ingresar'});
                    
                    return res.status(200).send({
                        project: projectUpdate
                    });
                });
            }else{
                //En caso de que el archivo no este bien, lo borramos de la carpeta upload
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({message: 'Extencion no valida'});
                });
            }
            
            
        }
    },
    //Metodo para devolver la imagen
    getImageFile: function(req, res){
        let file = req.params.image; //Recogemos el nombre del archivo que lo recibe desde la Url 
        let path_file = './uploads/'+file; //Obtenemos el path completo de la imagen

        //Verificamos de que exista el path
        fs.exists(path_file,(exixsts) => {
            if(exixsts){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(200).send({
                    message: "No existe la imagen"
                })
            }
        })
    }
};
module.exports = controller;