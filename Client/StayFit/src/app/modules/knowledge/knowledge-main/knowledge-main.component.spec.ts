import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeMainComponent } from './knowledge-main.component';

describe('KnowledgeMainComponent', () => {
  let component: KnowledgeMainComponent;
  let fixture: ComponentFixture<KnowledgeMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnowledgeMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
