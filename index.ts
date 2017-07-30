"use strict"

import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';  
import * as massive from 'massive';

let app:  express.Express;

const db = massive.connectSync({connectionString: process.env.DB_CONNECT})
this.app = module.exports = express();
app.set('db', db)


this.app.listen(9000, function(){
  console.log('This part works on ', 9000)
})
