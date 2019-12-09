import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SortPipe } from './sort/sort.pipe';
import { AverageMarkPipe } from './average-mark/average-mark.pipe';
import { StudentMarksPipe } from './student-marks/student-marks.pipe';

@NgModule({
  declarations: [
    SortPipe,
    AverageMarkPipe,
    StudentMarksPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SortPipe,
    AverageMarkPipe,
    StudentMarksPipe,
  ]
})
export class PipesModule { }
