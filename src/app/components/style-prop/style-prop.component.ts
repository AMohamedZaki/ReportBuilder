import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StyleModel } from 'src/app/Model/StyleModel';
import { StyleService } from 'src/app/services/style.service';

@Component({
  selector: 'app-style-prop',
  templateUrl: './style-prop.component.html',
  styleUrls: ['./style-prop.component.scss'],
  host: {class: 'row'}
})
export class StylePropComponent {
  @Input() styleFormGroup: FormGroup = new FormGroup({});
  @Input() title = '';
  stylesProps: StyleModel[] = [];


  constructor(styleService: StyleService) {
    this.stylesProps = styleService.getStyleProperties();
    console.log(this.styleFormGroup.controls);
  }



}
