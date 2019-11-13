import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SortPipe } from './common/pipes/sort/sort.pipe';
import { AverageMarkPipe } from './common/pipes/average-mark/average-mark.pipe';
import { StudentMarksPipe } from './common/pipes/student-marks/student-marks.pipe';

import { HighlightingMarkDirective } from './common/directives/highlighting-mark.directive';
import { OutputAllMarksDirective } from './common/directives/output-all-marks.directive';

import { HomeComponent } from './components/home/home.component';
import { StudentsTableComponent } from './components/students/student-page/students-table/students-table.component';
import { SubjectsTableComponent } from './components/subjects/subject-page/subjects-table/subjects-table.component';
import { StatisticPageComponent } from './components/statistics/statistic-page/statistic-page.component';
import { StatisticStudentsPageComponent } from './components/statistics/statistic-students-page/statistic-students-page.component';
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
import { BreadcrumbsComponent } from './shared/components/breadcrumbs/breadcrumbs.component';
import { ModalContentComponent } from './shared/components/modal-content/modal-content.component';
import { DatepickerComponent } from './shared/components/datepicker/datepicker.component';

import { ExitSubjectDetailPageGuard } from './guards/exit.subject-detail-page.guard';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'students', component: StudentsTableComponent, pathMatch: 'full' },
  { path: 'students/adding', component: AddingStudentComponent, pathMatch: 'full' },
  { path: 'subjects', component: SubjectsTableComponent, pathMatch: 'full' },
  { path: 'subjects/adding', component: AddingSubjectComponent, pathMatch: 'full' },
  { path: 'subjects/:id', component: SubjectTeachersComponent, pathMatch: 'full' },
  {
    path: 'subjects/:subjectName/:teacherId',
    component: SubjectDetailComponent,
    pathMatch: 'full',
    canDeactivate: [ExitSubjectDetailPageGuard]
  },
  { path: 'statistics', component: StatisticPageComponent, pathMatch: 'full' },
  { path: 'statistics/students', component: StatisticStudentsPageComponent, pathMatch: 'full' },
  { path: 'export', component: ExportComponent, pathMatch: 'full' },
  { path: 'nonexistent', component: NotFoundPageComponent, pathMatch: 'full' },
  { path: 'main', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/nonexistent' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [
    RouterModule,
    HomeComponent,
    StudentsTableComponent,
    SubjectsTableComponent,
    StatisticPageComponent,
    ExportComponent,
    NotFoundPageComponent,
    ButtonAddComponent,
    InputFormGroupComponent,
    SelectFormGroupComponent,
    SubjectDetailComponent,
    AddingSubjectComponent,
    AddingStudentComponent,
    ModalComponent,
    BreadcrumbsComponent,
    ModalContentComponent,
    DatepickerComponent,
    SortPipe,
    AverageMarkPipe,
    StudentMarksPipe,
    StatisticStudentsPageComponent,
    HighlightingMarkDirective,
    OutputAllMarksDirective
  ],
  declarations: [
    HomeComponent,
    StudentsTableComponent,
    SubjectsTableComponent,
    StatisticPageComponent,
    ExportComponent,
    NotFoundPageComponent,
    ButtonAddComponent,
    InputFormGroupComponent,
    SelectFormGroupComponent,
    SubjectDetailComponent,
    SubjectTeachersComponent,
    AddingSubjectComponent,
    AddingStudentComponent,
    ModalComponent,
    BreadcrumbsComponent,
    ModalContentComponent,
    DatepickerComponent,
    SortPipe,
    AverageMarkPipe,
    StudentMarksPipe,
    StatisticStudentsPageComponent,
    HighlightingMarkDirective,
    OutputAllMarksDirective
  ],
  providers: [ExitSubjectDetailPageGuard],
  entryComponents: [ModalContentComponent]
})
export class AppRoutingModule { }
