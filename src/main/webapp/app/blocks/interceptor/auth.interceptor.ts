import { Observable } from 'rxjs/Observable';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { API_HOST_QUESTION } from '../../app.constants';

export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private localStorage: LocalStorageService,
        private sessionStorage: SessionStorageService
    ) {
    }

    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     if (!request || !request.url || (/^http/.test(request.url) && !(SERVER_API_URL && request.url.startsWith(SERVER_API_URL)))) {
    //         return next.handle(request);
    //     }

    //     const token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');
    //     if (!!token) {
    //         request = request.clone({
    //             setHeaders: {
    //                 Authorization: 'Bearer ' + token
    //             }
    //         });
    //     }
    //     return next.handle(request);
    // }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request || !request.url || (/^http/.test(request.url) && !(API_HOST_QUESTION && request.url.startsWith(API_HOST_QUESTION)))) {
            return next.handle(request);
        }

        const token = this.localStorage.retrieve('authenticationStrangerToken') || this.sessionStorage.retrieve('authenticationStrangerToken');
        if (!!token) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token
                }
            });
        }
        return next.handle(request);
    }

}
