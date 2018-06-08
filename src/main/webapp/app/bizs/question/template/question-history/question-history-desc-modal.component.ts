import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-question-history-desc-modal',
    templateUrl: './question-history-desc-modal.component.html',
    styles: []
})
export class QuestionHistoryDescModalComponent implements OnInit {
    constructor(public activeModal: NgbActiveModal) {
    }

    ngOnInit() {
    }
}
