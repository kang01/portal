import { Routes, RouterModule, Route } from '@angular/router';
import { QuestionComponent } from './question.component';
import { UserRouteAccessService } from '../../shared';
import { QuestionDetailComponent } from './template/question-detail/question-detail.component';
import { QuestionAccreditComponent } from './template/question-accredit/question-accredit.component';
export const QuestionRoute: Route = {
    path: 'question-management',
    component: QuestionComponent,
    children: [
        {
            path: 'question-accredit',
            component: QuestionAccreditComponent,
            data: {
                pageTitle: 'question.home.title',
                authorities: []
            }
        } ,
        {
            path: 'question-detail',
            component: QuestionDetailComponent,
            data: {
                pageTitle: 'question.home.title',
                authorities: []
            }
        },
        // 默认加载的路由
        { path: '', redirectTo: 'question-accredit', pathMatch: 'full' },
        // 匹配不到跳到首页
        { path: '**', redirectTo: 'question-accredit' }
    ],
    data: {
        pageTitle: 'question.home.title'
    }
};
