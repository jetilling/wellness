"use strict"

/*  
    Import npm packages
*/ 
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as jwt from 'jwt-simple';
import * as moment from 'moment';
import * as massive from 'massive';
import * as express from 'express';  

/*  
    Import controllers
*/ 
import * as authentication from './controllers/authentication';
import * as statuses from './controllers/statuses';

/*  
    Import type interfaces
*/ 
import * as types from './typeDefinitions/types.d';

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

  /**
   * 
   * @param app 
   */
  private configureMiddleware(app: express.Express)
  {
    app.use(bodyParser.json());
    app.use("/node_modules", express.static(path.resolve(__dirname, './node_modules')));
    app.use(express.static(__dirname + '/src'));
    massive(process.env.DB_CONNECT).then(db => {
      app.set('db', db);
    })
  }

  /**
   * Configure Routes
   * 
   * @description
   * @param app 
   */
  private configureRoutes(app: express.Express)
  {
    app.use('/auth', authentication);
    app.use('/statuses', this.ensureAuthenticated, statuses);
  }

  /**
   * 
   * @description
   */
  public run() 
  {
    this.app.listen(this.port, () => {
      console.log('This part works on ', this.port)
    })
  }

  /*===========================Middleware============================*/

  private ensureAuthenticated = (req: types.expressRequest, res: express.Response, next: express.NextFunction) => {
    if (!req.header('Authorization')) {
      return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
    }
    var token = req.header('Authorization');
    var payload = null;
    try {
      payload = jwt.decode(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
      return res.status(401).send({ message: err.message });
    }
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: 'Token has expired' });
    }
    req.user = payload.sub;
    next();
  }
  
  
}