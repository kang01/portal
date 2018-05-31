import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as _ from 'lodash';
import { Broadcaster } from '../../shared';
import { MessageEvent } from '../../shared';
import { QuestionDetailComponent } from './template/question-detail/question-detail.component';
import { QuestionAccreditComponent } from './template/question-accredit/question-accredit.component';
import { PARAMETERS } from '@angular/core/src/util/decorators';
@Component({
  selector: 'jhi-question',
  templateUrl: './question.component.html',
  styleUrls: [
    './question.css'
]
})
export class QuestionComponent implements OnInit {
    message: string;
    verificationFlag: boolean;
    selectedIndex: number;
    navigationList: any[] = [
        {id: 1, name: '授权', className: 'active', routerName: 'question-accredit'},
        {id: 2, name: '问题详情', className: '', routerName: 'question-detail'},
        {id: 3, name: '历史', className: '', routerName: 'question-history'}
    ];
    @ViewChild(QuestionDetailComponent) QuestionDetailComponent;
    @ViewChild('child1')
    child1: QuestionAccreditComponent;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private broadcaster: Broadcaster,
        private messageEvent: MessageEvent
    ) {}

    ngOnInit() {
        const s = document.querySelector('.navigation-content');
        s['style'].height = (window.innerHeight - 270) + 'px';
        window.addEventListener('resize', () => {
            // console.log('页面变化了', window.innerHeight);
            s['style'].height = (window.innerHeight - 270) + 'px';
        });
        this.activatedRoute.queryParams.subscribe((data) => {
            console.log(data);
            this.selectedIndex = Number(data.id);
        });
        setTimeout(() => {
            this.changeTitle();
        }, 800);
    }

    switchTitleHandler(item) {
        if (this.child1 && this.child1.verification()) {
            return;
        }
        let lastIndex;
        this.selectedIndex = item.id;
        this.navigationList.forEach((title) => {
            if (title.className === 'active') {
                lastIndex = Number(title.id);
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
        const routerName = this.navigationList[0].routerName;
        const firstId = this.navigationList[0].id;
        const obj = _.find(this.navigationList, {id: this.selectedIndex});
        if (obj) {
            this.router.navigate([obj.routerName, obj.id], { relativeTo: this.activatedRoute, queryParams: { id: obj.id }});
        }else {
            this.router.navigate([routerName, firstId], { relativeTo: this.activatedRoute, queryParams: { id: firstId }});
        }
    }
    // 导航的样式变化
    changeTitleStyle() {
        this.navigationList.forEach((title) => {
            const id = Number(title.id);
            if (this.selectedIndex === 1) {
                title.className = '';
            }
            if (id < this.selectedIndex) {
                title.className = 'finish';
            }
            if (id > this.selectedIndex) {
                title.className = '';
            }
            if (id === this.selectedIndex) {
                title.className = 'active';
            }
        });
    }
    // 下一步
    nextStep() {
        if (this.child1 && this.child1.verification()) {
            return;
        }
        let lastIndex;
        _.forEach(this.navigationList, (title) => {
            if (Number(title.id) !== this.navigationList.length) {
                if (title.className === 'active') {
                    lastIndex = Number(title.id);
                    this.selectedIndex = lastIndex + 1;
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
