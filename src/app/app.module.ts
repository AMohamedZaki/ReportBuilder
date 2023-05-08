import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableSettingComponent } from './Dialogs/table-setting/table-setting.component';

import { MatDialogModule } from '@angular/material/dialog';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { FontColorComponent } from './components/font-color/font-color.component';
// import { ContentEditableModelModule } from '@ngneat/content-editable';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewEditorComponent } from './Pages/new-editor/new-editor.component';
import { OldEditorComponent } from './Pages/old-editor/old-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    TableSettingComponent,
    ColorPickerComponent,
    FontColorComponent,
    NewEditorComponent,
    OldEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    BrowserAnimationsModule
    // ContentEditableModelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
