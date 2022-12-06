/* Servicio unicamente para subir imagenes a la base de datos */

import { Injectable } from "@angular/core";
import { Global } from "./global";

@Injectable()
export class UploadService{
    public url: string;
    constructor(){
        this.url = Global.url;
    }

    //Metodo que ermite hacer pericion ajax clasica pero en la cual juntamos un archivo para subir
    makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string){
        return new Promise(function(resolve, reject){
            //Definios la peticion 
            let formData = new FormData();
            let xhr = new XMLHttpRequest();//OBJETO DE PETICIONES ASINCRONAS
            
            //Recorremos todos los archivos que recibamos
            for(let i = 0; i < files.length; i++){  
                formData.append(name,files[i], files[i].name); //agregamos el nombre que indiquemos, adjuntamos el fichero y recogemos el nombre
            }

            //Peticion ajax
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    }else{
                        reject(xhr.response);
                    }
                }
            }

            xhr.open('POST', url, true);
            xhr.send(formData);
        });
    }
}
