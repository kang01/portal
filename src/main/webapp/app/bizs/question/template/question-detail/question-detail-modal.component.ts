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
                label: 'Angular',
                value: 'angular',
                code: 'NG'
            },
            {
                label: 'ReactJS',
                value: 'reactjs',
                code: 'RJS'
            },
            {
                label: 'Ember JS',
                value: 'emberjs',
                code: 'emjs'
            },
            {
                label: 'Ruby on Rails',
                value: 'ruby_on_rails',
                code: 'ROR'
            }
        ];
    }
}
