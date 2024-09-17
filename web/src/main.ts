import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app//app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';

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

const jwtProviders = JwtModule.forRoot(JWT_Module_Options).providers;

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([]), // Substitua com suas rotas se necessário
    ...jwtProviders, // Use spread operator para incluir os providers do JwtModule
  ],
}).catch(err => console.error(err));
