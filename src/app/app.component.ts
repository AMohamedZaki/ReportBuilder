import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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

  constructor(private renderer: Renderer2, private sanitizer: DomSanitizer) {

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
    debugger
    // Get the HTML content of the element
    const reportHtml = this.report;

    // Sanitize the HTML content to ensure that it is safe to use in your report
    const sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(reportHtml);

    // Process the HTML content and generate a report
    const report = this.processReport(reportHtml);

    // Set the reportHtml variable to display the generated report in your template
    this.reportHtml = sanitizedHtml;
  }

  processReport(reportHtml: string): string {
    // Process the HTML content and generate a report
    return 'Report generated from HTML content: ' + reportHtml;
  }

}




