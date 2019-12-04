import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
import { SearchComponent } from './components/students/student-page/search/search.component';
import { NotificationSelfClosingComponent } from './shared/notifications/notification-self-closing/notification-self-closing.component';

import { NotFoundPageComponent } from './components/not-found/not-found-page/not-found-page.component';

import { ButtonAddComponent } from './shared/components/button/button-add/button-add.component';
import { InputFormGroupComponent } from './shared/components/form/input-form-group/input-form-group.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { BreadcrumbsComponent } from './shared/components/breadcrumbs/breadcrumbs.component';
import { ModalContentComponent } from './shared/components/modal-content/modal-content.component';
import { DatepickerComponent } from './shared/components/datepicker/datepicker.component';

import { ExitSubjectDetailPageGuard } from './guards/exit.subject-detail-page.guard';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ROUTES } from "./app.routers";

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES),
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
    SubjectDetailComponent,
    AddingSubjectComponent,
    AddingStudentComponent,
    SearchComponent,
    ModalComponent,
    BreadcrumbsComponent,
    ModalContentComponent,
    DatepickerComponent,
    SortPipe,
    AverageMarkPipe,
    StudentMarksPipe,
    StatisticStudentsPageComponent,
    HighlightingMarkDirective,
    OutputAllMarksDirective,
    NotificationSelfClosingComponent
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
    SubjectDetailComponent,
    SubjectTeachersComponent,
    AddingSubjectComponent,
    AddingStudentComponent,
    SearchComponent,
    ModalComponent,
    BreadcrumbsComponent,
    ModalContentComponent,
    DatepickerComponent,
    SortPipe,
    AverageMarkPipe,
    StudentMarksPipe,
    StatisticStudentsPageComponent,
    HighlightingMarkDirective,
    OutputAllMarksDirective,
    NotificationSelfClosingComponent
  ],
  providers: [ExitSubjectDetailPageGuard],
  entryComponents: [ModalContentComponent]
})
export class AppRoutingModule { }
