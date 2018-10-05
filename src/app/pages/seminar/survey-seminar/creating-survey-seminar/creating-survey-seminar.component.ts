import {Component, Input, OnInit} from '@angular/core';
import {UserType} from '../../../../@core/models/userType.model';
import {SeminarSurvey} from '../../../../@core/models/seminarSurvey.model';
import {User} from '../../../../@core/models/user.model';

@Component({
  selector: 'creating-survey-seminar',
  templateUrl: './creating-survey-seminar.component.html',
  styleUrls: ['./creating-survey-seminar.component.scss'],
})
export class CreatingSurveySeminarComponent implements OnInit {
  @Input() dismiss;
  @Input() seminarEvent;
  @Input() eventUserList: Array<UserType> = new Array<UserType>();
  listSeminarSurvey: Array<SeminarSurvey> = new Array<SeminarSurvey>();


  listQuestion = [
    {content: 'Chuẩn bị tốt và rất dễ hiểu (+5)', rating: 5, check: false},
    {content: 'B. Chuẩn bị tốt và hiểu được đa số (+3)', rating: 3, check: false},
    {content: 'C. Chuẩn bị chấp nhận được, hiểu được khái quát (+1)', rating: 1, check: false},
    {content: 'D. Không chuẩn bị tốt, khó hiểu (-3)', rating: -3, check: false},
    {content: 'E. Quá tệ (-5)', rating: -5, check: false},
  ];

  constructor() {
  }

  ngOnInit() {
    this.eventUserList.filter(user => user.type === 1);
  }

  changeSelect(username, question) {
    const userSurvey: User = new User();
    const seminarSurvey: SeminarSurvey = new SeminarSurvey();
    userSurvey.username = username;
    seminarSurvey.rating = question.rating;
    seminarSurvey.evaluatedUsername = userSurvey;

    const index = this.listSeminarSurvey.map(seminar => seminar.evaluatedUsername.username).indexOf(username);
    if (index >= 0) {
      this.listSeminarSurvey.splice(index, 1, seminarSurvey);

    } else {
      this.listSeminarSurvey.push(seminarSurvey);
    }

  }


  createSeminarSurvey() {

  }

  closeModal() {
    this.dismiss();
  }
}
