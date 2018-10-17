import { Component, OnInit } from '@angular/core';
import {Employee} from '../../@core/models/employee.model';
import {Project} from '../../@core/models/project.model';
import {Rating} from '../../@core/models/Rating';
import {Question} from '../../@core/models/question.model';

@Component({
  selector: 'personal-survey',
  templateUrl: './personal-survey.component.html',
  styleUrls: ['./personal-survey.component.scss'],
})
export class PersonalSurveyComponent implements OnInit {

  constructor() { }

  employeeList: Array<Employee> = new Array();
  firstQuestionList: Array<Employee> = new Array();
  secondQuestionList: Array<Employee> = new Array();
  thirdQuestionList: Array<Employee> = new Array();
  fourthQuestionList: Array<Employee> = new Array();
  projectList: Array<Project> = new Array();
  ratingList: Array<Rating> = new Array();
  listQuestion: Array<Question> = new Array<Question>();
  ngOnInit() {
    // fake data
    this.fakeData();
    this.createRatingStructure();
    this.fakeQuestion();

  }

  fakeQuestion() {
    const question1 = new Question();
    question1.id = 1;
    question1.number = 1;
    question1.question = 'Nhân viên này như nào?';
    this.listQuestion.push(question1);


    const question2 = new Question();
    question2.id = 2;
    question2.number = 2;
    question2.question = 'Nhân viên này ra làm sao?';
    this.listQuestion.push(question2);


    const question3 = new Question();
    question3.id = 3;
    question3.number = 3;
    question3.question = 'Nhân viên này làm việc ok không?';
    this.listQuestion.push(question3);


    const question4 = new Question();
    question4.id = 4;
    question4.number = 4;
    question4.question = 'Nhân viên này có triển vọng không?';
    this.listQuestion.push(question4);


  }

  fakeData() {
    const employee1 = new Employee();
    employee1.fullname = 'Bui Cong Thanh';
    employee1.isRated = true;
    employee1.rating = 0;
    this.employeeList.push(employee1);

    const employee2 = new Employee();
    employee2.fullname = 'Nguyen Hai Anh';
    employee2.isRated = false;
    employee2.rating = 0;
    this.employeeList.push(employee2);

    const employee3 = new Employee();
    employee3.fullname = 'Dao Tung';
    employee3.isRated = false;
    employee3.rating = 0;
    this.employeeList.push(employee3);


    const employee4 = new Employee();
    employee4.fullname = 'Giang Ham';
    employee4.isRated = false;
    employee4.rating = 0;
    this.employeeList.push(employee4);


    const employee5 = new Employee();
    employee5.fullname = 'Duong Hap';
    employee5.isRated = true;
    employee5.rating = 0;
    this.employeeList.push(employee5);


    const employee6 = new Employee();
    employee6.fullname = 'Nguyen Manh Tiep';
    employee6.isRated = true;
    employee6.rating = 0;
    this.employeeList.push(employee6);

    const employee7 = new Employee();
    employee7.fullname = 'Nguyen Manh Tiep';
    employee7.isRated = true;
    employee7.rating = 0;
    this.employeeList.push(employee7);

    const employee8 = new Employee();
    employee8.fullname = 'Nguyen Manh Tiep';
    employee8.isRated = true;
    employee8.rating = 0;
    this.employeeList.push(employee8);

    // fake date for first question
    this.employeeList.forEach(employee => {
      let question1 = Object.assign({}, employee);
      this.firstQuestionList.push(question1);

      let question2 = Object.assign({}, employee);
      this.secondQuestionList.push(question2);

      let question3 = Object.assign({}, employee);
      this.thirdQuestionList.push(question3);

      let question4 = Object.assign({}, employee);
      this.fourthQuestionList.push(question4);
    });

    const project1 = new Project();
    project1.name = 'A day roi';
    project1.isRated = true;
    project1.rating = 4;
    this.projectList.push(project1);

    const project2 = new Project();
    project2.name = 'GMS';
    project2.isRated = true;
    project2.rating = 1;
    this.projectList.push(project2);


    const project3 = new Project();
    project3.name = 'Famo';
    project3.isRated = false;
    project3.rating = 0;
    this.projectList.push(project3);

    const project4 = new Project();
    project4.name = 'KPI';
    project4.isRated = false;
    project4.rating = 10;
    this.projectList.push(project4);

  }

  sendSurvey() {
    console.log(this.employeeList);
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

}
