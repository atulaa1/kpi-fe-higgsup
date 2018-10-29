import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserType} from '../../../../@core/models/userType.model';
import {SeminarSurvey} from '../../../../@core/models/seminarSurvey.model';
import {User} from '../../../../@core/models/user.model';
import {EventSeminar} from '../../../../@core/models/eventSeminar.model';
import {SeminarService} from '../../../../@core/services/seminar.service';
import {ResponseListEventDTO} from '../../../../@core/models/responseListEventDTO.model';
import {MessageConstant} from '../../../../@core/glossary/message.constant';

@Component({
  selector: 'creating-survey-seminar',
  templateUrl: './creating-survey-seminar.component.html',
  styleUrls: ['./creating-survey-seminar.component.scss'],
})
export class CreatingSurveySeminarComponent implements OnInit {
  @Input() dismiss;
  @Input() seminarEvent;
  @Input() surveyFinishing: boolean = false;
  @Input() eventUserList: Array<UserType> = new Array<UserType>();
  @Output() changeEvent = new EventEmitter<any>();
  listSeminarSurvey: Array<SeminarSurvey> = new Array<SeminarSurvey>();
  eventUserListFiltered: Array<UserType> = new Array<UserType>();
  currentUsername: string = '';

  listQuestion = [
    {content: 'Chuẩn bị tốt và rất dễ hiểu (+5)', rating: 5, checked: null},
    {content: 'B. Chuẩn bị tốt và hiểu được đa số (+3)', rating: 3, checked: null},
    {content: 'C. Chuẩn bị chấp nhận được, hiểu được khái quát (+1)', rating: 1, checked: null},
    {content: 'D. Không chuẩn bị tốt, khó hiểu (-3)', rating: -3, checked: null},
    {content: 'E. Quá tệ (-5)', rating: -5, checked: null},
  ];
  seminarEvaluation: EventSeminar = new EventSeminar();

  constructor(private seminarSevice: SeminarService) {
    this.currentUsername = JSON.parse(localStorage.getItem('currentUser')).username;
  }

  ngOnInit() {
    this.eventUserListFiltered = this.eventUserList.filter(user => user.type === 1);
    const userSelect: UserType = this.eventUserList.filter(user => user.user.username === this.currentUsername)[0];
    if (userSelect.status === 0) {
      this.surveyFinishing = false;
    } else {
      this.surveyFinishing = true;

    }
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
    this.seminarEvaluation.id = this.seminarEvent.id;
    this.seminarEvaluation.additionalConfig = this.listSeminarSurvey;
    if (this.seminarEvaluation.additionalConfig.length === 0) {
      swal('Thông báo!', MessageConstant.MSG_NOTFINISHING + ' khảo sát này!', 'error');
    } else {
      this.seminarSevice.evaluateSeminarEvent(this.seminarEvaluation).subscribe((response: ResponseListEventDTO) => {
        if (response.status_code === 200) {
          this.changeEvent.emit(response.data);
          swal('Chúc mừng!', 'Hệ thống đã lưu kết quả đánh giá của bạn!', 'success');
          this.dismiss();
        } else if (response.status_code === 900 && response.message === 'host does not exist') {
          swal('Thông báo!', 'Host không tồn tại!', 'error');
        } else if (response.status_code === 917 && response.message === 'already evaluated') {
          swal('Thông báo!', 'Bạn đã đánh giá khảo sát rồi!', 'error');
        } else if (response.status_code === 918 && response.message === 'host cannot create any seminar survey') {
          swal('Thông báo!', 'Host không được phép làm khảo sát!', 'error');
        } else if (response.status_code === 919 && response.message === 'not attend this event') {
          swal('Thông báo!', 'Bạn không tham gia event này!', 'error');
        } else if (response.status_code === 900 && response.message === 'not find event by id') {
          swal('Thông báo!', 'Event không tồn tại!', 'error');
        }
      });
    }
  }

  closeModal() {
    this.dismiss();
  }
}
