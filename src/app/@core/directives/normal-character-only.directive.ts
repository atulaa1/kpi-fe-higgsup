import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[normalCharacterOnly]',
})
export class NormalCharacterOnlyDirective {
  private regex: RegExp = new RegExp(/^[0-9a-zA-Z_\u00C0-\u1EF9 ]+$/);
  private regexNotSpecialChar = new RegExp(/[^!@#$%^&*()+=`~[{\]}\\|;:'",<.>/?\-_]+/);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];

  constructor(private el: ElementRef) {
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {

    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    let next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event']) blockPasteSpecialChar(event: ClipboardEvent) {
    if (!this.regexNotSpecialChar.test(event.clipboardData.getData('text/plain'))) {
      event.preventDefault();
    }
  }
}
