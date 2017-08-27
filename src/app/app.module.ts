//--------Angular Imports---------//
import { NgModule }                             from '@angular/core';
import { BrowserModule }                        from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule }     from '@angular/forms';
import { HttpModule, JsonpModule }              from '@angular/http';

//--------Components---------//


//--------Services---------//


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

  ],
  providers: [

  ],
  bootstrap: [ ]
})

export class AppModule {}