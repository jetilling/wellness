//----Angular Imports----//
import { Injectable, OnInit }                                       from '@angular/core';
import { Http, Headers, RequestOptions, Response }                  from '@angular/http';

//---Other Imports----//
import { IRegisterUser, IUsersObject, IUserNames }                  from '../interfaces';
import { CommonFunctions }                                          from './commonFunctions.service';
import { Observable }                                               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService
{

  constructor(private http: Http,
              private common: CommonFunctions) {}
              
  //---------Properties----------//
  
  /**
   * Current logged in user's information
   */
  currentUser: IUsersObject

  /**
   * Whether or not the current user information is loaded
   */
  currentUserInfoLoaded: boolean = false;

  /**
   * An array of all the users and their information in the database
   */
  allUsers: IUsersObject[]

  /**
   * Array of all users segemented into their respective page
   */
  pagedUsers: IUsersObject[];

  /**
   * THe current page out of all pages
   */
  currentPage: number;

  /**
   * Shows add user modal if true
   */
  showAddUser: boolean = false;

  /**
   * Shows confirmation if user was successfully added
   */
  userSuccessfullyAdded: boolean = false;

  /**
   * Shows confirm delete modal if true
   */
  showConfirmDelete: boolean;

  /**
   * The id of the selected user
   */
  selectedUserId: number;

  /**
   * The name of the selected user
   */
  selectedUserName: IUserNames;

  //--------Methods----------//

  /**
   * Adds user in database and allUsers array
   * @param {IUsersObject} user - Information for the added user
   */
  addUser(user: IUsersObject) 
  {
    const url = '/api/addUser'
    this.http.post(url, user, this.common.jwt())
            .map(this.common.extractData)
            .subscribe(
                res => {
                    this.allUsers.push(res);

                }
            )
  }

  /**
   * Information for the currently logged in user
   */
  getLoggedInUser()
  {
      const userId = localStorage.getItem('opusId');
      const url = '/api/getLoggedInUser/' + userId;
      this.http.get(url, this.common.jwt())
               .map(this.common.extractData)
               .subscribe(
                   res => {
                       this.currentUser = res[0]
                       this.currentUserInfoLoaded = true
                   }
               )
  }


  /**
   * Gets all users from database
   */
  getUsers() 
  {
    const url = '/api/getUsers'
    this.http.get(url, this.common.jwt())
            .map(this.common.extractData)
            .subscribe((res: IUsersObject[]) => {
                this.allUsers = res;
            });
  }


  /**
   * Verifies added user email does not already exist
   * @param {IRegisterUser} user - User information i.e. email
   */
  verifyEmail(user: IRegisterUser): boolean 
  {
      let invalidEmail: boolean = false;
      this.allUsers.forEach(function(element){
          if (element.email === user.email) return invalidEmail = true;
      })
      return invalidEmail
  }

}