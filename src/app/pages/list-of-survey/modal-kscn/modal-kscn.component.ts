import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {SurveyService} from '../../../@core/services/survey.service';
import {Survey} from '../../../@core/models/survey.model';


@Component({
  selector: 'personal-survey',
  templateUrl: './modal-kscn.component.html',
  styleUrls: ['./modal-kscn.component.scss'],
})
export class PersonalSurveyComponent implements OnInit {
  listSurvey: Array<Survey>;
  modalRef: BsModalRef;
  editText = false;
  constructor(private modalService: BsModalService,
              private surveyService: SurveyService) {
  }

  changeQuestion(surver) {
    surver.showInput = !surver.showInput;
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  changeUpdateSurvey() {
    this.surveyService.updateSurvey(this.listSurvey).subscribe();
  }

  saveChange() {
    alert('save')
  }

  ngOnInit() {
    this.surveyService.getListSurvey().subscribe(response => {
      if (response.status_code === 200) {
        this.listSurvey = response.data;
      }
    })
  }

}
