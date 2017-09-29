//----Angular Imports----//
import { Component }                                          from '@angular/core';
import {FormBuilder, FormControl, Validators, FormGroup}      from '@angular/forms';
import { Router }                                             from '@angular/router';

//----Other Imports----//
import { IRegisterUser }                                      from '../../interfaces';
import { AuthService }                                        from '../../services/auth.service';



@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent 
{
  constructor(private auth: AuthService,
            private router: Router){}

//-----------Properties--------------//

  /**
   * The user's information
   */
  model: IRegisterUser = <any>{};

  /**
   * Disables submit if true
   */
  loading = false;

  /**
   * Gets showValidationMessage from auth service
   */
  get showValidationMessage(): boolean {
    return this.auth.showValidationMessage
  }

  /**
   * Gets emailOrPasswrodInvalid from auth service
   */
  get emailOrPasswordInvalid(): boolean {
    return this.auth.emailOrPasswordInvalid;
  }

//--------------Methods---------------//

  /**
   * Sends user's information to auth service to login
   */
  login() {
    this.loading = true;
    this.auth.login(this.model)
  }

}