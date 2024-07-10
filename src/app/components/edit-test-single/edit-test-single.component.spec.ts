import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTestSingleComponent } from './edit-test-single.component';

describe('EditTestSingleComponent', () => {
  let component: EditTestSingleComponent;
  let fixture: ComponentFixture<EditTestSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTestSingleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditTestSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
