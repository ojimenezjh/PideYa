import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RegisterPage } from './pages/auth/register/register.page';
import { CardsListPage } from './pages/cards-list/cards-list.page';
import { AuthGuard } from './guards/auth.guard';
import {TokenValidation} from '../libs/verifyToken'
import { ViewCardPage } from './pages/cards-list/view-card/view-card.page';
import { MesaPage } from './pages/auth/mesa/mesa.page';
import { MesaGuard } from './guards/mesa.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch:'full'},
  { path: 'cards', component: CardsListPage, canActivate: [AuthGuard, MesaGuard]},
  { path: 'cards/view/:id', component: ViewCardPage, canActivate: [AuthGuard, MesaGuard]}, 
  { path: 'register', component: RegisterPage },
  { path: 'mesa', component: MesaPage, canActivate: [AuthGuard] },
  
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'cards-list',
    loadChildren: () => import('./pages/cards-list/cards-list.module').then( m => m.CardsListPageModule)
  },
  {
    path: 'navigation',
    loadChildren: () => import('./pages/navigation/navigation.module').then( m => m.NavigationPageModule)
  },
  {
    path: 'view-card',
    loadChildren: () => import('./pages/cards-list/view-card/view-card.module').then( m => m.ViewCardPageModule)
  },
  {
    path: 'mesa',
    loadChildren: () => import('./pages/auth/mesa/mesa.module').then( m => m.MesaPageModule)
  },
  {
    path: 'filter-popover',
    loadChildren: () => import('./pages/navigation/filter-popover/filter-popover.module').then( m => m.FilterPopoverPageModule)
  },


 /*  {
    path: 'cart-modal',
    loadChildren: () => import('./pages/cart-modal/cart-modal.module').then( m => m.CartModalPageModule)
  } */



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }