import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchLibraryComponent } from './research-library.component';

describe('ResearchLibraryComponent', () => {
  let component: ResearchLibraryComponent;
  let fixture: ComponentFixture<ResearchLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResearchLibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResearchLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
