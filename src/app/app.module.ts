import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableSettingComponent } from './Dialogs/table-setting/table-setting.component';

import { MatDialogModule } from '@angular/material/dialog';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
// import { ContentEditableModelModule } from '@ngneat/content-editable';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewEditorComponent } from './Pages/new-editor/new-editor.component';
import { OldEditorComponent } from './Pages/old-editor/old-editor.component';
import { FontIconComponent } from './components/SvgIcons/font-icon/font-icon.component';
import { FontBackgroundComponent } from './components/SvgIcons/font-background/font-background.component';
import { FontDropDawnComponent } from './components/font-drop-dawn/font-drop-dawn.component';
import { FontSizeComponent } from './components/font-size/font-size.component';
import { BoldIconComponent } from './components/SvgIcons/bold-icon/bold-icon.component';
import { ItalicIconComponent } from './components/SvgIcons/italic-icon/italic-icon.component';
import { UnderlineIconComponent } from './components/SvgIcons/underline-icon/underline-icon.component';
import { StrikeIconComponent } from './components/SvgIcons/strike-icon/strike-icon.component';
import { HeaderOneComponent } from './components/SvgIcons/header-one/header-one.component';
import { HeaderTwoComponent } from './components/SvgIcons/header-two/header-two.component';
import { BlockquoteIconComponent } from './components/SvgIcons/blockquote-icon/blockquote-icon.component';
import { ImageIconComponent } from './components/SvgIcons/image-icon/image-icon.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StylePropComponent } from './components/style-prop/style-prop.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TableSettingComponent,
    ColorPickerComponent,
    NewEditorComponent,
    OldEditorComponent,
    FontIconComponent,
    FontBackgroundComponent,
    FontDropDawnComponent,
    FontSizeComponent,
    BoldIconComponent,
    ItalicIconComponent,
    UnderlineIconComponent,
    StrikeIconComponent,
    HeaderOneComponent,
    HeaderTwoComponent,
    BlockquoteIconComponent,
    ImageIconComponent,
    StylePropComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    // ContentEditableModelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
