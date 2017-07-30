"use strict"

//npm packages
import * as express from 'express';
import * as moment from 'moment';
import * as jwt from 'jwt-simple';
import * as bcrypt from 'bcrypt-nodejs';

//app imports
import * as app from '../index';

//interfaces
import * as types from '../typeDefinitions/types';

//
let router = express.Router();
let db = (<express.Express>app).get('db');

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

let login = (req: express.Request, res: express.Response) => {
    db.users.findOne({email: req.body.email}, function(err: types.Error, user: types.RawUserObject) {
        if (err) return res.status(500)
        else if (!user) {
          return res.status(401).send({
            message: 'Invalid email and/or password'
          })
        }
        else if (!user.validated) return res.status(400).send({
            message: 'User is not validated'
        })
        else if (user) {
          db.get_User_Password([user.id], function(err: types.Error, candidatePassword: string){
            db.comparePassword = function(candidatePassword: string, password: string, cb: types.bcryptCB) {
              bcrypt.compare(candidatePassword, req.body.password, function(err, isMatch) {
                cb(err, isMatch);
              });
            };
            db.add_login_date([user.id], function(err: types.Error){
              if(err) console.log(err)
            })
            res.send( getSafeUser(user) )
          })
        }
      })
  }



