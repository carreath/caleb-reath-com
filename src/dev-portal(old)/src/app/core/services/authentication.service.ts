import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../../shared';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    getUser(): User {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    login(username: string, password: string) {
        const user: User = {
            id: 1,
            username: username,
            password: password,
            firstName: 'AA',
            lastName: 'BB',
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
        /*
        return this.http.post<any>('/api/authenticate', { username: username, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
            */
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
