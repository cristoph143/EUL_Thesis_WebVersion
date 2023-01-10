import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundScreenComponent } from './not-found-screen.component';

describe('NotFoundScreenComponent', () => {
  let component: NotFoundScreenComponent;
  let fixture: ComponentFixture<NotFoundScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotFoundScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotFoundScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
