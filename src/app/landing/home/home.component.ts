//----Angular Imports----//
import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent 
{

  constructor(private router: Router){}
  
  /**
   * Show the login form on initial load
   */
  showLogin = true;

  /**
   * Hide the register form on initial load
   */
  showRegister= false;
  

//--------------Methods---------------//

  showLoginForm() {
    this.showLogin = true;
    this.showRegister = false;
    console.log(this.showLogin)
  }

  showRegisterForm() {
    this.showLogin = false;
    this.showRegister = true;
    console.log(this.showLogin)
  }
  
  // /**
  //  * The JSON web token of the currently logged in user
  //  */
  // opusUser: string = document.cookie.split("Opus_User=")[1];

  // ngOnInit() 
  // {
  //   if(this.opusUser && this.opusUser.split('.').length === 3){
  //   this.auth.getUser()
  //     .subscribe(
  //       res => {
  //         if (res){
  //           this.router.navigate(['/dashboard'])
  //         }
  //       }
  //     )
  //   }
  // }

}