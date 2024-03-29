import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';

import {
    GwBbisStrangerPortalSharedLibsModule,
    GwBbisStrangerPortalSharedCommonModule,
    CSRFService,
    AuthServerProvider,
    AccountService,
    UserService,
    StateStorageService,
    LoginService,
    LoginModalService,
    JhiLoginModalComponent,
    Principal,
    HasAnyAuthorityDirective,
    Broadcaster,
    MessageEvent
} from './';

@NgModule({
    imports: [
        GwBbisStrangerPortalSharedLibsModule,
        GwBbisStrangerPortalSharedCommonModule
    ],
    declarations: [
        JhiLoginModalComponent,
        HasAnyAuthorityDirective
    ],
    providers: [
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        UserService,
        DatePipe,
        Broadcaster,
        MessageEvent
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        GwBbisStrangerPortalSharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class GwBbisStrangerPortalSharedModule {}
