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
let updateStatusRouter = express.Router();

/*=====================Functions==========================*/

/**
 * Update Status
 * 
 * @description Inserts new status in the database
 * @param req express.Request
 * @param res express.Response
 * @param next express.NextFunction
 */
let updateStatus = (req: express.Request, res: express.Response, next: express.NextFunction) => {

  req.app.get('db').statuses.insert({
    user_id: req.body.userId, 
    emotion: req.body.emotion, 
    status: req.body.status
  }).then(

    res.status(200).send({success: true})

  ).catch((err: types.Error) => {
    next(err)
  })
}

/**
 * Get All User Statuses
 * 
 * @description Returns all the statuses for requested user
 * @param req express.Request
 * @param res express.Response
 * @param next express.NextFunction
 */
let getAllUserStatuses = (req: express.Request, res: express.Response, next: express.NextFunction) => {

  req.app.get('db').statuses.find({
    user_id: req.params.userId
  }).then((statuses: types.RawStatusData) => {

    res.status(200).send({data: statuses});

  }).catch((err: types.Error) => {
    next(err)
  })
}

/**
 * Get Statuses In Date Range
 * 
 * @description Returns all the statuses for a user between two dates
 * @param req 
 * @param res 
 * @param next 
 */
let getStatusesInDateRange = (req: express.Request, res: express.Response, next: express.NextFunction) => {

  req.app.get('db').statuses.find({
    user_id: req.params.userId
  }).then((statuses: [types.RawStatusData]) => {

    let startDate = new Date(req.params.startDate);
    let endDate = new Date(req.params.endDate);
    let filteredStatuses: [types.RawStatusData];

    for (var i = 0; i < statuses.length; i++) {
      let statusDate = new Date(statuses[i].created_on);
      if (startDate <= statusDate && statusDate <= endDate) 
        filteredStatuses.push(statuses[i])
    }

    /*
        TODO: How does this data need to be formatted if I'm going to be putting it in a graph?
    */
    res.status(200).send({data: filteredStatuses})

  })
}

/**
 * Delete Status
 * 
 * @description Deletes specified status
 * @param req express.Request
 * @param res express.Response
 * @param next express.NextFunction
 */
let deleteStatus = (req: express.Request, res: express.Response, next: express.NextFunction) => {

  req.app.get('db').statuses.destroy({
    id: req.params.id
  }).then(

    res.status(200).send({success: true})

  ).catch((err: types.Error) => {
    next(err)
  })
}

/*===========================Endpoints============================*/

updateStatusRouter.get('/getAllUserStatuses/:userId', getAllUserStatuses);
updateStatusRouter.get('/getStatusesInDateRange/:userId/:startDate/:endDate', getStatusesInDateRange);
updateStatusRouter.post('/updateStatus', updateStatus);
updateStatusRouter.delete('/deleteStatus/:id', deleteStatus);

export = updateStatusRouter;
