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
let goalRouter = express.Router();
let utilities: Utilities

/*=====================Functions==========================*/

let createGoal = (req: types.expressRequest, res: express.Response, next: express.NextFunction) => {

  let tomorrow = utilities.futureDate(24);

  req.app.get('db').goals.insert({
    user_id: req.user.id,
    goal: req.body.goal,
    reminder: tomorrow,
    completed: 'FALSE'
  }).then((goal: types.IGoal) => {

    createTags(req.body.tags, goal, req, res, next);

  }).catch((err: types.Error) => {
      next(err)
  })
}

/*=====================Helper Function==========================*/

let createTags = (tags: [string], goal: types.IGoal, req: express.Request, res: express.Response, next: express.NextFunction) => {

  let db = req.app.get('db');

  let addRelationsToTag = (tag: types.ITag, goal: types.IGoal) => {
    db.relations_to_tag.insert({
        goal_id: goal.id,
        tags_id: tag.id,
        user_id: goal.user_id
    }).catch((err: types.Error) => {
        next(err)
    })
  }

  for (let i = 0; i < tags.length; i++) {
    db.tags.findOne({tag: tags[i]}).then((tag: types.ITag) => {

      if (!tag) {
        db.tags.insert({
          tag: tags[i]
        }).then((tag: types.ITag) => {
          
            addRelationsToTag(tag, goal)
          
        }).catch((err: types.Error) => {
            next(err)
        })
      }
      else if (tag) {

        addRelationsToTag(tag, goal)
          
      }
    }).catch((err: types.Error) => {
        next(err)
    }) 
    if(i >= tags.length - 1) res.status(200).send({success: true})
  }
}

/*===========================Endpoints============================*/

goalRouter.post('/updateStatus', createGoal);

export = goalRouter;