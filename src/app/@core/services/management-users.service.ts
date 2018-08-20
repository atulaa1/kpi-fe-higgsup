import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';

@Injectable({
  providedIn: 'root',
})
export class ManagementUsersService implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization':
    }),
  };

  constructor( private http: HttpClient) {
  }
  // url = '../../../assets/champions.json';
  url = 'http://192.168.1.137:8080/kpi/api/users';

  ngOnInit() {
  }
  getUser(): Observable<any> {
    return this.http.get(this.url, this.httpOptions);
  }
}
