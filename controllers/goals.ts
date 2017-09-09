"use strict"

/*  
    Import npm packages
*/ 
import * as express from 'express';
import * as massive from 'massive';
import * as dotenv from 'dotenv';

/*
    Import type interfaces
*/
import * as types from '../typeDefinitions/types';

/*=====================Configuration======================*/

dotenv.config({ path: '.env' });
let goalRouter = express.Router();

/*=====================Functions==========================*/

let createGoal = (req: express.Request, res: express.Response, next: express.NextFunction) => {

  req.app.get('db').statuses.insert({
    
  })
}


/*===========================Endpoints============================*/


export = goalRouter;