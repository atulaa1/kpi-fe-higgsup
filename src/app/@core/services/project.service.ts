import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpService} from './http.service';
import {BaseConstant} from '../glossary/base.constant';
import {Project} from '../models/project.model';
import {Observable} from '../../../../node_modules/rxjs/Rx';
import {ResponseProjectDTO} from '../models/response-project-dto.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  constructor(private http: HttpClient,
              private httpService: HttpService) {
  }

  private url = BaseConstant.protocol.toString() + BaseConstant.server.toString() + BaseConstant.standardServicePort.toString();
  private httpOptions = this.httpService.setHeaderToken();

  getAllProject(): Observable<ResponseProjectDTO> {
    return this.http.get<ResponseProjectDTO>(this.url + '/api/projects', this.httpOptions);
  }

  addNewProject(project: Project): Observable<ResponseProjectDTO> {
    let projectJson = JSON.stringify(project);
    return this.http.post<ResponseProjectDTO>(this.url + '/api/projects', projectJson, this.httpOptions);
  }

  updateProject(project: Project): Observable<ResponseProjectDTO> {
    let projectJson = JSON.stringify(project);
    return this.http.put<ResponseProjectDTO>(this.url + '/api/projects/' + project.id, projectJson, this.httpOptions);
  }

  deleteProject(project: Project): Observable<ResponseProjectDTO> {
    return this.http.delete<ResponseProjectDTO>(this.url + '/api/projects/' + project.id, this.httpOptions);
  }
}
