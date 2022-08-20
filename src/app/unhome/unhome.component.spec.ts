import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnhomeComponent } from './unhome.component';

describe('UnhomeComponent', () => {
  let component: UnhomeComponent;
  let fixture: ComponentFixture<UnhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnhomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
