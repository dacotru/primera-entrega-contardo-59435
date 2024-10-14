import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appTitles]'
})
export class TitlesDirective implements OnInit {

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.el.nativeElement.style.fontSize = '20px';
  }
}
