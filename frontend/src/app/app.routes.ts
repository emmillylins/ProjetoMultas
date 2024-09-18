import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { MultasComponent } from './pages/multas/multas.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'login',
        component:LoginComponent
    },    
    {
        path:'cadastro',
        component:CadastroComponent
    },
    {
        path:'listar-multas',
        component:MultasComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'usuarios',
        component:UsuariosComponent,
        canActivate: [AuthGuard]
    },
];
