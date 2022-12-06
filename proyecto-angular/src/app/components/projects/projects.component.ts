import { Component, OnInit } from '@angular/core';

//Importamos el modelo de projects
import { Project } from 'src/app/models/project';

//Importamos el servicio 
import { ProjectService } from 'src/app/services/project.service';

//Cargamos el Global para sacar el url del API
import { Global } from 'src/app/services/global';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {

  //Creamos array de objetos de tipo proyectos
  public projects: Project[];

  //Propiedad para devolver imagen
  public url:string;

  constructor(
    private _projectService: ProjectService
  ) { 
    this.projects = new Array();
    this.url = Global.url; //Guardamos la url
  }

  ngOnInit(): void {
    //A penas se cargue la vista cargamos los proyectos
    this.getProjects();
  }

  getProjects(){
    this._projectService.getProjects().subscribe(
      response => {
        //Valiamos si nos llegan projects
        if (response.projects) {
          this.projects = response.projects;
        }
      },
      error => console.log(error)
    )
  }

}
