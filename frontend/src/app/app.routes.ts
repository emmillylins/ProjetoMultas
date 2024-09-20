import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AuthGuard } from './auth/auth.guard';
import { ListarMultasComponent } from './pages/listar-multas/listar-multas.component';

export const routes: Routes = [
    { path:'', component:HomeComponent },
    { path:'login', component:LoginComponent },    
    { path:'cadastro', component:CadastroComponent },
    { path:'usuarios', component:UsuariosComponent, canActivate: [AuthGuard] },
    { path:'listar-multas', component:ListarMultasComponent, canActivate: [AuthGuard] },
];
