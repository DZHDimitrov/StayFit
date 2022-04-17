import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReadingComponent } from './edit-reading.component';

describe('EditReadingComponent', () => {
  let component: EditReadingComponent;
  let fixture: ComponentFixture<EditReadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
