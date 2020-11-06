import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCardPage } from './view-card.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCardPageRoutingModule {}
