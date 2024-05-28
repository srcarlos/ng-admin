import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  public isCollapsed$ = new BehaviorSubject(false);

  public toggle(): void {
    this.isCollapsed$.next(!this.isCollapsed$.getValue());
    console.log('Im inside toggle');
  }

  public getIsOpen(): Observable<boolean> {
    console.log('Im inside getIsOpen');
    return this.isCollapsed$;
  }
}
