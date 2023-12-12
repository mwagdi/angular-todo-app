import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardcolumnComponent } from './boardcolumn.component';

describe('BoardcolumnComponent', () => {
  let component: BoardcolumnComponent;
  let fixture: ComponentFixture<BoardcolumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardcolumnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardcolumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
