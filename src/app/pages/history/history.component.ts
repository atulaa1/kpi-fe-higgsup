import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  manStatus: string = '0';
  monthStatus: string = '0';
  yearStatus: string = '0';
  listMonth = [];
  listYear = [];
  listMan = ['Man 1', 'Man 2', 'Man 3'];
  listEvaluatedSurvey = [
    {name: 'Khảo sát 1', evaluatedDate: '10/10/2018', man: 'Man 1'},
    {name: 'Khảo sát 2', evaluatedDate: '10/10/2017', man: 'Man 2'},
    {name: 'Khảo sát 3', evaluatedDate: '10/10/2016', man: 'Man 2'},
    {name: 'Khảo sát 4', evaluatedDate: '10/09/2018', man: 'Man 3'},
    {name: 'Khảo sát 5', evaluatedDate: '10/09/2018', man: 'Man 3'},
    {name: 'Khảo sát 6', evaluatedDate: '10/08/2018', man: 'Man 1'},
  ];

  constructor( private modalService: NgbModal) {
  }

  ngOnInit() {
    for (let i = 2018; i <= (new Date()).getFullYear(); i++) {
      this.listYear.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      this.listMonth.push(i);
    }
  }

  onFilterSurvey() {
  }

  // Filter with month

  filterMonth() {
  }

  // filter with year

  filterYear() {
  }

  // filter with status

  filterStatus() {
  }

  filterByStatus() {
  }

  openModal(content) {
    this.modalService.open(content, {backdrop: 'static', centered: true, size: 'lg'});
  }
}
