import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageResizerDirective } from './Directive/image-resizer.directive';

// import { ContentEditableModelModule } from '@ngneat/content-editable';

@NgModule({
  declarations: [
    AppComponent,
    ImageResizerDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    // ContentEditableModelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
