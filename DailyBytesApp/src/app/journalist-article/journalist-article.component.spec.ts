import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalistArticleComponent } from './journalist-article.component';

describe('JournalistArticleComponent', () => {
  let component: JournalistArticleComponent;
  let fixture: ComponentFixture<JournalistArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalistArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalistArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
