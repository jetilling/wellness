export interface IEmail {
  email: string
}

export interface IUserNames {
  firstName: string
  lastName?: string
}

export interface IUser extends IRegisterUser {
  password: string
  verifyPassword: string
}

/**
* Class for login/Register User object
*/
export interface IRegisterUser {
  id: number;
  email: string;
  firstName: string;
  phoneNumber: string;
  password: string;
  token?: string;
}

/**
* Class for Users list
*/
export interface IUsersObject {
  id: number;
  email: string;
  firstName: string;
  phoneNumber: string;
  login_dates?: Date[];
}
