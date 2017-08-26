"use strict"

//npm packages
import * as express from 'express';
import * as moment from 'moment';
import * as jwt from 'jwt-simple';
import * as bcrypt from 'bcrypt-nodejs';
import * as massive from 'massive';
import * as dotenv from 'dotenv';

//interfaces
import * as types from '../typeDefinitions/types';

/*=====================Configuration======================*/
dotenv.config({ path: '.env' });
let authRouter = express.Router();
const db: any = massive.connectSync({connectionString: process.env.DB_CONNECT})

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
    db.users.findOne({email: req.body.email}, function(err: types.Error, user: types.RawUserObject)
    {
      if (err) return res.status(500)
      else if (!user) 
      {
        return res.status(401).send({
          message: 'Invalid email and/or password'
        })
      }
      else if (!user.validated) return res.status(400).send({
          message: 'User is not validated'
      })
      else if (user) 
      {
        db.get_user_password([user.id], function(err: types.Error, candidatePassword: string)
        {
          db.comparePassword = function(candidatePassword: string, password: string, cb: types.bcryptCB)
          {
            bcrypt.compare(candidatePassword, req.body.password, function(err, isMatch)
            {
              cb(err, isMatch)
            })
          }
          res.send( getSafeUser(user) )
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
    this.db.users.findOne({ email: req.body.email }, function(err: types.Error, existingUser: types.RawUserObject)
    {
      if (existingUser)
      {
        return res.status(409).send({ message: 'Email is already taken' })
      }
      else 
      {
        bcrypt.genSalt(10, function(err, salt)
        {
          if (err) return next(err)
          bcrypt.hash(req.body.password, salt, null, function(err, hash)
          {
            if (err) return next(err)
            db.register_user([req.body.email, hash, req.body.firstName, 'FALSE', 'FALSE'], function(err: types.Error, users: types.RawUserObject)
            {
                res.send( getSafeUser(users) )
            })
          })
        })
      }
    })
  }

/*===========================Endpoints============================*/
  authRouter.post('/login', login);
  authRouter.post('/register', register);

  export = authRouter;
