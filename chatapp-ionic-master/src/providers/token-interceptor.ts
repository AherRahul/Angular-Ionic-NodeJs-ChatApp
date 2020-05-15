import { switchMap } from 'rxjs/operators';
import { TokenProvider } from './token/token';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenProvider: TokenProvider) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return fromPromise(this.tokenProvider.GetToken()).pipe(
      switchMap(token => {
        const headersConfig = {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        };
        if (token) {
          headersConfig['Authorization'] = `beader ${token}`;
        }
        const _req = req.clone({ setHeaders: headersConfig });
        return next.handle(_req);
      })
    );
  }
}
