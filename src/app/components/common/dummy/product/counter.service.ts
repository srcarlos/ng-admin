import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CounterService {
  private counterSubject = new BehaviorSubject<number>(0);
  private counter = 0;
  constructor() {
    this.counterSubject.subscribe((value) => {
      this.counter = value;
    });
  }
  increment() {
    this.counterSubject.next(this.counter + 1);
  }
  getCounter() {
    return this.counter;
  }

  getCounterObservable(): Observable<number> {
    return this.counterSubject.asObservable();
  }

  setCounter(value: number) {
    this.counter = value;
    this.counterSubject.next(value);
  }
}
