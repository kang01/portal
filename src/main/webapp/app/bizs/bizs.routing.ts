import { Routes, RouterModule } from '@angular/router';
import { QuestionRoute } from './';

const BIZS_ROUTES = [
    QuestionRoute
];
export const BizState: Routes = [
{
    path: '',
    children: BIZS_ROUTES
}
];

// export const BizsRoutes = RouterModule.forChild(routes);
