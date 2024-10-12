export class AuthUser {
    public email: string;
    public id: string;
    public token: string;
    public tokenExpirationDate: Date;

    conctructor() {
        
    }

    getToken() {
        if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
            return null;
        }

        return this.token;
    }

}

