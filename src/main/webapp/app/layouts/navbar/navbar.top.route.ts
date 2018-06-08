import { Route } from '@angular/router';

import { NavbarTopComponent } from './navbar.top.component';

export const navbarTopRoute: Route = {
    path: '',
    component: NavbarTopComponent,
    outlet: 'navbar1'
};
