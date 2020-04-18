import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.model';
import { Subject, BehaviorSubject, throwError } from 'rxjs';
import { tap, take, exhaustMap, catchError, map } from 'rxjs/operators';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'https://register-66aff.firebaseio.com/';
  apiKey = 'AIzaSyCMu-fNg5k1ZdB8ptv12ZVhJS6cLvTPSkE';
  users: User[] = [];
  usersChanged = new Subject<any>();
  userAuth = new BehaviorSubject<Auth>(null);

  constructor(private http: HttpClient) { }

  setUsers(users: User[]) {
    this.users = users;
    this.usersChanged.next(this.users.slice());
  }

  addUser(newUser: User) {
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.apiKey,
      {
        email: newUser.email,
        password: newUser.password,
        returnSecureToken: true
      }
    ).pipe(take(1), exhaustMap((responseData) => {
      this.users.push(newUser);
      return this.http.post(this.apiUrl + 'users.json', newUser);
    }));
  }

  loginUser(email: string, password: string) {
    return this.http
      .post<{ email: string, localId: string, idToken: string, expiresIn: string }>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.apiKey,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      ).pipe(catchError((errorRes) => this.handleError(errorRes)),
        tap((responseData) => {
          this.handleAuthUser(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            parseInt(responseData.expiresIn)
          );
        })
      );
  }

  private handleAuthUser(email: string, userId: string, token: string, expirationIn: number) {
    const expiredDate = new Date(new Date().getTime() + expirationIn * 1000);
    const authUser = new Auth(email, userId, token, expiredDate);
    this.userAuth.next(authUser);
    localStorage.setItem('userData', JSON.stringify(authUser));
  }

   getUsers() {
    return this.http
      .get<User[]>(
        this.apiUrl + 'users.json'
      )
      .pipe(
        map(users =>  {
          this.users = [];
          let loginUserData = JSON.parse(localStorage.getItem('userData'));
          for (const key in users) {
            if (users.hasOwnProperty(key)) {
              const user = users[key];
              user.loginStatus = (user.email == loginUserData.email);    
              this.users.push(user);
            }
          }
          return this.users;
        })
      ).subscribe((users) => {
        this.setUsers(users)
      });
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = `There is no user record corresponding to this identifier.
                The user account may have been deactivated.`;
        break;

      case 'INVALID_PASSWORD':
        errorMessage = 'The password that you have entered is incorrect.'
        break;

      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled by an administrator.';
        break;

      default:
        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.'
        break;
    }

    return throwError(errorMessage);
  }

  checkLoggedInUser() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return null;
    }

    const loggedUser = new Auth(
      userData.email,
      userData.userId,
      userData._token,
      new Date(userData._expirationDate)
    );

    if (loggedUser.token) {
      this.userAuth.next(loggedUser);
    }
  }

  getLoggedInUserInfo() {
    return this.users.find(x => x.loginStatus == true);
  }



  logout() {
    localStorage.removeItem('userData');
    this.userAuth.next(null);
  }

  updateUser(updatedInfo) {
    let index = this.users.findIndex((user) => user.loginStatus == true);
    this.users[index].firstName = updatedInfo.firstName;
    this.users[index].lastName = updatedInfo.lastName;
    this.users[index].gender = updatedInfo.gender;
    this.users[index].address = updatedInfo.address;
    // this.users[index]._password = updatedInfo._password;
    this.users[index].image = updatedInfo.profileImage;

    return this.http.put(
      this.apiUrl + 'users.json',
      this.users
    );
  }

}
