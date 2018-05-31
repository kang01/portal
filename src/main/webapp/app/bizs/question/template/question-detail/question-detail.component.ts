import { Component, OnInit, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionDetailModalComponent } from './question-detail-modal.component';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'jhi-question-detail',
  templateUrl: './question-detail.component.html',
  styles: [`
      p{padding:0;margin:0}
    .pl-10 {padding-left: 10px;}
    .mt-10{margin-top:10px;}
    .card .card-body.collapse {padding: 0;}
  `]
})
export class QuestionDetailComponent implements OnInit {
    @BlockUI() blockUI: NgBlockUI;
    constructor(private modalService: NgbModal, private toastr: ToastrService) {}

    ngOnInit() {
    }
    showModal() {
        this.modalService.open(QuestionDetailModalComponent, {backdrop: 'static'});
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
