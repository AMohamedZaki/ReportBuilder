import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldEditorComponent } from './old-editor.component';

describe('OldEditorComponent', () => {
  let component: OldEditorComponent;
  let fixture: ComponentFixture<OldEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
