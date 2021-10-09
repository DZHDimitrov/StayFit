import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatedArticlesComponent } from './paginated-articles.component';

describe('PaginatedArticlesComponent', () => {
  let component: PaginatedArticlesComponent;
  let fixture: ComponentFixture<PaginatedArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginatedArticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatedArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
