import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
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
  modalRef: BsModalRef;

  constructor(private bsModal: NgbModal,
              private activeModal: NgbActiveModal,
              private surveyService: SurveyService) {
  }

  changeQuestion(surver) {
    surver.showInput = !surver.showInput;
  }

  changeUpdateSurvey() {
    this.surveyService.updateSurvey(this.listSurvey).subscribe(response => {
      if ( response.status_code === 200) {
        swal('Chúc Mừng!', 'Đã update Thành công!', 'success');
        this.activeModal.close();
      }
    });
  }

  closeModal() {
    this.activeModal.close();
  }

  ngOnInit() {
    this.surveyService.getListSurvey().subscribe(response => {
      if (response.status_code === 200) {
        this.listSurvey = response.data;
      }
    })
  }

}
