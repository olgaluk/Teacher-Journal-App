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

  @Input('appOutputAllMarks') marksInfo: string;

  @HostListener("mouseenter") onMouseEnter() {
    this.renderer.setAttribute(this.elementRef.nativeElement, "title", this.marksInfo);
    this.renderer.setStyle(this.elementRef.nativeElement, "opacity", "0.5");
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.renderer.setAttribute(this.elementRef.nativeElement, "title", "");
    this.renderer.setStyle(this.elementRef.nativeElement, "opacity", "1");
  }
}
