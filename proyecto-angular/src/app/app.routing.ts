//Configuramos nuestras rutas
import { createComponent, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//Importamos los componentes
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from "./components/detail/detail.component";
//Definimos las rutas
const appRoutes: Routes = [
    {path: '',component: AboutComponent},
    {path: 'sobre-mi',component: AboutComponent},
    {path: 'proyectos',component: ProjectsComponent},
    {path: 'crear-proyecto',component: CreateComponent},
    {path: 'contacto',component: ContactComponent},
    {path: 'project/:id',component: DetailComponent},
    {path: '**',component: ErrorComponent} //ruta 404 cuando no encuentre nada, cargamos una pagina de error
];

//Exportamos configuracion de las rutas
export const appRoutingProviders: any[] = [];
//Cargamos la configuracion de rutas en el rooter de angular
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);