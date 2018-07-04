import { SessionStorageService } from 'ngx-webstorage';
import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { QuestionDetailModalComponent } from './question-detail-modal.component';
import { QuestionService } from './../../question.service';
import { CommonService } from '../../../service/common.service';
import { QuestionDetail } from '../../questionDetail.model';
import { PromptModalComponent } from '../../../prompt-modal/prompt-modal.component';
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
    usedTime: string; // 剩余时间
    expirationTimer: any; // 剩余时间Timer
    questionTypeName: string; // 样本问题类型
    sendRecordId = '91';
    constructor(
        private modalService: NgbModal,
        private toastr: ToastrService,
        private questionService: QuestionService,
        private commonSevice: CommonService,
        private storage: SessionStorageService
    ) {}

    ngOnInit() {
        this.queryQuestionDesc();
    }
    initExpirationTime(expirationTime) {
        this.calcTime(new Date(expirationTime).getTime());
        this.expirationTimer = setInterval(() => {
            this.calcTime(new Date(expirationTime).getTime());
        }, 6000);
    }
    calcTime(usedTime) {
        const start = new Date().getTime();
        const mins = Math.floor((usedTime - start) / 60000);
        if (mins > 60) {
            const hour = mins / 60;
            if (hour > 24) {
                const days = hour / 24;
                this.usedTime = days.toFixed(1) + '天';
            }else {
                this.usedTime = hour.toFixed(1) + '小时';
            }
        }else {
            this.usedTime = mins + '分钟';
        }
    }
    // 2401：已发送，2402:回复中，2403: 已回复，2404:已过期
    queryQuestionDesc() {
        const storageQuestion = this.storage.retrieve('questionDetail');
        if (!storageQuestion) {
            this.questionService.queryQuestionDesc(this.sendRecordId).subscribe((data) => {
                this.questionDetail = data;
                this.questionTypeName = this.commonSevice.getStatusName(this.questionDetail.questionTypeCode);
                this.questionDetail.questionItemDTOList.forEach( (item) => {
                    this.selected[item.id] = {};
                    this.selectAll[item.id] = false;
                    item.questionItemDetailsDTOS.forEach((item1) => {
                        this.selected[item.id][item1.id] = false;
                        item1.handleTypeName = this.commonSevice.getStatusName(item1.handleTypeCode);
                    });
                });
                if (this.questionDetail.status === '2401' || this.questionDetail.status === '2402') {
                    this.initExpirationTime(this.questionDetail.expirationTime);
                }
            });
        }else {
            this.questionDetail = storageQuestion;
            if (this.questionDetail.status === '2401' || this.questionDetail.status === '2402') {
                this.initExpirationTime(this.questionDetail.expirationTime);
            }
        }
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
                questionIds.forEach((id) => {
                    item.questionItemDetailsDTOS.forEach((item1) => {
                        if (id + '' === item1.id + '') {
                            item1.handleTypeCode = result.handleTypeCode;
                            item1.handleTypeName = this.commonSevice.getStatusName(item1.handleTypeCode);
                            item1.replyContent = result.replyContent;
                        }
                    });
                });
                // console.log(JSON.stringify(this.questionDetail));
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
            item1.handleTypeCode = result.handleTypeCode;
            item1.handleTypeName = this.commonSevice.getStatusName(item1.handleTypeCode);
            item1.replyContent = result.replyContent;
            this.storage.store('questionDetail', this.questionDetail);
        }, (reason) => {});
    }
    // 保存回复得问题内容 请参见样本回复。
    saveReplyQuestion(replyQuestionObj, callback?) {
        const cb = callback || function() {};
        return new Promise((resolve, reject) => {
            this.questionService.saveReplyQuestion(replyQuestionObj).subscribe((data) => {
                resolve(data);
                return cb();
            }, (err) => {
                reject(err);
                return cb(err);
            });
        });

    }
    // 回复完成问题
    finishReplyQuestion() {
        this.questionService.finishReplyQuestion(this.sendRecordId).subscribe((data) => {
            this.toastr.success('回复完成', '提示');
            this.queryQuestionDesc();
            window.clearInterval(this.expirationTimer);
        });
    }
    finish() {
        const questionArray = [];
        this.questionDetail.questionItemDTOList.forEach((item) => {
            item.questionItemDetailsDTOS.forEach((item1) => {
                const obj = {
                    id: null,
                    handleTypeCode: null,
                    replyContent: null,
                    questionItemDetailsId: null
                };
                if (item1.handleTypeCode) {
                    obj.id = item1.replyDetailsId;
                    obj.handleTypeCode = item1.handleTypeCode;
                    obj.replyContent = item1.replyContent;
                    obj.questionItemDetailsId = item1.id;
                    questionArray.push(obj);
                }
            });
        });
        // 样本问题2301  其他问题2302
        if (this.questionDetail.questionTypeCode === '2301' && !questionArray.length) {
            this.toastr.error('请回复问题！');
            return;
        }else {
            if (!this.questionDetail.replyContent) {
                this.toastr.error('请回复问题！');
                return;
            }
        }
        const replyQuestionObj = {
            sendRecordId: this.sendRecordId,
            replyContent: this.questionDetail.replyContent || '请参见样本回复',
            replyDetailsDTOList: questionArray
        };
        // 2401：已发送，2402:回复中，2403: 已回复，2404:已过期
        if (this.questionDetail.status === '2401' || this.questionDetail.status === '2402') {
            const modalRef = this.modalService.open(PromptModalComponent, {backdrop: 'static'});
            modalRef.componentInstance.promptContent = '确定是否完成此次回复？';
            modalRef.result.then((result) => {
                // this.saveReplyQuestion(result);
                this.saveReplyQuestion(replyQuestionObj).then(() => {
                    this.finishReplyQuestion();
                });
            }, (reason) => {
                this.saveReplyQuestion(replyQuestionObj);
            });
        }
    }
    // 申请加时
    increaseTime() {
        const times = 2 - this.questionDetail.applyTimes;
        if (!times) {
            this.toastr.error('此次申请加时已达到最大上限(2次)！');
            return;
        }
        const modalRef = this.modalService.open(PromptModalComponent, {backdrop: 'static'});
        modalRef.componentInstance.promptContent = '您还有' + times + '次加时次数，确定申请加时？';
        modalRef.result.then((result) => {
            this.questionService.increaseTime(this.sendRecordId).subscribe((data) => {
                window.clearInterval(this.expirationTimer);
                this.queryQuestionDesc();
            }, (error) => {
                this.toastr.error(error.error.message);
            });
        }, (reason) => {

        });
    }
}
