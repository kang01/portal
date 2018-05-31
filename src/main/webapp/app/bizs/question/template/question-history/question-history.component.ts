import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-question-history.',
  templateUrl: './question-history.component.html',
  styles: [`
      h4{font-weight:400}
      .mt-10{margin-top:10px;}
      .mr-100{margin-right:100px;}
      .ml-40{margin-left:40px;}
      .pl-16{padding-left:16px;}
      .pl-30{padding-left:30px;}
      .pl-72{padding-left:72px;}
      .history-content{border-bottom:1px solid #ccc;}
      .history-content a{color:red;text-decoration: underline;}
  `]
})
export class QuestionHistoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
