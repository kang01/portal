import { Component, OnInit, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { QuestionDetailModalComponent } from './question-detail-modal.component';
import { QuestionService } from './../../question.service';
import { CommonService } from '../../../service/common.service';
import { QuestionDetail } from '../../..';
@Component({
  selector: 'jhi-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.css']
})
export class QuestionDetailComponent implements OnInit {
    @BlockUI() blockUI: NgBlockUI;
    questionDetail: QuestionDetail;
    selected = {};
    selectAll = {};
    // commonSevice: CommonService;
    constructor(
        private modalService: NgbModal,
        private toastr: ToastrService,
        private questionService: QuestionService,
        private commonSevice: CommonService
    ) {}

    ngOnInit() {
        this.questionService.queryQuestionDesc('54').subscribe((data) => {
            this.questionDetail = data;
            this.questionDetail.questionItemDTOList.forEach( (item) => {
                this.selected[item.id] = {};
                this.selectAll[item.id] = false;
                item.questionItemDetailsDTOS.forEach((item1) => {
                    this.selected[item.id][item1.id] = false;
                    item1.handleTypeName = this.commonSevice.getStatusName(item1.handleTypeCode);
                });
            });
        });
    }
    toggleAll(selectAll, selectedItems) {
        for (const id in selectedItems) {
            if (selectedItems.hasOwnProperty(id)) {
                selectedItems[id] = selectAll;
            }
        }
    }
    toggleOne(itemId) {
        const selectedItems = this.selected[itemId];
        for (const id in selectedItems) {
            if (selectedItems.hasOwnProperty(id)) {
                if (!selectedItems[id]) {
                    this.selectAll[itemId] = false;
                    return;
                }
            }
        }
        this.selectAll[itemId] = true;
    }
    // 批量回复问题
    replyQuestionModal(e, item) {
        e.preventDefault();
        e.stopPropagation();
        const questionIds = [];
        for (const key in this.selected[item.id]) {
            if (this.selected[item.id][key]) {
                questionIds.push(key);
            }
        }
        if (questionIds.length) {
            const modalRef = this.modalService.open(QuestionDetailModalComponent, {backdrop: 'static'});
            modalRef.componentInstance.questionDescription = item.questionDescription;
            modalRef.result.then((result) => {
                console.log(result, questionIds, item);
                questionIds.forEach((id) => {
                    item.questionItemDetailsDTOS.forEach((item1) => {
                        if (id + '' === item1.id + '') {
                            item1.handleTypeCode = result.handleTypeCode;
                            item1.handleTypeName = this.commonSevice.getStatusName(item1.handleTypeCode);
                            item1.replyContent = result.replyContent;
                        }
                    });
                });
            });
        }else {
            this.toastr.error('请选择要回复的问题！');
        }
    }
    // 单个问题的回复
    replySingleQuestionModal(item, item1) {
        const modalRef = this.modalService.open(QuestionDetailModalComponent, {backdrop: 'static'});
        modalRef.componentInstance.questionDescription = item.questionDescription;
        modalRef.result.then((result) => {
            console.log(result);
            item1.handleTypeCode = result.handleTypeCode;
            item1.handleTypeName = this.commonSevice.getStatusName(item1.handleTypeCode);
            item1.replyContent = result.replyContent;
            console.log(item1);
        }, (reason) => {});
    }
    showSuccess() {
        this.toastr.success('成功！');
    }
    showBlockUI() {
        this.blockUI.start();
        setTimeout(() => {
            this.blockUI.stop(); // Stop blocking
        }, 2000);
    }
}
