import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appImageResizer]'
})
export class ImageResizerDirective {

  @Input() width: number = 0;
  @Input() height: number = 0;
  private startX: number = 0;
  private startY: number= 0;
  private startWidth: number= 0;
  private startHeight: number= 0;
  
  constructor(private el: ElementRef) { }

  @HostListener('mousedown', ['$event']) onMousedown(event: MouseEvent) {
    this.width = this.startWidth + (event.clientX - this.startX);
    this.height = this.startHeight + (event.clientY - this.startY);
    this.el.nativeElement.style.width = this.width + 'px';
    this.el.nativeElement.style.height = this.height + 'px';
    document.addEventListener('mouseup', this.onMouseup);
  }
  
  // @HostListener('mousemove', ['$event']) onMousemove(event: MouseEvent) {
  //   this.width = this.startWidth + (event.clientX - this.startX);
  //   this.height = this.startHeight + (event.clientY - this.startY);
  //   this.el.nativeElement.style.width = this.width + 'px';
  //   this.el.nativeElement.style.height = this.height + 'px';
  // }
  
  @HostListener('mouseup', ['$event']) onMouseup(event: MouseEvent) {
    // document.removeEventListener('mousemove', this.onMousemove);
    document.removeEventListener('mouseup', this.onMouseup);
  }
  
}
