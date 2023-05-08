import { Component, OnInit } from '@angular/core';
import Quill, { QuillOptionsStatic } from 'quill';

@Component({
  selector: 'app-new-editor',
  templateUrl: './new-editor.component.html',
  styleUrls: ['./new-editor.component.scss']
})
export class NewEditorComponent implements OnInit{
  quill: Quill = {} as Quill;

  ngOnInit(): void {
    const options: QuillOptionsStatic = {
      modules: {
        toolbar: {
          container: [['size']],
        },
      },
      theme: 'snow',
    };
    const quill = new Quill('#editor', options);
    this.quill = quill;
  }


  openSizeDropdown(): void {
    // debugger
    const sizeControl = this.quill.getModule('toolbar').controls['size'];
    if (sizeControl) {
      const select = sizeControl.container.querySelector('.ql-size');
      select.style.display = 'block';
      sizeControl.onchange(select.value);
    }
  }
}
