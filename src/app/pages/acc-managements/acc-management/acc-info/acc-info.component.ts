import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../@core/models/user.model';
import {UserService} from '../../../../@core/services/user.service';
import {ResponseDTO} from '../../../../@core/models/responseDTO.model';

@Component({
  selector: 'ngx-acc-info',
  templateUrl: './acc-info.component.html',
  styleUrls: ['./acc-info.component.scss'],
})
export class AccInfoComponent implements OnInit {
  @Input() dismiss;
  @Input() userName: string;
  userInfo: User;
  numberMonthOfWork: number;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userInfo = new User();
    this.userService.getUserInfo(this.userName).subscribe((response: ResponseDTO)  => {
    this.userInfo =  (response.data);
    this.numberMonthOfWork = this.getNumberMonthOfWork();
    });
  }

  getNumberMonthOfWork(): number {
    let now = new Date();
    let startWorkDate: Date;
    if (typeof this.userInfo.dateStartWork === 'string') {
      startWorkDate = new Date(this.userInfo.dateStartWork);
    } else {
      startWorkDate = this.userInfo.dateStartWork;
    }
    this.numberMonthOfWork = (now.getFullYear() - startWorkDate.getFullYear()) * 12;
    this.numberMonthOfWork -= startWorkDate.getMonth() + 1;
    if (now.getFullYear() >= startWorkDate.getFullYear()) {
      if (now.getDate() >= startWorkDate.getDate()) {
        this.numberMonthOfWork += now.getMonth() + 1;
      } else {
        this.numberMonthOfWork += now.getMonth()
      }
    } else {
      return 0;
    }
    return this.numberMonthOfWork;
  }
}
