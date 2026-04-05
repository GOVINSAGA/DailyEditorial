import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiefEditorArticlesComponent } from './chief-editor-articles.component';

describe('ChiefEditorArticlesComponent', () => {
  let component: ChiefEditorArticlesComponent;
  let fixture: ComponentFixture<ChiefEditorArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChiefEditorArticlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChiefEditorArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
