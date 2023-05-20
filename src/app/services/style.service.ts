import { Injectable } from '@angular/core';
import { StyleModel, StylePropertiesTypes } from '../Model/StyleModel';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  private styleProps: StyleModel[] = [];

  constructor() {
    this.styleProps = this.getStyleProperties();
  }

  CreateStylePropsForm(): FormGroup {
    const formGroup = new FormGroup({});
    if (this.styleProps && this.styleProps.length > 0) {
      this.styleProps.forEach((prop: StyleModel) => {
        formGroup.addControl(prop.property, new FormControl(prop.value));
      })

    }
    return formGroup;
  }

  GetStyleModelByPropName(propertyName: string): StyleModel | undefined {
    return this.styleProps.find(styleProperty => styleProperty.property.toLowerCase() == propertyName.toLowerCase());
  }

  getStyleProperties(): StyleModel[] {
    return [
      new StyleModel('color', StylePropertiesTypes.value, 'black'),
      new StyleModel('background-color', StylePropertiesTypes.value, 'white'),
      // new StyleModel('background'),
      // new StyleModel('font-size', StylePropertiesTypes.size),
      new StyleModel('height', StylePropertiesTypes.size),
      new StyleModel('width', StylePropertiesTypes.size),
      // new StyleModel('margin-left', StylePropertiesTypes.size),
      // new StyleModel('margin-right', StylePropertiesTypes.size),
      // new StyleModel('margin-top', StylePropertiesTypes.size),
      // new StyleModel('margin-bottom', StylePropertiesTypes.size),
      // new StyleModel('padding-left', StylePropertiesTypes.size),
      // new StyleModel('padding-right', StylePropertiesTypes.size),
      // new StyleModel('padding-top', StylePropertiesTypes.size),
      // new StyleModel('padding-bottom', StylePropertiesTypes.size),
      // new StyleModel('line-height'),
      // new StyleModel('font-size'),
      // new StyleModel('border-top-width', StylePropertiesTypes.size),
      // new StyleModel('border-right-width', StylePropertiesTypes.size),
      // new StyleModel('border-bottom-width', StylePropertiesTypes.size),
      // new StyleModel('border-left-width', StylePropertiesTypes.size),
      // new StyleModel('border-top-color'),
      // new StyleModel('border-right-color'),
      // new StyleModel('border-bottom-color'),
      // new StyleModel('border-left-color'),
    ];
  }

}
