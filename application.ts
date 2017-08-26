"use strict"

//npm packages
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';  

import * as authentication from './controllers/authentication'

export class WebApi 
{

  constructor(
    private app: express.Express,
    private port: number
  )
  {
    dotenv.config({ path: '.env' });
    this.configureMiddleware(app);
    this.configureRoutes(app);
  }

  private configureMiddleware(app: express.Express)
  {
    console.log("--------------application---------------")
  }

  private configureRoutes(app: express.Express)
  {
    app.use('/auth', authentication)
  }

  public run() 
  {
    let self = this
    this.app.listen(this.port, function(){
      console.log('This part works on ', self.port)
    })
  }
  
}