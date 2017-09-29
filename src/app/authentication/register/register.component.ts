//----Angular Imports----//
import { Component }                    from '@angular/core';
import { Router }                       from '@angular/router';

//----Other Imports----//
import { IRegisterUser }                from '../../interfaces';
import { AuthService}                   from '../../services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent 
{

  constructor(private router: Router,
            private auth: AuthService) {}
  
  //----------Properties-----------//

  /**
   * Registering user's information
   */
  model: IRegisterUser = <any>{};

  /**
   * Gets emailIsAlreadyTaken from auth service
   */
  get emailIsAlreadyTaken(): boolean {
    return this.auth.emailIsAlreadyTaken;
  }

  //-----------Methods------------//

  /**
   * Sends new user's information to auth service to be registered
   */
  register() 
  {
    this.auth.register(this.model)
  }

}