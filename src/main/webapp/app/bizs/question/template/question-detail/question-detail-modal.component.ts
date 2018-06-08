import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-question-detail-modal',
    templateUrl: './question-detail-modal.component.html',
    styles: []
})
export class QuestionDetailModalComponent implements OnInit {
    value1: string[] = [];
    currentOptions: any;
    currentOptionsConfig = {
        dropdownDirection: 'auto',
        labelField: 'label',
        valueField: 'value',
        searchField: ['label', 'value'],
        maxItems: 1,
        plugins: ['remove_button']
    };

    constructor(public activeModal: NgbActiveModal) {
    }

    ngOnInit() {
        this.currentOptions = [
            {
                label: '销毁样本',
                value: '001',
                code: 'NG'
            },
            {
                label: '样本正常',
                value: '0002',
                code: 'RJS'
            },
            {
                label: '延迟处理',
                value: '0003',
                code: 'emjs'
            }
        ];
    }
}
