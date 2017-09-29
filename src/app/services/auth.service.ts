//----Angular Imports----//
import { Injectable }                                   from '@angular/core';
import {Router}                                         from '@angular/router';
import { Http, Headers, RequestOptions, Response }      from '@angular/http';

//----Other Imports----//
import { IRegisterUser, IUsersObject, IEmail, IUser }   from '../interfaces';
import { CommonFunctions }                              from './commonFunctions.service';
import { UsersService }                                 from './users.service';
import { Observable }                                   from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService
{

    constructor(private http: Http,
              private router: Router,
              private usersService: UsersService,
              private common: CommonFunctions) {}  

  //-----------Properties-------------//

  /**
   * User's validation token
   */
  userToken: string;

  /**
   * Show message that user isn't validated
   */
  showValidationMessage: boolean = false;

  /**
   * Whether or not email has been taken
   */
  emailIsAlreadyTaken: boolean;

  /**
   * Whether or not email/password is invalid
   */
  emailOrPasswordInvalid: boolean;

  /**
   * Gets the current user from the users service
   */
  get currentUser(): IUsersObject {
    return this.usersService.currentUser
  }         

  /**
   * Sets the current user from the users service
   */
  set currentUser(val: IUsersObject) {
    this.usersService.currentUser = val
  }

//--------------Methods---------------//

  /**
   * Retrieves current user's id number
   */
  getUser(): Observable<string> 
  {
    const url = '/api/me'
    return this.http.get(url, this.common.jwt())
        .map(this.common.extractData)
        .catch(this.common.handleError);
  }

  /**
   * Sends User's information to server to be verified then calls setCookies to log them in
   * @param {IRegisterUser} user - User information i.e. email, password
   */
  login(user: IRegisterUser)
  {
    const url = '/auth/login';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post(url, JSON.stringify(user), options)
          .map(this.common.extractData)
          .subscribe(
              res => {
                this.setCookies(res, false)
              },
              err => {
                if (err.status === 401) {
                  this.emailOrPasswordInvalid = true;
                }
                else if (err.status === 400) {
                  this.showValidationMessage = true;
                }
        })
  }

  /**
   * Sends User's information to server to be added in database and sent a validation email
   * @param {IRegisterUser} user - User information i.e. first name, last name, email, password
   */
  register(user: IRegisterUser) 
  {
    const url = '/auth/register';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post(url, JSON.stringify(user), options)
                    .map(this.common.extractData)
                    .subscribe(
                          res => {
                            this.usersService.currentUser = res;
                            this.router.navigate(['/validate'])
                          },
                          err => {
                            if (err.status === 409) {
                              this.emailIsAlreadyTaken = true;
                            }
                    })
  }

  /**
   * Logs User out
   */
  logout(): boolean 
  {
    localStorage.removeItem('opusId')
    document.cookie = 'Opus_User=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    return true;
  }

  /**
   * Sends token from validation email to server to be verified
   * @param {string} token - Token from validation email
   */
  validateUser(token: string)
  {
    this.userToken = token;
    let validationToken = {token: token}
    const url = '/auth/validate';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(url, JSON.stringify(validationToken), options)
                  .map(this.common.extractData)
                  .catch(this.common.handleError);
  }

  /**
   * Sends token from validation email to server to be verified then logs them in
   * @param {string} token - Token from validation email
   */
  validateUserAndLogin(token: string) 
  {
  this.userToken = token;
  let validationToken = {token: token}
  const url = '/auth/validateAndLogin';
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  return this.http.put(url, JSON.stringify(validationToken), options)
                .map(this.common.extractData)
                .catch(this.common.handleError);
  }

  /**
   * Sends email to server so a recovery email may be sent to them
   * @param {IEmail} email - User's Email
   */
  submitResetEmail(email: IEmail) 
  {
    const url = "/auth/sendPasswordResetUrl"
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(url, JSON.stringify(email), options)
                  .map(this.common.extractData)
                  .catch(this.common.handleError);
  }

  /**
   * Sends new password to server
   * @param {IUser} user - User's new password
   */
  resetPassword(user: IUser) 
  {
    const url = "/auth/resetPassword"
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.put(url, JSON.stringify(user), options)
                  .map(this.common.extractData)
                  .subscribe(
                        res => {
                          user.email = res.email;
                          this.login(user)
                        },
                        error => {
                          this.common.handleError
                  })
  }

/**
 * Sets a cookie with JSON web token and stores logged in user id in localstorage
 * Navigates user to correct page depending on if they are new or not
 * @param {IRegisterUser} res - Response from server
 * @param {boolean} newUser - Trigger if user is new or not
 */
 setCookies(res: IRegisterUser, newUser: boolean) 
 {
    if (res && res.token) {
      document.cookie = `Opus_User=${res.token}; Path=/;`
      localStorage.setItem('opusId', res.id+'');
      this.currentUser = res
    }
    newUser ? this.router.navigate(['/validate']) : this.router.navigate(['/dashboard'])
 }

}