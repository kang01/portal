import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionDetailComponent } from './template/question-detail/question-detail.component';
import * as _ from 'lodash';

@Component({
  selector: 'jhi-question',
  templateUrl: './question.component.html',
  styleUrls: [
    'question.css'
]
})
export class QuestionComponent implements OnInit {
    selectedIndex: number;
    navigationList: any[] = [
        {id: 1, name: '授权', className: 'active', routerName: 'question-accredit'},
        {id: 2, name: '问题详情', className: '', routerName: 'question-detail'},
        {id: 3, name: '答复', className: '', routerName: 'question-answer'}
    ];
    @ViewChild(QuestionDetailComponent) QuestionDetailComponent;

    constructor(private router: Router, private routeInfo: ActivatedRoute) { }

    ngOnInit() {
        const s = document.querySelector('.navigation-content');
        s['style'].height = (window.innerHeight - 270) + 'px';
        window.addEventListener('resize', () => {
            console.log('页面变化了', window.innerHeight);
            s['style'].height = (window.innerHeight - 270) + 'px';
        });
    }

    switchTitleHandler(item) {
        let lastIndex;
        this.selectedIndex = item.id;
        this.navigationList.forEach((title) => {
            if (title.className === 'active') {
                lastIndex = title.id;
            }
        });
        this.changeTitle();
    }
    changeTitle() {
        this.changeTitleStyle();
        this.changeState();
    }
    // 路由更改
    changeState() {
        const obj = _.find(this.navigationList, {id: this.selectedIndex});
        this.router.navigate([obj.routerName], { relativeTo: this.routeInfo});
    }
    // 导航的样式变化
    changeTitleStyle() {
        this.navigationList.forEach((title) => {
            if (this.selectedIndex === 1) {
                title.className = '';
            }
            if (title.id < this.selectedIndex) {
                title.className = 'finish';
            }
            if (title.id > this.selectedIndex) {
                title.className = '';
            }
            if (title.id === this.selectedIndex) {
                title.className = 'active';
            }
        });
    }
    // 下一步
    nextStep() {
        let lastIndex;
        _.forEach(this.navigationList, (title) => {
            if (title.id !== this.navigationList.length) {
                if (title.className === 'active') {
                    lastIndex = title.id;
                    this.selectedIndex = title.id + 1;
                }
            }
        });
        this.changeTitle();
    }
    // 上一步
    preStep() {
        if (this.selectedIndex !== 1) {
            this.selectedIndex -= 1;
        }
        this.changeTitle();
    }

}
