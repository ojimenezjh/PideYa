import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterPopoverPage } from './filter-popover.page';

const routes: Routes = [
  {
    path: '',
    component: FilterPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterPopoverPageRoutingModule {}
