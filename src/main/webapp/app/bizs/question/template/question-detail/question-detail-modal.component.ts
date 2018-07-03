
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionReply } from '../../questionReply.model';
import { CommonService } from '../../../service/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'jhi-question-detail-modal',
    templateUrl: './question-detail-modal.component.html',
    styles: []
})
export class QuestionDetailModalComponent implements OnInit {
    // @Input() questionDetailItemIdArray;
    @Input() questionDescription;
    questionReply: QuestionReply;
    handleTypeCode;
    replyContent;
    processOptions: any;
    processOptionsConfig = {
        dropdownDirection: 'auto',
        labelField: 'label',
        valueField: 'value',
        searchField: ['label', 'value'],
        maxItems: 1,
        plugins: ['remove_button']
    };
    constructor(public activeModal: NgbActiveModal, private commonService: CommonService, private toastr: ToastrService) {
    }

    ngOnInit() {
        this.processOptions = this.commonService.processOptions;
    }
    ok() {
        if (!this.handleTypeCode || !this.replyContent) {
            this.toastr.error('请填写必填项！', '提示');
            return;
        }
        const obj = {handleTypeCode: String, replyContent: String};
        obj.handleTypeCode = this.handleTypeCode;
        obj.replyContent = this.replyContent;
        this.activeModal.close(obj);
    }
}
