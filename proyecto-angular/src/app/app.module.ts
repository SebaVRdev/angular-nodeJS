import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from './components/detail/detail.component';
//Importamos las configuraciones de rutas
import { routing, appRoutingProviders } from './app.routing';

//Importamos nuestros modulos de http y el de los formularios
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ProjectsComponent,
    CreateComponent,
    ContactComponent,
    ErrorComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing, //Se importa ya que es un modulo
    HttpClientModule,
    FormsModule
  ],
  providers: [
    appRoutingProviders //Se declara aca ya que es un servicio
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
