import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextEditorService {

  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  setColor(color: string, font: boolean = true) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return;
    }

    const range = selection.getRangeAt(0);
    const selectedContents = range.extractContents() as DocumentFragment | any;
    
    // Check if the selected content is wrapped in a span
    if (selectedContents.childNodes.length === 1 && selectedContents.firstChild.nodeName === 'SPAN') {
      const span = selectedContents.firstChild as HTMLElement;
      
      // Unwrap the span by moving its children out of it
      const parent = span.parentNode;
      while (span.firstChild) {
        parent?.insertBefore(span.firstChild, span);
      }
      parent?.removeChild(span);  // Remove the span itself

      // Now reapply the new style
      const newSpan = this.renderer.createElement('span');
      this.renderer.setStyle(newSpan, font ? 'color' : 'background-color', color);
      range.surroundContents(newSpan);
    } else {
      // If not wrapped in a span, just wrap it with a new styled span
      const newSpan = this.renderer.createElement('span');
      this.renderer.setStyle(newSpan, font ? 'color' : 'background-color', color);
      range.surroundContents(newSpan);
    }

    selection.removeAllRanges();
    selection.addRange(range);
  }
}