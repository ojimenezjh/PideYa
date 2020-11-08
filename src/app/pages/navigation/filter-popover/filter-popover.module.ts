import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterPopoverPageRoutingModule } from './filter-popover-routing.module';

import { FilterPopoverPage } from './filter-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterPopoverPageRoutingModule
  ],
  declarations: [FilterPopoverPage]
})
export class FilterPopoverPageModule {}
