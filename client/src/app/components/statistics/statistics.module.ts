import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from '../../app-routing.module';

import { StatisticPageComponent } from './statistic-page/statistic-page.component';
import { StatisticStudentsPageComponent } from './statistic-students-page/statistic-students-page.component';

import { SharedModule } from '../../shared/shared.module';
import { DirectivesModule } from '../../common/directives/directives.module';
import { PipesModule } from '../../common/pipes/pipes.module';

@NgModule({
  declarations: [
    StatisticPageComponent,
    StatisticStudentsPageComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    SharedModule,
    DirectivesModule,
    PipesModule,
  ],
  exports: [
    StatisticPageComponent,
    StatisticStudentsPageComponent,
  ],
})
export class StatisticsModule { }
