import { Directive, ElementRef, Input, Renderer2, AfterContentChecked } from '@angular/core';

@Directive({
  selector: '[appHighlightingMark]'
})
export class HighlightingMarkDirective implements AfterContentChecked {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  @Input('appHighlightingMark') mark: number;

  ngAfterContentChecked() {
    this.highlight(this.mark);
  }

  private highlight(mark: number) {
    const parentElementRef = this.renderer.parentNode(this.elementRef.nativeElement);
    if (!mark && mark !== 0) {
      this.renderer.setStyle(this.elementRef.nativeElement, "backgroundColor", "#ffffff");
      this.renderer.setStyle(parentElementRef, "backgroundColor", "#ffffff");
    } else if (mark < 5) {
      this.renderer.setStyle(this.elementRef.nativeElement, "backgroundColor", "#b3f3fc");
      this.renderer.setStyle(parentElementRef, "backgroundColor", "#b3f3fc");
    } else {
      this.renderer.setStyle(this.elementRef.nativeElement, "backgroundColor", "#cdfcb3");
      this.renderer.setStyle(parentElementRef, "backgroundColor", "#cdfcb3");
    }
  }
}
