import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthState } from 'src/app/_services/auth/auth.state';
import { IUser } from 'src/app/_services/user/user.model';

@Component({
  selector: 'cr-account-status',
  template: `
    <div class="box" *ngIf="status$ | async as s; else notloggedin">
      {{ s }}
    </div>
    <ng-template #notloggedin>You're not logged in</ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class AccountStatusPartialComponent implements OnInit {
  status$: Observable<IUser> | any;
  constructor(private authState: AuthState) {}

  ngOnInit(): void {
    // we'll clean this up later
    this.status$ = this.authState.stateItem$.pipe(
      map((state) => state?.payload)
    );
  }
}
