import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class HttpService {

  setHeaderAuthor(token) {
    return {headers: new HttpHeaders({'Authorization': token})};
  }
}
