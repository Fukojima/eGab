import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'crud',
    loadChildren: () => import('./pages/crud/crud.module').then( m => m.CrudPageModule)
  },
  {
    path: 'home-apoio',
    loadChildren: () => import('./pages/home-apoio/home-apoio.module').then( m => m.HomeApoioPageModule)
  },
  {
    path: 'home-admin',
    loadChildren: () => import('./pages/home-admin/home-admin.module').then( m => m.HomeAdminPageModule)
  },
  {
    path: 'home-filiador',
    loadChildren: () => import('./pages/home-filiador/home-filiador.module').then( m => m.HomeFiliadorPageModule)
  },
  {
    path: 'register-filiador',
    loadChildren: () => import('./pages/register-filiador/register-filiador.module').then( m => m.RegisterFiliadorPageModule)
  },
  {
    path: 'register-lideranca',
    loadChildren: () => import('./pages/register-lideranca/register-lideranca.module').then( m => m.RegisterLiderancaPageModule)
  },
  {
    path: 'mudar-senha',
    loadChildren: () => import('./pages/mudar-senha/mudar-senha.module').then( m => m.MudarSenhaPageModule)
  },
  {
    path: 'register-apoio',
    loadChildren: () => import('./pages/register-apoio/register-apoio.module').then( m => m.RegisterApoioPageModule)
  },
  {
    path: 'consulta-cadastro',
    loadChildren: () => import('./pages/consulta-cadastro/consulta-cadastro.module').then( m => m.ConsultaCadastroPageModule)
  },
  {
    path: 'cadastro-pendente',
    loadChildren: () => import('./pages/cadastro-pendente/cadastro-pendente.module').then( m => m.CadastroPendentePageModule)
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'modal-filiados',
    loadChildren: () => import('./pages/modal-filiados/modal-filiados.module').then( m => m.ModalFiliadosPageModule)
  },
  {
    path: 'consulta-filiador',
    loadChildren: () => import('./pages/consulta-filiador/consulta-filiador.module').then( m => m.ConsultaFiliadorPageModule)
  },
  {
    path: 'perfil-lideranca',
    loadChildren: () => import('./pages/perfil-lideranca/perfil-lideranca.module').then( m => m.PerfilLiderancaPageModule)
  },
  {
    path: 'perfil-filiador',
    loadChildren: () => import('./pages/perfil-filiador/perfil-filiador.module').then( m => m.PerfilFiliadorPageModule)
  },
  {
    path: 'perfil-apoio',
    loadChildren: () => import('./pages/perfil-apoio/perfil-apoio.module').then( m => m.PerfilApoioPageModule)
  },
  {
    path: 'consulta-apoio',
    loadChildren: () => import('./pages/consulta-apoio/consulta-apoio.module').then( m => m.ConsultaApoioPageModule)
  },
  {
    path: 'modal-apoio',
    loadChildren: () => import('./pages/modal-apoio/modal-apoio.module').then( m => m.ModalApoioPageModule)
  },
  {
    path: 'modal-lideranca-pendente',
    loadChildren: () => import('./pages/modal-lideranca-pendente/modal-lideranca-pendente.module').then( m => m.ModalLiderancaPendentePageModule)
  },
  {
    path: 'perfil-lideranca-filiador',
    loadChildren: () => import('./pages/perfil-lideranca-filiador/perfil-lideranca-filiador.module').then( m => m.PerfilLiderancaFiliadorPageModule)
  },
  {
    path: 'mensagem',
    loadChildren: () => import('./pages/mensagem/mensagem.module').then( m => m.MensagemPageModule)
  },
  {
    path: 'register-filiador-apoio',
    loadChildren: () => import('./pages/register-filiador-apoio/register-filiador-apoio.module').then( m => m.RegisterFiliadorApoioPageModule)
  },
  {
    path: 'consulta-cadastro-lideranca',
    loadChildren: () => import('./pages/consulta-cadastro-lideranca/consulta-cadastro-lideranca.module').then( m => m.ConsultaCadastroLiderancaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
