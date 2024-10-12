import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { AuthUser } from "./user.model";

export interface AuthResponseDate {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private tokenExpirationDuration: any = null;

    signupUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    singinUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    webApiKey = "AIzaSyD1H3k7k0mxmD5-mrYW0xWhhHbBme4ca-I";

    user = new BehaviorSubject<AuthUser>(null);

    constructor(private http: HttpClient) {

    }

    autoLogin(){
        const userData = localStorage.getItem('userData');
        if(userData){
            const userFromStorage = JSON.parse(userData);
            const newUser = new AuthUser();
            newUser.email = userFromStorage.email;
            newUser.id = userFromStorage.id;
            newUser.token = userFromStorage.token;
            newUser.tokenExpirationDate = userFromStorage.tokenExpirationDate;
        
            if (newUser.getToken())
            {
                this.user.next(userFromStorage);

                const expiration = new Date(newUser.tokenExpirationDate).getTime() - new Date().getTime();
                this.autoLogout(expiration);
            }
        }
    }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseDate>(this.signupUrl + this.webApiKey, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(p => this.handleAuth(p)));
    }

    signin(email: string, password: string) {
        return this.http.post<AuthResponseDate>(this.singinUrl + this.webApiKey, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(p => this.handleAuth(p)));
    }

    logout(){
        this.user.next(null);
        localStorage.removeItem('userData');
        if(this.tokenExpirationDuration){
            clearTimeout(this.tokenExpirationDuration);
            this.tokenExpirationDuration =  null;
        }
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationDuration = setTimeout(() => {
            this.logout();
        } ,expirationDuration);
    }

    private handleAuth(responseData) {
        const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
        const currentUser = new AuthUser();
        currentUser.email = responseData.email;
        currentUser.id = responseData.localId;
        currentUser.token = responseData.idToken;
        currentUser.tokenExpirationDate = expirationDate;
        
        this.user.next(currentUser);
        this.autoLogout(+responseData.expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(currentUser));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occured!'

        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }

        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage: 'This email already exits';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage: 'The entered email no found';
                break;
            case 'INVALID_PASSWORD':
                errorMessage: 'Password invalid';
                break;
            case 'USER_DISABLED':
                errorMessage: 'The user accound has been disabled by an administrator';
                break;

        }

        return throwError(errorMessage);
    }
}