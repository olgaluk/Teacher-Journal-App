import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './components/home-page/home.component';
import { StudentsTableComponent } from './components/students/student-page/students-table/students-table.component';
import { SubjectsTableComponent } from './components/subjects/subject-page/subjects-table/subjects-table.component';
import { StatisticComponent } from './components/statistics/statistic-page/statistic.component';
import { ExportComponent } from './components/export/export.component';
import { SubjectDetailComponent } from './components/subjects/subject-page/subject-detail/subject-detail.component';

import { NotFoundComponent } from './components/not-found/not-found.component';

import { ButtonAddComponent } from './shared/components/button/button-add/button-add.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'students', component: StudentsTableComponent, pathMatch: 'full' },
  { path: 'subjects', component: SubjectsTableComponent, pathMatch: 'full' },
  { path: 'subjects/:id', component: SubjectDetailComponent },
  { path: 'statistics', component: StatisticComponent, pathMatch: 'full' },
  { path: 'export', component: ExportComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
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
    NotFoundComponent,
    ButtonAddComponent,
    SubjectDetailComponent
  ],
  declarations: [
    HomeComponent,
    StudentsTableComponent,
    SubjectsTableComponent,
    StatisticComponent,
    ExportComponent,
    NotFoundComponent,
    ButtonAddComponent,
    SubjectDetailComponent
  ],
})
export class AppRoutingModule { }
