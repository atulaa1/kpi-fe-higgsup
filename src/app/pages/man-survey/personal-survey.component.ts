import {Component, OnInit} from '@angular/core';
import {Project} from '../../@core/models/project.model';
import {Rating} from '../../@core/models/Rating';
import {Question} from '../../@core/models/question.model';
import {SurveyService} from '../../@core/services/survey.service';
import {ResponseEvaluateDTO} from '../../@core/models/responseEvaluateDTO.model';
import {EvaluationInfo} from '../../@core/models/evaluation-info.model';
import {User} from '../../@core/models/user.model';

@Component({
  selector: 'personal-survey',
  templateUrl: './personal-survey.component.html',
  styleUrls: ['./personal-survey.component.scss'],
})
export class PersonalSurveyComponent implements OnInit {

  constructor(private evaluateService: SurveyService) {

  }

  listEvaluateInfo: EvaluationInfo = new EvaluationInfo();
  employeeList: Array<User> = new Array<User>();
  projectList: Array<Project> = new Array();
  ratingList: Array<Rating> = new Array();
  questionList: Array<Question> = new Array<Question>();

  readonly: boolean = true;

  ngOnInit() {
    this.getAllInfo();

    // fake data
    this.createRatingStructure();

  }

  sendSurvey() {
    console.info(this.listEvaluateInfo);
    console.info(this.projectList);
  }

  validateRating() {

  }

  createRatingStructure() {
    const zeroStar = new Rating(0, 0, 0, 0);
    const oneStar = new Rating(1, -10, -4, -15);
    const twoStar = new Rating(2, -5, -2, -5);
    const threeStar = new Rating(3, -5, -2, -5);
    const fourStar = new Rating(4, -5, -2, -5);
    const fiveStar = new Rating(5, -5, -2, -5);
    const sixStar = new Rating(6, -5, -2, -5);
    const sevenStar = new Rating(7, -5, -2, -5);
    const eightStar = new Rating(8, -5, -2, -5);
    const nineStar = new Rating(9, -5, -2, -5);
    const tenStar = new Rating(10, -5, -2, -5);
    this.ratingList = [zeroStar, oneStar, twoStar, threeStar, fourStar, fiveStar, sixStar, sevenStar, eightStar, nineStar, tenStar];

  }

  getAllInfo() {
    this.evaluateService.getAllInfoPersonalSurvey().subscribe((response: ResponseEvaluateDTO) => {
      if (response.status_code === 200) {
        this.listEvaluateInfo = response.data;

        const listQuestion = this.listEvaluateInfo.questionList;

        listQuestion.forEach(question => question.point = 0);
        this.listEvaluateInfo.employeeList.forEach(user => user.evaluateQuestion = this.cloneAndArray(listQuestion));
        this.projectList = this.listEvaluateInfo.projectList;
      }
    });
  }


  // Clone one Array
  cloneAndArray<R>(r: Array<R>): Array<R> {
    const p: Array<R> = [];
    r.forEach((value: R) => p.push(Object.create(value as Object)));
    return p;
  }

}
