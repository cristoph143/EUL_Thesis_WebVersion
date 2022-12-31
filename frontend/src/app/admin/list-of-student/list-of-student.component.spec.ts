import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfStudentComponent } from './list-of-student.component';

describe('ListOfStudentComponent', () => {
  let component: ListOfStudentComponent;
  let fixture: ComponentFixture<ListOfStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
