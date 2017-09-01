"use strict"

//npm packages
import * as express from 'express';
import * as moment from 'moment';
import * as jwt from 'jwt-simple';
import * as bcrypt from 'bcrypt-nodejs';
import * as randToken from 'rand-token';

import * as dotenv from 'dotenv';

//interfaces
import * as types from '../typeDefinitions/types';

/*=====================Configuration======================*/

dotenv.config({ path: '.env' });
let authRouter = express.Router();

/*=====================Functions==========================*/

/**
 * 
 * @param user 
 */
let createJWT = (user: types.RawUserObject) => {
  let payload = {
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(14, 'day').unix()
  };
  return jwt.encode(payload, process.env.TOKEN_SECRET);
}

/**
 * 
 * @param user 
 */
let getSafeUser = (user: types.RawUserObject): types.UserObject => {
  return {
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    token: createJWT(user)
  }
}

/**
 * 
 * @param req 
 * @param res 
 */
let login = (req: express.Request, res: express.Response) => {
  let db = req.app.get('db');
  db.users.findOne({email: req.body.email}).then((result: types.RawUserObject) => {
      if (!result) 
      {
        return res.status(401).send({
          message: 'Invalid email and/or password'
        })
      }
      else if (!result.validated) return res.status(400).send({
          message: 'User is not validated'
      })
      else if (result) 
      {
        db.users.where(
          'SELECT password FROM users WHERE id = $1',
          {id: result.id}
        ).then((candidatePassword: string) => {
            bcrypt.compare(candidatePassword, req.body.password, function(err, isMatch)
            {
              console.log("isMatch: ", isMatch)
              return isMatch
            })
          res.send( getSafeUser(result) )
        })
      }
    })
  }

  /**
   * 
   * @param req 
   * @param res 
   * @param next 
   */
let register = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  let db = req.app.get('db');
    db.users.findOne({ email: req.body.email }).then((result: types.RawUserObject) => {
      if (result)
      {
        return res.status(409).send({ message: 'Email is already taken' })
      }
      else 
      { 
        let token = randToken.generate(16);
        bcrypt.genSalt(10, function(err, salt)
        {
          if (err) return next(err)
          bcrypt.hash(req.body.password, salt, null, function(err, hash)
          {
            if (err) return next(err)

            db.users.insert({
              email: req.body.email,
              password: hash, 
              firstname: req.body.firstName, 
              activated: 'FALSE',
              email_validated: 'FALSE',
              validation_token: token
            }).then((result: types.RawUserObject) => {

                res.send( getSafeUser(result) )
                
            }).catch((err: types.Error) => {
              console.log(err)
            })
          })
        })
      }
    }).catch((err: types.Error) => {
      console.log(err)
    })
  }

/*===========================Endpoints============================*/

  authRouter.post('/login', login);
  authRouter.post('/register', register);

  export = authRouter;