import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'jhi-question-accredit',
  templateUrl: './question-accredit.component.html',
  styles: []
})
export class QuestionAccreditComponent implements OnInit {

    @Input() parent_msg: string;

  constructor() {
      console.log(this.parent_msg);
  }

  ngOnInit() {
  }

}
