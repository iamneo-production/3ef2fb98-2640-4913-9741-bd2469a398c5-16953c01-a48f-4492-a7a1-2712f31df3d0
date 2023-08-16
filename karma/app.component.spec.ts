import { DebugElement } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BtnstyleDirective } from './btnstyle.directive';

describe('AppComponent', () => {
  let submitEl: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        BtnstyleDirective
      ],
    }).compileComponents();
  
  });

  it('test_case1', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


  it('test_case2', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    submitEl = fixture.debugElement.query(By.css('#displayButton'));
    expect(submitEl.nativeElement.disabled).toBeTruthy();
  });

  it('test_case3', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.color='blue';
    fixture.detectChanges();
    submitEl = fixture.debugElement.query(By.css('#displayButton'));
    expect(submitEl.nativeElement.disabled).toBeFalse();
  });
});
