"use strict"

interface IUtilities {

  /**
   * Get the future date
   * 
   * @param hour - hours to add to current date/time
   */
  futureDate: (hour: number) => Date

}

/*  
    Import npm packages
*/ 
import * as moment from 'moment';

/*=====================Utilities Class==========================*/

export class Utilities implements IUtilities {

  /** This is stuff */
  public futureDate = (hoursToAdd: number): Date => {
    let start = moment(new Date()).add(24,'hours').format("MM/DD/YYYY")
    let dateObj = new Date(start);

    return dateObj
  }

}
