import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageResizerDirective } from './Directive/image-resizer.directive';
import { ContentEditableModelDirective } from './content-editable-model.directive';

@NgModule({
  declarations: [
    AppComponent,
    ImageResizerDirective,
    ContentEditableModelDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
