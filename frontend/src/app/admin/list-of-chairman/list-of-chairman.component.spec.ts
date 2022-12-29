import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfChairmanComponent } from './list-of-chairman.component';

describe('ListOfChairmanComponent', () => {
  let component: ListOfChairmanComponent;
  let fixture: ComponentFixture<ListOfChairmanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfChairmanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfChairmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
