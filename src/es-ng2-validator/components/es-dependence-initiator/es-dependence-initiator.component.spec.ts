import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsDependenceInitiatorComponent } from './es-dependence-initiator.component';

describe('EsDependenceInitiatorComponent', () => {
  let component: EsDependenceInitiatorComponent;
  let fixture: ComponentFixture<EsDependenceInitiatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsDependenceInitiatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsDependenceInitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
