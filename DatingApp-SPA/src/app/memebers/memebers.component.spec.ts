/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MemebersComponent } from './memebers.component';

describe('MemebersComponent', () => {
  let component: MemebersComponent;
  let fixture: ComponentFixture<MemebersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemebersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemebersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
