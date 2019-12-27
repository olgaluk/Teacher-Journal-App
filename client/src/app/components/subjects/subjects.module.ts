import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from '../../app-routing.module';

import { SubjectsTableComponent } from '../../components/subjects/subject-page/subjects-table/subjects-table.component';
import { SubjectDetailComponent } from '../../components/subjects/subject-page/subject-detail/subject-detail.component';
import { SubjectTeachersComponent } from '../../components/subjects/subject-page/subject-teachers/subject-teachers.component';
import { AddingSubjectComponent } from '../../components/subjects/adding-subject-page/adding-subject/adding-subject.component';

import { ExitSubjectDetailPageGuard } from '../../guards/exit.subject-detail-page.guard';

import { SharedModule } from '../../shared/shared.module';
import { DirectivesModule } from '../../common/directives/directives.module';
import { PipesModule } from '../../common/pipes/pipes.module';

@NgModule({
  declarations: [
    SubjectsTableComponent,
    SubjectDetailComponent,
    SubjectTeachersComponent,
    AddingSubjectComponent,   
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DirectivesModule,
    PipesModule,
  ],
  exports: [
    SubjectsTableComponent,
    SubjectDetailComponent,
    SubjectTeachersComponent,
    AddingSubjectComponent,
  ],
  providers: [ExitSubjectDetailPageGuard],
})
export class SubjectsModule { }
