/* Servicio de  proyectos con todos los modulos para crear un servicio inyectable */

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"; //Pra poder hacer peticiones ajax
import { Observable } from "rxjs"; //Para tomar la informacion en forma JSON

//Importamos el modelo
import { Project } from "../models/project";
//Impormaos el fichero de configuracion global
import { Global } from "./global";

@Injectable()
export class ProjectService{
    public url: string;

    constructor(
        //Cargamos el servicio de HttpClient
        private _http: HttpClient
    ){
        this.url = Global.url;
    };

    /* Metodo de prueba */
    testService(){
        return "Probando el servicio de Angular";
    };

    //Metodo para guardar un proyecto en la BD
    saveProject(project: Project): Observable<any>{ //Va a devolver un observable de cualquier tipo
        //Parametro que vamos a enviar
        let params = JSON.stringify(project);//Lo hacemos en formato JSON para que la api lo tome
        
        //Establecer como enviaremos la inormacion
        let headers = new HttpHeaders().set('Content-Type','application/json');//Esto se hace para indicar ue la informacion viaje en formato JSON
        
                        //(url de la api, '/save': metodo de guardar, parametros a enviar, cabecera)
        return this._http.post(this.url+'/save',params,{headers:headers});
    };

    //Metodo para obtener todos los datos 
    getProjects(): Observable<any>{
        //Establecer como enviaremos la inormacion
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.get(this.url+'projects',{headers:headers});//Hacemos el metodo get a la url de la API
    };

    //Metodo para sacr un unico servicio
    getProject(id:any) : Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.get(this.url+'project/'+id, {headers: headers});
    }
}