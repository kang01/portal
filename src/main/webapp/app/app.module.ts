import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage, LocalStorageService, SessionStorageService  } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { PortalInterceptor } from './blocks/interceptor/portal.interceptor';
import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { GwBbisStrangerPortalSharedModule, UserRouteAccessService } from './shared';
import { GwBbisStrangerPortalAppRoutingModule} from './app-routing.module';
import { GwBbisStrangerPortalHomeModule } from './home/home.module';
import { GwBbisStrangerPortalAdminModule } from './admin/admin.module';
import { GwBbisStrangerPortalAccountModule } from './account/account.module';
import { GwBbisStrangerPortalEntityModule } from './entities/entity.module';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { GwBbisStrangerPortalBizsModule } from './bizs/bizs.module';
import {
    JhiMainComponent,
    NavbarComponent,
    NavbarTopComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        GwBbisStrangerPortalAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        GwBbisStrangerPortalSharedModule,
        GwBbisStrangerPortalHomeModule,
        GwBbisStrangerPortalAdminModule,
        GwBbisStrangerPortalAccountModule,
        GwBbisStrangerPortalEntityModule,
        GwBbisStrangerPortalBizsModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        NavbarTopComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        PaginationConfig,
        UserRouteAccessService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [
                LocalStorageService,
                SessionStorageService
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [
                JhiEventManager
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: PortalInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        }

    ],
    bootstrap: [ JhiMainComponent ]
})
export class GwBbisStrangerPortalAppModule {}
