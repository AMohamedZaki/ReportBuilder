import { Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OverlayConfig } from '@angular/cdk/overlay';
import { TableSettingComponent } from 'src/app/Dialogs/table-setting/table-setting.component';
import { ColorPickerComponent } from 'src/app/components/color-picker/color-picker.component';
import { CloneObject } from 'src/app/Helper/helper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableSetting } from 'src/app/Model/TableSetting';
import { PdfService } from 'src/app/services/pdf.service';
import { TextEditorService } from 'src/app/services/text-editor-service.service';



@Component({
  selector: 'app-new-editor',
  templateUrl: './new-editor.component.html',
  styleUrls: ['./new-editor.component.scss']
})
export class NewEditorComponent implements OnInit {

  title = 'TextEditor';

  @ViewChild('editor') editor: ElementRef = {} as ElementRef<any>;
  @ViewChild('fontcolor') fontcolor: ColorPickerComponent = {} as ColorPickerComponent;
  @ViewChild('columnToResize') columnToResize = {} as any;
  htmlWithBold = '';
  displayFontColorDisplayed = false;
  selectedColor = '';
  displayColorPicker = false;



  constructor(public dialog: MatDialog, private modalService: NgbModal,
    private textEditorService: TextEditorService,
    private pdfService: PdfService, private el: ElementRef
  ) {
  }

  ngOnInit(): void {
  }


  setHeader(event: any = '') {
    document.execCommand('formatBlock', false, event);
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

    const modalRef = this.modalService.open(TableSettingComponent, { size: 'xl', scrollable: true });
    modalRef.result.then((result: TableSetting) => {
      this.insertTable(result);
    }, (err) => {
      return false;
    });

  }


  insertTable(result: TableSetting) {
    const table = document.createElement('table');
    table.style.setProperty('border', `${result.borderSize}px ${result.borderStyle} ${result.borderColor}`);
    table.style.setProperty('min-width', `${result.tableWidth}px`);
    table.style.setProperty('min-height', `${result.tableHeight}px`);
    table.style.setProperty('color', `${result.color}`);
    table.style.setProperty('table-layout', `fixed`);
    table.style.setProperty('background-color', `${result.backgroundColor}`);

    for (let rowIndex = 0; rowIndex < result.rowsCount; rowIndex++) {
      const dataRow = document.createElement('tr');
     // dataRow.style.setProperty('border', `${result.borderSize}px ${result.borderStyle} ${result.borderColor}`);

      // Add td For Each tr
      for (let columnIndex = 0; columnIndex < result.columnsCount; columnIndex++) {
        const cellType = (columnIndex == 0) ? 'th' : 'td';
        const dataCell = document.createElement(cellType);
        dataCell.textContent = '';

        if (columnIndex == 0) {
          dataCell.style.setProperty('width', `${result.columnWidth}px`)
          dataCell.style.setProperty('height', `${result.cellHeight}px`)
        }

        dataCell.style.setProperty('border', `${result.borderSize}px ${result.borderStyle} ${result.borderColor}`);
        dataRow.appendChild(dataCell);
      }

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

  onPaste(event: any) {
    const items = (event.clipboardData || event.originalEvent.clipboardData).items;
    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        const blob = item.getAsFile();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = (loadEvent: any) => {
          this.insertImage(event, loadEvent.target.result);
        };
      }
    }
  }

  insertImage(event: any, src: string) {
    let wrapper: any = null;
    const img = document.createElement('img');
    // img.src = loadEvent.;
    img.src = src;
    img.width = 200;
    img.height = 200;

    wrapper = event.target.closest('td');
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.contentEditable = 'true';
      wrapper.style.display = 'inline-block';
      wrapper.style.position = 'relative';
      wrapper.style.minWidth = '10px';
      wrapper.style.minHeight = '10px';
      wrapper.style.outline = 'none';
    }

    img.addEventListener('mousedown', (event) => {
      this.onImageMouseDown(event, img, wrapper);
    });

    const range = window.getSelection()?.getRangeAt(0);
    if (range) {
      range.insertNode(img);
    }
    else {
      wrapper.appendChild(img);
      this.editor.nativeElement.appendChild(wrapper);
    }
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
      // drag 
      return;
    }

    const onMouseMove = (event: MouseEvent) => {
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

  setColor(color: any, font = true) {
    const command = (font) ? 'foreColor' : 'BackColor';
    document.execCommand('styleWithCSS', false);
    document.execCommand(command, false, color);
  }

  print() {
    const htmlContent = this.editor.nativeElement.innerHTML;
    this.pdfService.generatePdf(htmlContent);
  }


  @Input() columns: Column[] = [ { index: 1, title: 'asdasd'}, { index: 1, title: 'asdasd'}];
  @Input() data: any[][] = [];
  resizingColumnIndex: number | null = null;
  startX: number | null = null;

  onMouseDown(event: MouseEvent, columnIndex: number) {
    if (event.button === 0) { // Check for left click
      this.resizingColumnIndex = columnIndex;
      this.startX = event.clientX;
      document.body.addEventListener('mousemove', this.onMouseMove);
      document.body.addEventListener('mouseup', this.onMouseUp, { once: true }); // Remove on first mouseup
    }
  }
  

  onMouseMove(event: MouseEvent) {
    if (this.resizingColumnIndex !== null && this.startX !== null) {
      const newWidth = event.clientX - this.startX + 'px';
      this.el.nativeElement.querySelector(`th:nth-child(${this.resizingColumnIndex + 1})`).style.width = newWidth;
    }
  }

  onMouseUp() {
    this.resizingColumnIndex = null;
    this.startX = null;
    document.body.removeEventListener('mousemove', this.onMouseMove);
  }
}



interface Column {
  title: string;
  index: number;
}