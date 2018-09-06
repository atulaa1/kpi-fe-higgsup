import {Component, OnInit} from '@angular/core';
import {SurveyService} from '../../../@core/services/survey.service';
import {Survey} from '../../../@core/models/survey.model';
import swal from 'sweetalert';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'personal-survey',
  templateUrl: './modal-kscn.component.html',
  styleUrls: ['./modal-kscn.component.scss'],
})
export class PersonalSurveyComponent implements OnInit {
  listSurvey: Array<Survey>;
  smallBtn = false;
  showHandle = false;
  constructor(private bsModal: NgbModal,
              private activeModal: NgbActiveModal,
              private surveyService: SurveyService) {
  }

  ngOnInit() {
    this.surveyService.getListSurvey().subscribe(response => {
      if (response.status_code === 200) {
        this.listSurvey = response.data;
        this.listSurvey.forEach(survey => {
          survey.showInput = false;
        })
      }
    })
  }

  changeQuestion(survey: Survey) {
    survey.showInput = !survey.showInput;
    if (!this.smallBtn)
      this.smallBtn = true;
  }

  changeUpdateSurvey() {
    if (this.listSurvey.map(survey => survey.question).indexOf('') === -1) {
      this.surveyService.updateSurvey(this.listSurvey).subscribe(response => {
        if (response.status_code === 200) {
          swal('Chúc Mừng!', 'Đã update Thành công!', 'success');
          this.listSurvey.forEach(survey => {
            survey.showInput = false;
          });
          this.smallBtn = false;
          // this.activeModal.close();
        } else if (response.status_code === 900) {
          swal('Thông báo!', 'Không tìm thấy câu hỏi để update', 'error');
        }
      });
    } else {
      this.showHandle = true;
    }
  }

  closeModal() {
    this.activeModal.close();
  }
}
