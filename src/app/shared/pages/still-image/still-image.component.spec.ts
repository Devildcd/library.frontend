import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StillImageComponent } from './still-image.component';

describe('StillImageComponent', () => {
  let component: StillImageComponent;
  let fixture: ComponentFixture<StillImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StillImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StillImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
