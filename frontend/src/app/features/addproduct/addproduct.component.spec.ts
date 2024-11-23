import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AddproductComponent } from './addproduct.component';

describe('AddproductComponent', () => {
  let component: AddproductComponent;
  let fixture: ComponentFixture<AddproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AddproductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
