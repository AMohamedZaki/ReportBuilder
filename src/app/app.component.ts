import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TableSettingComponent } from './Dialogs/table-setting/table-setting.component';
import { OverlayConfig } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TextEditor';

  @ViewChild('editor') editor: ElementRef = {} as ElementRef<any>;
  @ViewChild('columnToResize') columnToResize = {} as any;
  htmlWithBold = '';
  displayFontColorDisplayed = false;

  colors = ['#0e0e0e', '#f7f7f7', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];
  selectedColor = '';
  dispalyColorPicker = false;


  constructor(public dialog: MatDialog) {
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

  openDialog() {

    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });


    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = {
      left: '100px',
      top: '1px'
    };
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.restoreFocus = false;

    const dialogRef = this.dialog.open(TableSettingComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
      // dataCell1.style.width = 
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

  isFontBold(element: HTMLElement): boolean {
    const fontWeight = window.getComputedStyle(element).getPropertyValue('font-weight');
    return fontWeight === 'bold' || parseInt(fontWeight, 10) >= 700;
  }

  public getContentAsHtml(): void {
    this.htmlWithBold = '';
    const contentElement = document.createElement('div');
    contentElement.innerHTML = this.editor.nativeElement.innerHTML;
    this.htmlWithBold = contentElement.innerHTML;
    console.log(this.htmlWithBold);
  }


  generateReport() {
    const element = <HTMLElement>document.getElementById('myEditor');

    html2canvas(element, { scale: 3, useCORS: true }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      pdf.save(`${new Date().getTime().toString() + new Date().getMilliseconds().toString()}.pdf`);
    });

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

  setColor(color: string) {
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) {
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.style.color = color;
      range.surroundContents(span);
    }
  }

  showColorPicker() {
    this.dispalyColorPicker = !this.dispalyColorPicker;
  }
}


