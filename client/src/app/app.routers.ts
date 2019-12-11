import { Routes } from '@angular/router';

import { paths } from './common/constants/paths';

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
  { path: paths.home, component: HomeComponent, pathMatch: 'full' },
  { path: paths.studentsTable, component: StudentsTableComponent, pathMatch: 'full' },
  { path: paths.addingStudent, component: AddingStudentComponent, pathMatch: 'full' },
  { path: paths.subjectsTable, component: SubjectsTableComponent, pathMatch: 'full' },
  { path: paths.addingSubject, component: AddingSubjectComponent, pathMatch: 'full' },
  { path: paths.subjectTeachers, component: SubjectTeachersComponent, pathMatch: 'full' },
  {
    path: paths.subjectDetail,
    component: SubjectDetailComponent,
    pathMatch: 'full',
    canDeactivate: [ExitSubjectDetailPageGuard]
  },
  { path: paths.statistic, component: StatisticPageComponent, pathMatch: 'full' },
  { path: paths.statisticStudents, component: StatisticStudentsPageComponent, pathMatch: 'full' },
  { path: paths.export, component: ExportComponent, pathMatch: 'full' },
  { path: paths.notFoundPage, component: NotFoundPageComponent, pathMatch: 'full' },
  { path: paths.main, redirectTo: paths.home, pathMatch: 'full' },
  { path: paths.nameless, redirectTo: paths.notFoundPage }
];