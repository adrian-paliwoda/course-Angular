import { Injectable } from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http'
import { AuthService } from "./auth.service";
import { exhaustMap, take } from "rxjs/operators";

@Injectable()
export class AuthInterceptorService{
    constructor(private authService: AuthService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler){
        this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                if (user.token){
                    const modReq = req.clone({params: new HttpParams().set('auth', user.token)})
                    return next.handle(modReq);    
                }
                return next.handle(req);
            })
        );
    }
}