import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfTeacherComponent } from './list-of-teacher.component';

describe('ListOfTeacherComponent', () => {
  let component: ListOfTeacherComponent;
  let fixture: ComponentFixture<ListOfTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
