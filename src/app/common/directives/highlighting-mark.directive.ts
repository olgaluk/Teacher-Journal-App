import { Directive, ElementRef, Input, Renderer2, AfterContentChecked } from '@angular/core';

@Directive({
  selector: '[appHighlightingMark]'
})
export class HighlightingMarkDirective implements AfterContentChecked {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  @Input('appHighlightingMark') mark: number;

  ngAfterContentChecked () {
    this.highlight(this.mark);
  }

  private highlight(mark: number) {
    if (mark < 5) {
      this.renderer.setStyle(this.elementRef.nativeElement, "backgroundColor", "#b6fbfd");
    } else {
      this.renderer.setStyle(this.elementRef.nativeElement, "backgroundColor", "#c8fdcc");
    }
  }
}
