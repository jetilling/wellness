//----Angular Imports----//
import { Injectable }                               from '@angular/core';
import { Headers, RequestOptions, Response }        from '@angular/http';
import { Observable }                               from 'rxjs/Observable';

@Injectable()
export class CommonFunctions {

  /**
   * Sets the JSON web token in the request header
   */
  jwt() 
  {
    let opusUser = document.cookie.split("Opus_User=")[1];
    if (opusUser && opusUser.split('.').length === 3) {
        let headers = new Headers({ 'Authorization': opusUser});
        return new RequestOptions({ headers: headers });
    }
  }

  /**
   * Formats response from server
   */
  extractData(res: Response) 
  {
    let body = res.json();
    return body || { };
  }

  /**
   * Error handling
   * @param {Response | any} error - Error that was recieved
   */
  handleError (error: Response | any) 
  {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}