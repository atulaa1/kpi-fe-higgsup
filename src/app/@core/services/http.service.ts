import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class HttpService {
  constructor(private cookieService: CookieService) {
  }

  setHeaderAuthor(token) {
    return {headers: new HttpHeaders({'Authorization': token})};
  }

  setHeaderToken() {
    const token = this.cookieService.get('Authorization');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token,
      }),
    };
    return httpOptions;
  }
}
