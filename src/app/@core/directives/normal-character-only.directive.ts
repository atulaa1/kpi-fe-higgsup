import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[normalCharacterOnly]'
})
export class NormalCharacterOnlyDirective {
  // Regex chỉ cho phép 2 chữ số thập phân và số dương
  private regex: RegExp = new RegExp(/^[a-zA-Z0-9]*$/);
  // Cho phép một vài phím đặc biệt như:
  // Backspace, tab, end, home
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-'];

  constructor(private el: ElementRef) {
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {

    // Cho phép dùng Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    let next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}
