import { Component, OnInit } from '@angular/core';
import {Employee} from '../../@core/models/employee.model';
import {Project} from '../../@core/models/project.model';

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
  ngOnInit() {
    // fake data
    this.fakeData();

  }

  fakeData() {
    const employee1 = new Employee();
    employee1.fullname = 'Bui Cong Thanh';
    employee1.isRated = true;
    employee1.rate = 0;
    this.employeeList.push(employee1);

    const employee2 = new Employee();
    employee2.fullname = 'Nguyen Hai Anh';
    employee2.isRated = false;
    employee2.rate = 0;
    this.employeeList.push(employee2);

    const employee3 = new Employee();
    employee3.fullname = 'Dao Tung';
    employee3.isRated = false;
    employee3.rate = 0;
    this.employeeList.push(employee3);


    const employee4 = new Employee();
    employee4.fullname = 'Giang Ham';
    employee4.isRated = false;
    employee4.rate = 0;
    this.employeeList.push(employee4);


    const employee5 = new Employee();
    employee5.fullname = 'Duong Hap';
    employee5.isRated = true;
    employee5.rate = 0;
    this.employeeList.push(employee5);


    const employee6 = new Employee();
    employee6.fullname = 'Nguyen Manh Tiep';
    employee6.isRated = true;
    employee6.rate = 0;
    this.employeeList.push(employee6);

    const employee7 = new Employee();
    employee7.fullname = 'Nguyen Manh Tiep';
    employee7.isRated = true;
    employee7.rate = 0;
    this.employeeList.push(employee7);

    const employee8 = new Employee();
    employee8.fullname = 'Nguyen Manh Tiep';
    employee8.isRated = true;
    employee8.rate = 0;
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
    this.projectList.push(project1);

    const project2 = new Project();
    project2.name = 'GMS';
    project2.isRated = true;
    this.projectList.push(project2);


    const project3 = new Project();
    project3.name = 'Famo';
    project3.isRated = false;
    this.projectList.push(project3);

  }

  sendSurvey() {
    console.log(this.firstQuestionList);
  }

  validateRating() {

  }

}
