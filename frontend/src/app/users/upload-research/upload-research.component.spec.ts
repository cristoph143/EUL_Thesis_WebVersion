import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadResearchComponent } from './upload-research.component';

describe('UploadResearchComponent', () => {
  let component: UploadResearchComponent;
  let fixture: ComponentFixture<UploadResearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadResearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
