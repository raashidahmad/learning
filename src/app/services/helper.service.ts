import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() {

  }

  getRandomInRange(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

  getSortOrderAsc(prop: any) {
    return function (a: any, b: any) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    }
  }

  getSortOrderDesc(prop: any) {
    return function (a: any, b: any) {
      if (b[prop] > a[prop]) {
        return 1;
      } else if (b[prop] < a[prop]) {
        return -1;
      }
      return 0;
    }
  }

}
