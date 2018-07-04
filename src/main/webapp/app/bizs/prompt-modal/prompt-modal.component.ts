import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-prompt-modal',
  templateUrl: './prompt-modal.component.html',
  styles: []
})
export class PromptModalComponent implements OnInit {
  @Input() promptContent;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  ok() {
    this.activeModal.close('ok');
  }
  cancel() {
    this.activeModal.dismiss('cancel');
  }

}
