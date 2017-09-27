//----Angular Imports----//
import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: './home.component.html',

})

export class HomeComponent 
{

  constructor(private router: Router){}

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