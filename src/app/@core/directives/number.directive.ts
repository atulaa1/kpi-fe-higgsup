import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[phoneNumberOnly]',
})
export class PhoneNumberOnlyDirective {
  // Chỉ cho phép dạng số dài tối đa 16 kí tự
  private regex: RegExp = new RegExp(/^[0-9]{0,16}$/g);
  // Cho phép key đặc biệt :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home' ];

  constructor(private el: ElementRef) {
  }
  @HostListener('keydown', [ '$event' ])
  onKeyDown(event: KeyboardEvent) {
    // Cho phép key Backspace, tab, end, and home keys
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
