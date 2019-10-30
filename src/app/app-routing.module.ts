import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DataService } from './common/services/data.service';

import { HomeComponent } from './components/home/home.component';
import { StudentsTableComponent } from './components/students/student-page/students-table/students-table.component';
import { SubjectsTableComponent } from './components/subjects/subject-page/subjects-table/subjects-table.component';
import { StatisticComponent } from './components/statistics/statistic-page/statistic.component';
import { ExportComponent } from './components/export/export.component';
import { SubjectDetailComponent } from './components/subjects/subject-page/subject-detail/subject-detail.component';
import { SubjectTeachersComponent } from './components/subjects/subject-page/subject-teachers/subject-teachers.component';
import { AddingSubjectComponent } from './components/subjects/adding-subject-page/adding-subject/adding-subject.component';
import { AddingStudentComponent } from './components/students/adding-student-page/adding-student/adding-student.component';

import { NotFoundPageComponent } from './components/not-found/not-found-page/not-found-page.component';

import { ButtonAddComponent } from './shared/components/button/button-add/button-add.component';
import { InputFormGroupComponent } from './shared/components/form/input-form-group/input-form-group.component';
import { SelectFormGroupComponent } from './shared/components/form/select-form-group/select-form-group.component';
import { ModalComponent } from './shared/components/modal/modal.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'students', component: StudentsTableComponent, pathMatch: 'full' },
  { path: 'students/adding', component: AddingStudentComponent, pathMatch: 'full' },
  { path: 'subjects', component: SubjectsTableComponent, pathMatch: 'full' },
  { path: 'subjects/adding', component: AddingSubjectComponent, pathMatch: 'full' },
  { path: 'subjects/:id', component: SubjectTeachersComponent, pathMatch: 'full' },
  { path: 'subjects/:id/:teacherId', component: SubjectDetailComponent, pathMatch: 'full' },
  { path: 'statistics', component: StatisticComponent, pathMatch: 'full' },
  { path: 'export', component: ExportComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule
  ],
  exports: [
    RouterModule,
    HomeComponent,
    StudentsTableComponent,
    SubjectsTableComponent,
    StatisticComponent,
    ExportComponent,
    NotFoundPageComponent,
    ButtonAddComponent,
    InputFormGroupComponent,
    SelectFormGroupComponent,
    SubjectDetailComponent,
    AddingSubjectComponent,
    AddingStudentComponent,
    ModalComponent
  ],
  declarations: [
    HomeComponent,
    StudentsTableComponent,
    SubjectsTableComponent,
    StatisticComponent,
    ExportComponent,
    NotFoundPageComponent,
    ButtonAddComponent,
    InputFormGroupComponent,
    SelectFormGroupComponent,
    SubjectDetailComponent,
    SubjectTeachersComponent,
    AddingSubjectComponent,
    AddingStudentComponent,
    ModalComponent
  ],
  providers: [DataService]
})
export class AppRoutingModule { }
