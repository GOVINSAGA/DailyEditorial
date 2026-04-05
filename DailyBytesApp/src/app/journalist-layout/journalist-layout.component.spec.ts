import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalistLayoutComponent } from './journalist-layout.component';

describe('JournalistLayoutComponent', () => {
  let component: JournalistLayoutComponent;
  let fixture: ComponentFixture<JournalistLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalistLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalistLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
