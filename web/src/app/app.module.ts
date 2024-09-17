import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { AppComponent } from './app.component'; // Importar o componente standalone

export function tokenGetter() {
  return localStorage.getItem('token');
}

const JWT_Module_Options: JwtModuleOptions = {
  config: {
    tokenGetter: tokenGetter,
    allowedDomains: ['localhost:5000'],
    disallowedRoutes: ['localhost:5000/Auth/login'],
  },
};

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    JwtModule.forRoot(JWT_Module_Options),
    AppComponent, // Importar o componente standalone aqui
  ],
  providers: [],
  bootstrap: [AppComponent], // Referenciar o componente standalone aqui
})
export class AppModule {}
