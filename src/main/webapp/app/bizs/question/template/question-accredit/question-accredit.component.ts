import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params } from '@angular/router';
import * as _ from 'lodash';
import { QuestionService } from './../../question.service';
@Component({
    selector: 'jhi-question-accredit',
    templateUrl: './question-accredit.component.html',
    styles: [`
        .pl-10{padding-left:10px;}
        .pr-10{padding-right:10px;}
        .mt-10{margin-top:10px;}
    `]
})
export class QuestionAccreditComponent implements OnInit {
    questionNo: string;
    questionAccreditNo: string;
    questionEmail: string;
    receivePerson: string;
    sendPerson: string;
    pathName: string;
    @Input() private questionInfo: string;
    constructor(
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private questionService: QuestionService
    ) {}

    ngOnInit() {
        const infoArray = _.split(this.questionInfo, '|');
        console.log(infoArray);
        this.sendPerson = infoArray[0];
        this.questionNo = infoArray[1];
        this.questionEmail = infoArray[2];
        this.receivePerson = infoArray[3];
    }
    verification() {
        return new Promise((resolve, reject) => {
            if (!this.questionNo || !this.questionEmail || !this.questionAccreditNo) {
                this.toastr.error('请填写必填项！', '提示');
                reject();
            }else {
                const obj = {
                    'strangerEmail': this.questionEmail,
                    'authorizationCode': this.questionAccreditNo,
                    'httpUrl': location.href,
                    'questionCode': this.questionNo
                };
                const str = 'referer_full=' + encodeURIComponent(location.href);
                document.cookie = str;
                this.questionService.strangerLogin(obj).subscribe((data) => {
                    resolve(data);
                }, (err) => {
                    this.toastr.error(err.error.message);
                    reject(err);
                });
            }
        });
    }
}
