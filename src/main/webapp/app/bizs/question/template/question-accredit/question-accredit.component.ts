import { Component, OnInit, Input } from '@angular/core';
import { Broadcaster } from '../../../../shared';
import { MessageEvent } from '../../../../shared';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'jhi-question-accredit',
    templateUrl: './question-accredit.component.html',
    styles: [`
        .pl-10{padding-left:10px;}
        .mt-10{margin-top:10px;}
    `]
})
export class QuestionAccreditComponent implements OnInit {
    questionNo: string;
    questionAccreditNo: string;
    constructor(
        private broadcaster: Broadcaster,
        private messageEvent: MessageEvent,
        private toastr: ToastrService
    ) {}

    ngOnInit() {
        // this.registerTypeBroadcast();
    }
    verification() {
        if (!this.questionNo || !this.questionAccreditNo) {
            this.toastr.error('请填写必填项！', '提示');
            return true;
        }else {
            return false;
        }
    }
    // registerTypeBroadcast() {
    //     this.broadcaster.on<string>('MyEvent')
    //     .subscribe((message) => {
    //         this.message = message;
    //         console.log(this.message + '11111111111111111111111');
    //         if (!this.questionNo && !this.questionAccreditNo) {
    //             this.childID = true;
    //         }else {
    //             this.childID = false;
    //         }
    //         this.messageEvent.fire(`${this.childID}`);
    //     });

    // }
}
