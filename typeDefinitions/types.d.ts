import * as express from 'express';

export interface UserObject {
  id: number,
  email: string,
  first_name: string,
  token: string
}

export interface RawUserObject {
  id: number,
  email: string,
  password: string,
  first_name: string,
  activated: boolean,
  email_validated: string,
  validation_token: string,
}

export interface Error {

}

export interface expressRequest extends express.Request {
  user: any
}
