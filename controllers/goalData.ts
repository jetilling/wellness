"use strict"

/*  
    Import npm packages
*/ 
import * as express from 'express';
import * as massive from 'massive';
import * as dotenv from 'dotenv';

/*
    Import Utilities
*/
import { Utilities } from '../utilities/utilities';

/*
    Import type interfaces
*/
import * as types from '../typeDefinitions/types';

/*=====================Configuration======================*/

dotenv.config({ path: '.env' });
let goalDataRouter = express.Router();
let utilities: Utilities

/*=====================Functions==========================*/

let getAllGoalData = (req: types.expressRequest, res: express.Response, next: express.NextFunction) => {

    req.app.get('db').goals.find({
        users_id: req.user.id
    }).then((data: types.IRawGoalData) => {
        
    })
}
/*=====================Endpoints==========================*/

goalDataRouter.get('/getAllGoalData', getAllGoalData)

export = goalDataRouter;