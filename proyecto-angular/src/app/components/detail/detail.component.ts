import { Component, OnInit } from '@angular/core';
//Importamos el modelo de projects
import { Project } from 'src/app/models/project';

//Importamos el servicio 
import { ProjectService } from 'src/app/services/project.service';

//Cargamos el Global para sacar el url del API
import { Global } from 'src/app/services/global';

//Importamos componentes del router para obtener el id 
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {

  public url: string;
  public project: Project;
  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.url = Global.url;
    this.project = new Project('','','','',2022,'','');
  }

  ngOnInit(): void {
    //Recogemos parametros de la url
    this._route.params.subscribe(params => {
      let id = params["id"];
      //LLmamos a la funcion para obtener el projecto
      this.getProject(id);
    })
  }

  getProject(id:any){
    this._projectService.getProject(id).subscribe(
      response => {
        this.project = response.project;
        console.log(this.project)
      },
      err => {
        console.log(err)
      }
    )
  }
}
