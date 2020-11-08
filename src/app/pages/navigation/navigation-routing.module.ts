import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavigationPage } from './navigation.page';

const routes: Routes = [
  {
    path: '',
    component: NavigationPage
  },  {
    path: 'filter-popover',
    loadChildren: () => import('./filter-popover/filter-popover.module').then( m => m.FilterPopoverPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavigationPageRoutingModule {}
