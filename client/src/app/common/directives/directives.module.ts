import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightingMarkDirective } from '../../common/directives/highlighting-mark.directive';

@NgModule({
  declarations: [
    HighlightingMarkDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HighlightingMarkDirective,
  ]
})
export class DirectivesModule { }
