import * as express from 'express';

export interface UserObject {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  token: string
}

export interface RawUserObject {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  validated: boolean
}

export interface Error {

}

export interface bcryptCB {
  (err: Error, isMatch: boolean): boolean
}

export interface expressRequest extends express.Request {
  user: any
}
