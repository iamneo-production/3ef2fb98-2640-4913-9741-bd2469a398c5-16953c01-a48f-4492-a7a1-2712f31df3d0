import { Pipe, PipeTransform } from '@angular/core';
import firebase from 'firebase/compat/app';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'timestamp'
})
export class TimestampPipe implements PipeTransform {

  constructor(private DatePipe: DatePipe) {
    
  }

  transform(value: firebase.firestore.FieldValue) {
    const date = (value as firebase.firestore.Timestamp).toDate();
    return this.DatePipe.transform(date, 'mediumDate')
  }

}
