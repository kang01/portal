import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { API_HOST_QUESTION, API_HOST_NO_MIS_QUESTION } from '../../app.constants';
import { Observable } from 'rxjs/Observable';
import { QuestionDetail } from '..';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
@Injectable()
export class QuestionService {

  constructor(
     private http: HttpClient,
     private $localStorage: LocalStorageService,
     private $sessionStorage: SessionStorageService) { }

  queryQuestionDesc(recordId: string): Observable<QuestionDetail> {
    return this.http.get<QuestionDetail>( API_HOST_QUESTION + '/question/reply-records/sendRecord/' + recordId);
  }
  saveReplyQuestion(replyItem): Observable<HttpResponse<any>> {
    return this.http.post(API_HOST_QUESTION + '/reply-records/sendRecord', replyItem, { observe: 'response' });
  }
  finishReplyQuestion(recordId: string): Observable<any> {
    return this.http.put(API_HOST_QUESTION + '/reply-records/sendRecord/' + recordId + '/completed', { observe: 'response' });
  }
  increaseTime(recordId: string): Observable<any> {
    return this.http.put(API_HOST_QUESTION + '/send-records/' + recordId + '/increase-time', { observe: 'response' });
  }
  strangerLogin(loginInfo): Observable<any> {
    return this.http.post(API_HOST_NO_MIS_QUESTION + '/stranger/login', loginInfo, { observe: 'response' }).map(this.authenticateSuccess.bind(this));
  }
  authenticateSuccess(resp) {
    const bearerToken = resp.body.idToken;
    if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
        const jwt = bearerToken.slice(7, bearerToken.length);
        this.storeAuthenticationToken(jwt);
        return resp.body;
    }
 }
 storeAuthenticationToken(jwt) {
    this.$sessionStorage.store('authenticationStrangerToken', jwt);
    }
}
