const SESSION_USER_TOKEN = "SESSION_USER_TOKEN";

export class AuthenticationService {

    static registerSuccessfulLogin(username, password) {
        sessionStorage.setItem(SESSION_USER_TOKEN, this.createBasicAuthToken(username, password));
    }

    static logout() {
        sessionStorage.removeItem(SESSION_USER_TOKEN);
    }

    static isUserLoggedIn() {
        return this.getToken() !== null;
    }

    static getToken() {
        return sessionStorage.getItem(SESSION_USER_TOKEN);
    }

    static createBasicAuthToken(username, password) {
        return window.btoa(username + ":" + password)
    }
}