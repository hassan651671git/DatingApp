/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MesseagesThreadComponent } from './MesseagesThread.component';

describe('MesseagesThreadComponent', () => {
  let component: MesseagesThreadComponent;
  let fixture: ComponentFixture<MesseagesThreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesseagesThreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesseagesThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
