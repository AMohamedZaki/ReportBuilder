import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OldEditorComponent } from './Pages/old-editor/old-editor.component';
import { NewEditorComponent } from './Pages/new-editor/new-editor.component';

const routes: Routes = [
  {
    path: '', 
    component: NewEditorComponent,
  },
  {
    path: 'old', 
    component: OldEditorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
