import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { API_HOST_QUESTION } from '../../app.constants';
import { Observable } from 'rxjs/Observable';
import { QuestionDetail } from '..';
@Injectable()
export class QuestionService {

  constructor(private http: HttpClient) { }

  queryQuestionDesc(recordId: string): Observable<QuestionDetail> {
    return this.http.get<QuestionDetail>( API_HOST_QUESTION + '/question/reply-records/sendRecord/' + recordId);
  }
  replyQuestion(recordId: string, replyItem): Observable<HttpResponse<any>> {
    return this.http.post(API_HOST_QUESTION + '/reply-records/sendRecord/' + recordId, replyItem, { observe: 'response' });
  }
  finishReplyQuestion(recordId: string): Observable<any> {
    return this.http.put(API_HOST_QUESTION + '/reply-records/sendRecord/' + recordId + '/completed/', { observe: 'response' });
  }
  increaseTime(recordId: string): Observable<any> {
    return this.http.put(API_HOST_QUESTION + '/send-records/' + recordId + '/increase-time/', { observe: 'response' });
  }
}
