/* Fichero donde se va a configurar las partes 
principales del proyecto */
'use strict'
let mongoose = require('mongoose'); //Cargamos el modulo mongoose 
let app = require('./app'); //Llamamos al modulo app que se encuentra en el fichero "app"
const PORT = 3700;

//Realizamos conexion a la base de datos
mongoose.Promise = global.Promise; //Indicamos que es una promesa

mongoose.connect('mongodb://127.0.0.1:27017/portafolio') 
    .then(() => {
        console.log("Conexion a la base de datos establecida satisfactoriamente!");
    
        /* Una vez realicemos la conexion a la BD haremos la ejecucion del servidor */
        //app.listen(puerto, FUNCIONCALL)
        app.listen(PORT, () => {
            console.log(`Servidor corriendo corretamente corriendo en la url: localhost:${PORT}`);
        });
    })
    .catch(error => console.log(error));