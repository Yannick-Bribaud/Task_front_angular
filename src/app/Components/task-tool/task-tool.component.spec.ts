import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskToolComponent } from './task-tool.component';

describe('TaskToolComponent', () => {
  let component: TaskToolComponent;
  let fixture: ComponentFixture<TaskToolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskToolComponent]
    });
    fixture = TestBed.createComponent(TaskToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
