import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../../app-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [
    AppRoutingModule,
    CommonModule,
    SharedModule,
  ],
  exports: [NotFoundPageComponent]
})
export class NotFoundPageModule { }
