import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewArticlesComponent } from './review-articles.component';

describe('ReviewArticlesComponent', () => {
  let component: ReviewArticlesComponent;
  let fixture: ComponentFixture<ReviewArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewArticlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
