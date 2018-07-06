import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-prompt-modal',
  templateUrl: './prompt-modal.component.html',
  styles: []
})
export class PromptModalComponent implements OnInit {
  @Input() status;
  @Input() promptContent;
  @Input() disabled;
  messages: any[];
  constructor(public activeModal: NgbActiveModal) { }
  ngOnInit() {
    this.messages = [
        {status: '1001', title: '提示', isSave: true, disabled: this.disabled, btnOk: '回复完成', btnCancel: '取消', content: this.promptContent},

        {status: '2001', title: '提示', isSave: false, disabled: this.disabled, btnOk: '确定', btnCancel: '取消', content: this.promptContent}
      ];
  }
  save() {
    this.activeModal.close('save');
  }
  ok() {
    this.activeModal.close('ok');
  }
  cancel() {
    this.activeModal.dismiss('cancel');
  }

}
