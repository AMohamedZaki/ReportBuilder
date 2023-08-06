import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Editor } from 'primeng/editor';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { TableSettingComponent } from 'src/app/Dialogs/table-setting/table-setting.component';
import { TableSetting } from 'src/app/Model/TableSetting';
import { PdfService } from 'src/app/services/pdf.service';

import Quill from 'quill';

const Embed = Quill.import('blots/embed');

class TableBlot extends Embed {
  static create(value: string) {
    const node = super.create(value);
    node.innerHTML = value;
    return node;
  }

  static value(node: any) {
    return node.innerHTML;
  }
}

Quill.register(TableBlot);

@Component({
  selector: 'app-quill',
  templateUrl: './quill.component.html',
  styleUrls: ['./quill.component.scss']
})
export class QuillComponent implements AfterViewInit {

  @ViewChild('editor') editor: Editor | undefined;
  text: string = '';

  constructor(private pdfService: PdfService, private modalService: NgbModal) {

  }
  
  getValue() {
    const delta = (this.editor as Editor).getQuill().getContents();
    const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
    const html = converter.convert();
    return html;
    // console.log(output)
    // return output;
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
    table.style.setProperty('background-color', `${result.backgroundColor}`);

    for (let rowIndex = 0; rowIndex < result.rowsCount; rowIndex++) {
      const dataRow = document.createElement('tr');
      dataRow.style.setProperty('border', `${result.borderSize}px ${result.borderStyle} ${result.borderColor}`);

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
    const editor = (this.editor as Editor);
    const range = editor.getQuill().getSelection(true);
    //editor.writeValue(table.outerHTML);
    editor.quill.root.appendChild(table);

    const tableHtml = table.outerHTML;
    editor.quill.insertEmbed(editor.quill.getSelection().index, 'table', tableHtml, 'user');

    // editor.getQuill().getModule('htmlEditButton').insertHTML(table.outerHTML, range.index);
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
    const editor = (this.editor as Editor);
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
      editor.getQuill().appendChild(wrapper);
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

  print() {
    const htmlContent = this.getValue();
    this.pdfService.generatePdf(htmlContent);
  }

  ngAfterViewInit() {
    // const editor = new Quill('#editor', {
    //   theme: 'snow',
    //   modules: {
    //     toolbar: {
    //       container: [
    //         ['bold', 'italic', 'underline', 'strike'],
    //         [{ 'header': 1 }, { 'header': 2 }],
    //         [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    //         [{ 'indent': '-1' }, { 'indent': '+1' }],
    //         [{ 'align': [] }],
    //         [{ 'color': [] }, { 'background': [] }],
    //         ['image'],
    //         [{ 'script': 'sub' }, { 'script': 'super' }],
    //         ['clean']
    //       ]
    //     },
    //     clipboard: {
    //       matchVisual: false
    //     }
    //   }
    // });
  }

}
