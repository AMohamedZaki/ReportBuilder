import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TableSetting } from 'src/app/Model/TableSetting';
import { StyleService } from 'src/app/services/style.service';

@Component({
  selector: 'app-table-setting',
  templateUrl: './table-setting.component.html',
  styleUrls: ['./table-setting.component.scss']
})
export class TableSettingComponent {
  formGroup: FormGroup;
  tableSetting: TableSetting = {} as TableSetting;
  settingColumns = TableSetting.getColumns();
  ColumnsLength: number = 1;
  RowLength: number = 1;

  constructor(private modal: NgbActiveModal) {
    this.formGroup = this.createForm();
  }

  createForm() {
    return new FormGroup({
      columnsCount: new FormControl(3),
      rowsCount: new FormControl(3),

      tableHeight: new FormControl('100'),
      tableWidth: new FormControl('600'),

      color: new FormControl('black'),
      backgroundColor: new FormControl('white'),

      columnWidth: new FormControl(''),
      cellHeight: new FormControl(''),

      borderSize: new FormControl(2),
      borderColor: new FormControl(''),
      borderStyle: new FormControl('Solid')
    })
  }

  save() {
    console.log('value', this.formGroup.value);
    this.modal.close(this.formGroup.value);
  }
}
