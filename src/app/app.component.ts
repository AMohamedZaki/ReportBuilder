import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TextEditor';
  model = "some text";

  isEdit = true;

  constructor() {
   
  }

  ngOnInit(): void {
    const myContainer = <HTMLElement>document.querySelector("#myEditor");
    myContainer.innerHTML = '<h1>Test</h1>';
  }

  
  SetHeader(header: string = '') {
    document.execCommand('bold', false, header);
  }

  BoldText(font = '') {
    document.execCommand(font, false);
  }

  getContent(text = '') {
    this.model = text;
  }

  onMouseUp(): void {
    const selection = <Selection> window.getSelection();
    if (selection && selection.toString()) {
      const focusNode = <Node> selection.focusNode;
      const element = <HTMLElement> focusNode.parentElement;
      const isBold = this.isFontBold(element);
      console.log(`The selected text is ${isBold ? 'bold' : 'not bold'}`);
    }
  }

  isFontBold(element: HTMLElement): boolean {
    const fontWeight = window.getComputedStyle(element).getPropertyValue('font-weight');
    return fontWeight === 'bold' || parseInt(fontWeight, 10) >= 700;
  }


}