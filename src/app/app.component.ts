import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TextEditor';
  isEdit = true;
  htmlForm = new FormGroup({
    htmlContent: new FormControl()
  });

  @ViewChild('editor') editor: ElementRef = {} as ElementRef<any>;
  @ViewChild('columnToResize') columnToResize = {} as any;
  editorContent = '';
  htmlWithBold = '';
  isResizing = false;
  initialWidth = 0;

  report: string = '';
  reportHtml: SafeHtml = '';

  constructor() {
  }

  get htmlContent(): FormControl {
    return this.htmlForm.get('htmlContent') as FormControl;
  }

  ngOnInit(): void {
  }


  setHeader(event: any = '') {
    const header = event?.target?.value;
    document.execCommand('formatBlock', false, header);
    this.editor.nativeElement.focus();
  }

  insertQuote() {
    const selection = <Selection>window.getSelection();
    let range = selection.getRangeAt(0);

    let quoteElement = document.createElement('span');
    quoteElement.innerHTML = '&gt;'; // HTML code for >

    range.insertNode(quoteElement);

    range.setStartAfter(quoteElement);
    range.setEndAfter(quoteElement);
    selection.removeAllRanges();
    selection.addRange(range);

    this.editor.nativeElement.focus();
  }

  insertTable() {
    const table = document.createElement('table');
    table.border = '1';

    const headerRow = document.createElement('tr');
    headerRow.style.backgroundColor = 'lightgray';

    const headerCell1 = document.createElement('th');
    headerCell1.textContent = '';

    const headerCell2 = document.createElement('th');
    headerCell2.textContent = '';
    headerRow.appendChild(headerCell1);
    headerRow.appendChild(headerCell2);

    table.appendChild(headerRow);

    for (let i = 0; i < 3; i++) {
      const dataRow = document.createElement('tr');

      const dataCell1 = document.createElement('td');
      dataCell1.textContent = '';
      const dataCell2 = document.createElement('td');
      dataCell2.textContent = '';
      dataRow.appendChild(dataCell1);
      dataRow.appendChild(dataCell2);

      table.appendChild(dataRow);
    }

    this.editor.nativeElement.appendChild(table);
  }

  indentOutdentCommand(command: string) {
    this.editor.nativeElement.focus();
    document.execCommand(command, false, undefined);
  }

  fontStyle(font = '') {
    document.execCommand(font, false);
  }

  // onMouseUp(): void {
  //   const selection = <Selection>window.getSelection();
  //   if (selection && selection.toString()) {
  //     const focusNode = <Node>selection.focusNode;
  //     const element = <HTMLElement>focusNode.parentElement;
  //     const isBold = this.isFontBold(element);
  //     console.log(`The selected text is ${isBold ? 'bold' : 'not bold'}`);
  //   }
  // }

  isFontBold(element: HTMLElement): boolean {
    const fontWeight = window.getComputedStyle(element).getPropertyValue('font-weight');
    return fontWeight === 'bold' || parseInt(fontWeight, 10) >= 700;
  }



  public getContentAsHtml(): void {
    this.htmlWithBold = '';
    const contentElement = document.createElement('div');
    contentElement.innerHTML = this.editor.nativeElement.innerHTML;
    this.htmlWithBold = contentElement.innerHTML;
  }


  updateReport(report: string) {
    // Update the value of this.report whenever the content of the element changes
    this.report = report;
  }

  generateReport() {
    // const reportHtml = this.report;
    // const sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(reportHtml);
    // const report = this.processReport(reportHtml);
    // this.reportHtml = sanitizedHtml;
    
    const element = <HTMLElement>document.getElementById('myEditor');

    html2canvas(element,  { scale: 3, useCORS: true }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      pdf.save('report.pdf');
    });

  }

  processReport(reportHtml: string): string {
    return 'Report generated from HTML content: ' + reportHtml;
  }


  onPaste(event: any) {
    const items = (event.clipboardData || event.originalEvent.clipboardData).items;
    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        const blob = item.getAsFile();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = (loadEvent: any) => {
          this.insertImage(loadEvent.target.result);
          // document.execCommand('insertHTML', false, img.outerHTML);
        };
      }
    }
  }

  insertImage(src: string) {
    const img = document.createElement('img');
    // img.src = loadEvent.;
    img.src = src;
    img.width = 200;
    img.height = 200;
    const wrapper = document.createElement('div');
    wrapper.contentEditable = 'true';
    wrapper.style.display = 'inline-block';
    wrapper.style.position = 'relative';
    wrapper.style.minWidth = '10px';
    wrapper.style.minHeight = '10px';
    wrapper.style.outline = 'none';

    img.addEventListener('mousedown', (event) => {
      this.onImageMouseDown(event, img, wrapper);
    });


    wrapper.appendChild(img);

    this.editor.nativeElement.appendChild(wrapper);
  }



  onImageMouseDown(event: MouseEvent, img: HTMLImageElement, wrapper: HTMLDivElement) {
    event.preventDefault();
    event.stopPropagation();

    let startX = event.clientX;
    let startY = event.clientY;
    let startWidth = img.width;
    let startHeight = img.height;

    img.style.border = '2px solid blue';
    img.style.cursor = 'nwse-resize';


    const rect = wrapper.getBoundingClientRect();
    const marginX = event.clientX - rect.right > -10 ? 1 : event.clientX - rect.left < 10 ? -1 : 0;
    const marginY = event.clientY - rect.bottom > -10 ? 1 : event.clientY - rect.top < 10 ? -1 : 0;
    if (marginX === 0 && marginY === 0) {
      return;
    }

    const onMouseMove = (event: MouseEvent) => {
     
      // const deltaX = event.clientX - startX;
      // const deltaY = event.clientY - startY;
      // img.style.width = startWidth + deltaX + 'px';
      // img.style.height = startHeight + deltaY + 'px';

      const width = startWidth + event.clientX - startX;
      const height = startHeight + event.clientY - startY;
      if (width > 10 && height > 10) {
        img.width = width;
        img.height = height;
      }

    };

    const onMouseUp = (event: MouseEvent) => {
    
      event.stopPropagation();
      img.style.border = 'none';
      img.style.cursor = 'default';

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
  

}


