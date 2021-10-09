import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewFoodComponent } from './create-new-food.component';

describe('CreateNewFoodComponent', () => {
  let component: CreateNewFoodComponent;
  let fixture: ComponentFixture<CreateNewFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewFoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
