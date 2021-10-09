import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeNavigationComponent } from './knowledge-navigation.component';

describe('KnowledgeNavigationComponent', () => {
  let component: KnowledgeNavigationComponent;
  let fixture: ComponentFixture<KnowledgeNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnowledgeNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
