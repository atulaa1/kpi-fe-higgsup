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

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userInfo = new User();
    this.userService.getUserInfo(this.userName).subscribe((response: ResponseDTO)  => {
    this.userInfo =  (response.data);
    console.log(this.userInfo)
    });
  }
}
