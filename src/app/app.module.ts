//--------Angular Imports---------//
import { NgModule }                             from '@angular/core';
import { BrowserModule }                        from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule }     from '@angular/forms';
import { HttpModule, JsonpModule }              from '@angular/http';

//--------Components---------//
import { HomeComponent }                        from './landing/home/home.component';
import { LoginComponent }                       from './authentication/login/login.component';
import { RegisterComponent }                    from './authentication/register/register.component';

//--------Services---------//
import { AuthService }                          from './services/auth.service';
import { CommonFunctions }                      from './services/commonFunctions.service';
import { UsersService }                         from './services/users.service';

//--------Routing---------//
import { AppRoutingModule }                     from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    AuthService,
    CommonFunctions,
    UsersService
  ],
  bootstrap: [ HomeComponent ]
})

export class AppModule {}