import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodsIntroComponent } from './foods-intro.component';

describe('FoodsIntroComponent', () => {
  let component: FoodsIntroComponent;
  let fixture: ComponentFixture<FoodsIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodsIntroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodsIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
