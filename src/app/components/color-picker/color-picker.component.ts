import { Component, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent {
  expanded = false;
  fontColor = 'black';

  colors = ['#000000', '#fff', '#e60000',
    '#ff9900', '#ffff00', '#008a00',
    '#0066cc', '#9933ff', '#facccc',
    '#ffebcc', '#ffffcc', '#cce8cc',
    '#cce0f5', '#ebd6ff', '#bbbbbb',
    '#f06666', '#ffc266', '#ffff66',
    '#66b966', '#66a3e0', '#c285ff',
    '#888888', '#a10000', '#b26b00',
    '#b2b200', '#006100', '#0047b2',
    '#6b24b2', '#444444', '#5c0000',
    '#663d00', '#666600', '#003700',
    '#002966', '#3d1466'];

  @Input() selectionText: string = '';
  @Input() editableDiv: any;

  @Output() OnColorClick = new EventEmitter();
  constructor(private elementRef: ElementRef) {

  }

  openColors() {
    this.expanded = !this.expanded;
  }

  onColorChange(color: string) {
    this.OnColorClick.emit(color || 'black');
  }

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: ElementRef) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.expanded = false;
    }
  }

}
