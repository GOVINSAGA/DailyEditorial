import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalistHomeComponent } from './journalist-home.component';

describe('JournalistHomeComponent', () => {
  let component: JournalistHomeComponent;
  let fixture: ComponentFixture<JournalistHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalistHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalistHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
