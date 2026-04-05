import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewArticlesEditorComponent } from './view-articles-editor.component';

describe('ViewArticlesEditorComponent', () => {
  let component: ViewArticlesEditorComponent;
  let fixture: ComponentFixture<ViewArticlesEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewArticlesEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewArticlesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
