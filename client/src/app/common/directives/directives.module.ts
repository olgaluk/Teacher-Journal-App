import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightingMarkDirective } from '../../common/directives/highlighting-mark.directive';
import { OutputAllMarksDirective } from '../../common/directives/output-all-marks.directive';

@NgModule({
  declarations: [
    HighlightingMarkDirective,
    OutputAllMarksDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HighlightingMarkDirective,
    OutputAllMarksDirective,
  ]
})
export class DirectivesModule { }
