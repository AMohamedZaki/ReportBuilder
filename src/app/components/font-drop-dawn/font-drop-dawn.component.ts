import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-font-drop-dawn',
  templateUrl: './font-drop-dawn.component.html',
  styles: ['']
})
export class FontDropDawnComponent {
  expanded = false;


  constructor(private elementRef: ElementRef) {

  }

  open() {
    this.expanded = !this.expanded;
  }


  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: ElementRef) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.expanded = false;
    }
  }
}
