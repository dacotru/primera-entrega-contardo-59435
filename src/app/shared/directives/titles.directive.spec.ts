import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[titles]'
})
export class TitlesDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '10px');
  }
}
