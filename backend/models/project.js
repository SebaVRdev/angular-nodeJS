//ENTIDAD DE "PROJECTS" EN LA BASE DE DATOS
'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;//Cargamos el esquema

//Creamos el esquema de project
//Objeto molde sobre el cual estaremos creando nuevos projectos en la BD
let ProjectSchema = mongoose.Schema({
    name: String,
    description: String,
    category: String,
    langs: String,
    year: Number,
    image: String
}); 

//Exportamos el modelo
                            //('coleecion que pertenece',el esquema creado)
module.exports = mongoose.model('Project',ProjectSchema);
//Project -> projects (asi lo tenemos en la BD) mongoose se encarga de convertirlo
