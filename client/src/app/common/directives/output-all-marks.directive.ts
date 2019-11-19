import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appOutputAllMarks]'
})
export class OutputAllMarksDirective {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  @Input('appOutputAllMarks') marks: number[];

  @HostListener('mouseenter') onMouseEnter() {
    const info = this.marks.join(' ,  ');
    this.renderer.setAttribute(this.elementRef.nativeElement, 'title', info);
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', '#6103a3');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'title', '');
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', '#000000');
  }
}
