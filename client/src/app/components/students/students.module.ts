import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from '../../app-routing.module';

import { StudentsTableComponent } from './student-page/students-table/students-table.component';
import { AddingStudentComponent } from './adding-student-page/adding-student/adding-student.component';
import { SearchComponent } from './student-page/search/search.component';

import { SharedModule } from '../../shared/shared.module';
import { DirectivesModule } from '../../common/directives/directives.module';
import { PipesModule } from '../../common/pipes/pipes.module';

@NgModule({
  declarations: [
    StudentsTableComponent,
    AddingStudentComponent,
    SearchComponent,
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
    StudentsTableComponent,
    AddingStudentComponent,
    SearchComponent,
  ],
})
export class StudentsModule { }
