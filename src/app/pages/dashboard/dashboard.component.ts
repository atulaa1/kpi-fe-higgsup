import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators/takeWhile';

interface Title {
  id: String;
  description: String;
}

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

  private alive = true;
  private title: Title[];
  private recentActivity: String[];

  ngOnInit() {
    this.title = [
      { id: "recent", description: "Hoạt động gần đây" },
      { id: "notify", description: "Thông báo" },
      { id: "rank", description: "Danh sách thứ hạng" }
    ];

    this.recentActivity = [
      "Seminar Angular",
      "Seminar Spring",
      "Seminar NodeJS",
      "Seminar Karma",
      "Seminar Thread In Java",
    ]
  }


  ngOnDestroy() {
    this.alive = false;
  }
}
