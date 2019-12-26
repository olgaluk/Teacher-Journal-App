import { Directive, ElementRef, Input, Renderer2, AfterContentChecked } from '@angular/core';

@Directive({
  selector: '[appHighlightingMark]'
})
export class HighlightingMarkDirective implements AfterContentChecked {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  @Input('appHighlightingMark') mark: number | null | undefined;

  ngAfterContentChecked() {
    this.highlight(this.mark);
  }

  private highlight(mark: number | null | undefined) {
    const parentElementRef = this.renderer.parentNode(this.elementRef.nativeElement);
    if (mark == null) {
      this.renderer.addClass(this.elementRef.nativeElement, 'background-color_white');
      this.renderer.addClass(parentElementRef, 'background-color_white');
    } else if (mark < 5) {
      this.renderer.addClass(this.elementRef.nativeElement, 'background-color_blue');
      this.renderer.addClass(parentElementRef, 'background-color_blue');
    } else {
      this.renderer.addClass(this.elementRef.nativeElement, 'background-color_green');
      this.renderer.addClass(parentElementRef, 'background-color_green');
    }
  }
}
