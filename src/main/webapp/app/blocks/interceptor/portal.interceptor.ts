import { Observable } from 'rxjs/Observable';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

export class PortalInterceptor implements HttpInterceptor {

    constructor() {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let referer_full;
        if (!referer_full) {
            referer_full = encodeURIComponent(location.href);
            request = request.clone({
                withCredentials: true,
                setHeaders: {
                    referer_full: this._getCookie('login_full') || referer_full
                }
            });
        }
        return next.handle(request);
    }
    _getCookie(name) {
        const value = '; ' + document.cookie;
        const parts = value.split('; ' + name + '=');
        if ( parts.length === 2) {
            return parts.pop().split(';').shift();
        }
    }
}
