import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[columnResizable]'
})
export class ColumnResizableDirective {
  private startX = 0;
  private startWidth = 0;
  private resizing = false;

  private mouseMoveListener: any;
  private mouseUpListener: any;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
    const handle = event.target as HTMLElement;
    if (handle.classList.contains('resize-handle')) {
      event.preventDefault();
      this.startX = event.pageX;
      this.startWidth = parseInt(getComputedStyle(this.elementRef.nativeElement).width, 10);
      this.resizing = true;

      // Add event listeners to the document for mousemove and mouseup events
      this.mouseMoveListener = this.onMouseMove.bind(this);
      this.mouseUpListener = this.onMouseUp.bind(this);
      document.addEventListener('mousemove', this.mouseMoveListener);
      document.addEventListener('mouseup', this.mouseUpListener);
    }
  }

  onMouseMove(event: MouseEvent) {
    if (this.resizing) {
      const movementX = event.pageX - this.startX;
      const newWidth = this.startWidth + movementX;
      this.renderer.setStyle(this.elementRef.nativeElement, 'width', `${newWidth}px`);
    }
  }

  onMouseUp() {
    if (this.resizing) {
      this.resizing = false;

      // Remove event listeners when dragging ends
      document.removeEventListener('mousemove', this.mouseMoveListener);
      document.removeEventListener('mouseup', this.mouseUpListener);
    }
  }
}
