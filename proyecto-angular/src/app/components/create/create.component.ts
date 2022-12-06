import { Component, OnInit } from '@angular/core';

//Importamos el modelo de Proyecto para poder crearlo
import { Project } from 'src/app/models/project';
//Importamos el servicio para hacer la peticion
import { ProjectService } from 'src/app/services/project.service';

//Importamos servicio para subir archivos
import { UploadService } from 'src/app/services/upload.service';

//Importamos Global para sacar la URL
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, //Cargamos servicio
              UploadService]
})
export class CreateComponent implements OnInit {
  //Creamos propiedad para titulo del componente
  public title: string;
  public status: string;
  public saveProject: Project;

  public project: Project; //Objeto que modificara el formulario

  public fileToUpload: Array<File>; //Archivos para subir

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ){
    this.title = 'Crear proyecto';
    this.status = "";
    this.saveProject = new Project('','','','',2022,'','');
    this.project = new Project('','','','',2022,'',''); //Objeto por defecto que se ira modificando con el formulario
    this.fileToUpload =  new Array();
  }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    //Cuando hacemos onSubmit utilizamos el metodo de los servicios
    this._projectService.saveProject(this.project).subscribe(
      response => {
        if (response.project) {
          
          //Una vez se hayan cargado correctamente los datos, recien aqui subimos la imagen
                                            //(url/metodo/:id) 
          this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id,[],this.fileToUpload,'image')
          .then((result: any) => {
            this.saveProject = result.project;

            this.status = 'success';
            console.log(result);
            //Limpiamos el form
            form.reset();
          })
        }
        else{
          this.status = 'failed';
        }
      },
      error => console.log(error)
    )
  };

  //Cada vez que haya un cambio se ejecuta esto
  fileChangeEvent(fileInput: any){
    //Entrega un evento "FileInput" en esa informacion estara el nombre del archivo que se ha seleccionado
    console.log(fileInput);
    this.fileToUpload = <Array<File>>fileInput.target.files; //Guardamos el dato en esta variable que se utilizara en el makeFileRequest()
    console.log(this.fileToUpload);
  }



}
