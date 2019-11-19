import { Routes } from '@angular/router';

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
import { ExitSubjectDetailPageGuard } from './guards/exit.subject-detail-page.guard';

export const ROUTES: Routes = [
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