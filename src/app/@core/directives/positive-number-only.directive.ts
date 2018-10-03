import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[positiveNumberOnly]'
})
export class PositiveNumberOnlyDirective {

  private regexNotSpecialCharNorExponent = new RegExp(/[!@#$%^&*()+=`~[{\]}\\|;:'",<>./?\-_e]+/);
  constructor() { }

  @HostListener('paste', ['$event']) blockPasteSpecialChar(event: ClipboardEvent) {
    if (this.regexNotSpecialCharNorExponent.test(event.clipboardData.getData('text/plain'))) {
      event.preventDefault();
    }
  }
}
