import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

export class KpiDateFormatter extends NgbDateParserFormatter {

  format(date: NgbDateStruct): string {
    return date ? `${this.padNumber(date.day)}/${this.padNumber(date.month)}/${date.year}` : null;
  }

  parse(value: string): NgbDateStruct {
    if (value) {
      const dateParts = value.trim().split('/');
      if (dateParts.length === 1 && this.isNumber(dateParts[0])) {
        return { year: parseInt(dateParts[0], 10), month: null, day: null };
      } else if (dateParts.length === 2 && this.isNumber(dateParts[0]) && this.isNumber(dateParts[1])) {
        return { year: parseInt(dateParts[0], 10), month: parseInt(dateParts[1], 10), day: null };
      } else if (dateParts.length === 3 && this.isNumber(dateParts[0]) && this.isNumber(dateParts[1]) && this.isNumber(dateParts[2])) {
        return { year: parseInt(dateParts[0], 10), month: parseInt(dateParts[1], 10), day: parseInt(dateParts[2], 10) };
      }
    }
    return null;
  }

  private isNumber(value: any): boolean {
    return !isNaN(parseInt(value, 10));
  }

  private padNumber(value: number) {
    if (this.isNumber(value)) {
      return `0${value}`.slice(-2);
    } else {
      return '';
    }
  }
}
