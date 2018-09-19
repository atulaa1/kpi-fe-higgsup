import {Component, Input, OnInit, ElementRef, ViewChild} from '@angular/core';
import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {KpiDateFormatter} from '../../../modals/personal-info/kpi-date-formatter';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'ngx-club-activity',
  templateUrl: './club-activity.component.html',
  styleUrls: ['./club-activity.component.scss'],
  providers: [{provide: NgbDateParserFormatter, useClass: KpiDateFormatter}],
})
export class ClubActivityComponent implements OnInit {
  @Input() dismiss;
  time = {hour: 12, minute: 0o0};
  spinners: boolean = false;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit() {
  }
  closeModal() {
    this.dismiss();
  }

}
