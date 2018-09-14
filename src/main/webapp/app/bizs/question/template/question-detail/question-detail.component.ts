import { SessionStorageService } from 'ngx-webstorage';
import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { QuestionDetailModalComponent } from './question-detail-modal.component';
import { QuestionService } from './../../question.service';
import { CommonService } from '../../../service/common.service';
import { QuestionDetail } from '../../questionDetail.model';
import { PromptModalComponent } from '../../../prompt-modal/prompt-modal.component';
import * as _ from 'lodash';
@Component({
  selector: 'jhi-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.css']
})
export class QuestionDetailComponent implements OnInit {
    @Output() private outer = new EventEmitter<string>();
    @BlockUI() blockUI: NgBlockUI;
    questionDetail: QuestionDetail;
    selected = {};
    selectAll = {};
    usedTime: string; // 剩余时间
    expirationTimer: any; // 剩余时间Timer
    questionTypeName: string; // 样本问题类型
    @Input() private sendRecordId: any;
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
        if (mins <= 0) {
            window.clearInterval(this.expirationTimer);
            this.storage.clear('questionDetail');
            // this.queryQuestionDesc();
            return;
        }
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
            // 给父层广播状态，来判断是否显示完成按钮
            this.outer.emit(this.questionDetail.status);
        }, (err) => {
            this.toastr.error(err.error.message);
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
            const modalRef = this.modalService.open(QuestionDetailModalComponent, {backdrop: 'static', size: 'lg'});
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

            });
        }else {
            this.toastr.error('请选择要回复的问题！');
        }
    }
    // 单个问题的回复
    replySingleQuestionModal(item, item1) {
        const modalRef = this.modalService.open(QuestionDetailModalComponent, {backdrop: 'static', size: 'lg'});
        modalRef.componentInstance.questionDescription = item.questionDescription;
        modalRef.componentInstance.handleTypeCode = item1.handleTypeCode;
        modalRef.componentInstance.replyContent = item1.replyContent;
        modalRef.result.then((result) => {
            item1.handleTypeCode = result.handleTypeCode;
            item1.handleTypeName = this.commonSevice.getStatusName(item1.handleTypeCode);
            item1.replyContent = result.replyContent;
            // this.storage.store('questionDetail', this.questionDetail);
        }, (reason) => {});
    }
    // 保存回复得问题内容 请参见样本回复。
    saveReplyQuestion(replyQuestionObj) {
        const obj = {
            sendRecordId: replyQuestionObj.sendRecordId,
            replyContent: replyQuestionObj.replyContent,
            replyDetailsDTOList: []
        };

        replyQuestionObj.replyDetailsDTOList.forEach((sample) => {
            if (sample.handleTypeCode) {
                obj.replyDetailsDTOList.push(sample);
            }
        });
        return new Promise((resolve, reject) => {
            this.questionService.saveReplyQuestion(obj).subscribe((data) => {
                // this.questionReplyResponse = data;
                this.questionDetail.questionItemDTOList.forEach( (item) => {
                    item.questionItemDetailsDTOS.forEach((item1) => {
                        data.replyDetailsDTOList.forEach((reply) => {
                            if (item1.id === reply.questionItemDetailsId) {
                                item1.replyDetailsId = reply.id;
                            }
                        });

                    });
                });
                resolve(data);
            }, (err) => {
                this.toastr.error(err.error.message);
                reject(err);
            });
        });

    }
    // 回复完成问题
    finishReplyQuestion() {
        this.questionService.finishReplyQuestion(this.sendRecordId).subscribe((data) => {
            this.toastr.success('回复完成');
            // const qInfo = this.storage.retrieve('questionDetail');
            // qInfo.status = '2502';
            // this.storage.store('questionDetail', qInfo);
            window.clearInterval(this.expirationTimer);
            this.queryQuestionDesc();
        });
    }
    finish() {
        const questionDetail = _.clone(this.questionDetail);
        const questionArray = [];
        questionDetail.questionItemDTOList.forEach((item) => {
            item.questionItemDetailsDTOS.forEach((item1) => {
                const obj = {
                    id: null,
                    handleTypeCode: null,
                    replyContent: null,
                    questionItemDetailsId: null
                };
                // if (item1.handleTypeCode) {
                    obj.id = item1.replyDetailsId;
                    obj.handleTypeCode = item1.handleTypeCode;
                    obj.replyContent = item1.replyContent;
                    obj.questionItemDetailsId = item1.id;
                    questionArray.push(obj);
                // }
            });
        });
        // 样本问题2301  其他问题2302
        if (questionDetail.questionTypeCode === '2301' && !questionArray.length) {
            this.toastr.error('请回复问题！');
            return;
        }else {
            if (questionDetail.questionTypeCode === '2302' && !questionDetail.replyContent) {
                this.toastr.error('请回复问题！');
                return;
            }
        }
        const replyQuestionObj = {
            sendRecordId: this.sendRecordId,
            replyContent: questionDetail.replyContent || '请参见样本回复',
            replyDetailsDTOList: questionArray
        };
        // 2401：已发送，2402:回复中，2403: 已回复，2404:已过期
        if (questionDetail.status === '2401' || questionDetail.status === '2402') {
            const len = _.filter(questionArray, {handleTypeCode: null}).length;
            const modalRef = this.modalService.open(PromptModalComponent, {backdrop: 'static'});
            modalRef.componentInstance.status = '1001';
            if (len) {
                modalRef.componentInstance.disabled = true;
                modalRef.componentInstance.promptContent = '有未回复的样本，不能进行回复完成!';
            }else {
                modalRef.componentInstance.promptContent = '是否完成此次回复？';
            }
            modalRef.result.then((result) => {
            // 保存
            if (result === 'save') {
                this.saveReplyQuestion(replyQuestionObj).then(() => {
                    this.toastr.success('保存成功！');
                });
            }
            // 回复完成
            if (result === 'ok') {
                this.saveReplyQuestion(replyQuestionObj).then(() => {
                    this.finishReplyQuestion();
                });
            }
            }, (reason) => {
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
        modalRef.componentInstance.status = '2001';
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
