"use strict"

//npm packages
import * as express from 'express';
import * as massive from 'massive';
import * as dotenv from 'dotenv';

//interfaces
import * as types from '../typeDefinitions/types';

/*=====================Configuration======================*/

dotenv.config({ path: '.env' });
let updateStatusRouter = express.Router();
//const db: any = massive.connectSync({connectionString: process.env.DB_CONNECT})

/*=====================Functions==========================*/

/**
 * 
 */
let updateStatus = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  req.app.get('db').update_status([req.body.userId, req.body.emotion, req.body.status], (err: types.Error) => {
    if(err) console.log(err);
    else res.status(200).send('success');
  })
}

/*===========================Endpoints============================*/

updateStatusRouter.post('/updateStatus', updateStatus);

export = updateStatusRouter;
