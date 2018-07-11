import { Routes, RouterModule, Route } from '@angular/router';
import { QuestionComponent } from './question.component';
import { UserRouteAccessService } from '../../shared';
import { QuestionDetailComponent } from './template/question-detail/question-detail.component';
import { QuestionAccreditComponent } from './template/question-accredit/question-accredit.component';
import { QuestionHistoryComponent } from './template/question-history/question-history.component';

export const QuestionRoute: Route = {
    path: 'question-management',
    component: QuestionComponent,
    children: [
        {path: 'question-accredit', component: QuestionAccreditComponent},
        {path: 'question-detail', component: QuestionDetailComponent},
        {path: 'question-history', component: QuestionHistoryComponent},
        { path: '', redirectTo: 'question-accredit', pathMatch: 'full' },
        { path: '**', component: QuestionAccreditComponent }
    ]
};
