import { Route } from '@angular/router';

import { HomeComponent } from './';

export const HOME_ROUTE: Route = {
    path: '',
    // component: HomeComponent,
    // data: {
    //     authorities: [],
    //     pageTitle: 'home.title'
    // },
    redirectTo: '/question-management/question-accredit?id=1', pathMatch: 'full'
};
